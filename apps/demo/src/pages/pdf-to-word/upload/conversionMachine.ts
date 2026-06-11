/**
 * Conversion flow state machine (pure — no timers, no React).
 *
 * Multi-file model per the PDFGuru A/B layout (Figma node 49025-3914): the
 * dropzone stays visible while files queue up below it; per-file states
 * (analyzing / ready / password / error) live on the rows, batch states
 * (uploading / converting / success / download-ready / server-error) on the
 * phase. Filename triggers simulate backend outcomes — see FILENAME_TRIGGERS
 * in demoData.ts.
 */
import { DEMO_PASSWORD, FILENAME_TRIGGERS, LIMITS } from '../demoData';

export interface DemoFile {
  name: string;
  sizeBytes: number;
  pages: number;
}

export type RowErrorReason = 'unsupported-format' | 'file-too-large' | 'corrupted-file';

export type RowStatus =
  | { kind: 'analyzing' }
  | { kind: 'ready' }
  | { kind: 'password'; failedAttempt: boolean }
  | { kind: 'row-error'; reason: RowErrorReason };

export interface QueuedFile {
  id: string;
  file: DemoFile;
  status: RowStatus;
}

export type FlowPhase =
  | { kind: 'gather'; emptied: boolean } // dropzone + file list (default/empty)
  | { kind: 'uploading'; progress: number }
  | { kind: 'converting'; progress: number }
  | { kind: 'success' }
  | { kind: 'download-ready' }
  | { kind: 'server-error' };

export interface FlowState {
  phase: FlowPhase;
  files: QueuedFile[];
  /** A file is being dragged over the window — shows the drop overlay. */
  dragging: boolean;
  /** Freeze transient phases (used by the demo state inspector). */
  paused: boolean;
}

export type FlowAction =
  | { type: 'DRAG_CHANGED'; dragging: boolean }
  | { type: 'FILES_ADDED'; files: DemoFile[] }
  | { type: 'ROW_ANALYZED'; id: string }
  | { type: 'PASSWORD_SUBMITTED'; id: string; password: string }
  | { type: 'ROW_REMOVED'; id: string }
  | { type: 'CONVERT_STARTED' }
  | { type: 'PROGRESS_TICKED'; delta: number }
  | { type: 'RESULT_SHOWN' }
  | { type: 'FAILED' }
  | { type: 'RETRY' }
  | { type: 'BACK_TO_FILES' }
  | { type: 'RESET' }
  | { type: 'PAUSE_TOGGLED' }
  | { type: 'JUMPED'; phase: FlowPhase; files: QueuedFile[]; dragging?: boolean };

export const INITIAL_FLOW_STATE: FlowState = {
  phase: { kind: 'gather', emptied: false },
  files: [],
  dragging: false,
  paused: false,
};

const hasTrigger = (file: DemoFile, words: readonly string[]) => {
  const name = file.name.toLowerCase();
  return words.some((word) => name.includes(word));
};

export const isPasswordProtected = (file: DemoFile) =>
  hasTrigger(file, FILENAME_TRIGGERS.passwordProtected);
export const isCorrupted = (file: DemoFile) => hasTrigger(file, FILENAME_TRIGGERS.corrupted);
export const willFailOnServer = (file: DemoFile) => hasTrigger(file, FILENAME_TRIGGERS.serverError);
export const isSlowConversion = (file: DemoFile) =>
  hasTrigger(file, FILENAME_TRIGGERS.slowConversion);

/** Map a browser File to the demo model ("huge" trigger fakes a big file). */
export function toDemoFile(file: File): DemoFile {
  const fakedSize = file.name.toLowerCase().includes(FILENAME_TRIGGERS.hugeFile[0])
    ? 25 * 1024 * 1024
    : file.size;
  return {
    name: file.name,
    sizeBytes: fakedSize,
    // Demo heuristic: page count derived from size.
    pages: Math.max(1, Math.round(fakedSize / 95_000)),
  };
}

let rowSeq = 0;

/** Synchronous validation at pick time (extension + size). */
function queueFile(file: DemoFile): QueuedFile {
  rowSeq += 1;
  const id = `row-${rowSeq}`;
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!LIMITS.acceptedExtensions.includes(extension)) {
    return { id, file, status: { kind: 'row-error', reason: 'unsupported-format' } };
  }
  if (file.sizeBytes > LIMITS.maxSizeBytes) {
    return { id, file, status: { kind: 'row-error', reason: 'file-too-large' } };
  }
  return { id, file, status: { kind: 'analyzing' } };
}

/** Outcome of the simulated server-side analysis for one row. */
function resolveAnalysis(file: DemoFile): RowStatus {
  if (isCorrupted(file)) return { kind: 'row-error', reason: 'corrupted-file' };
  if (isPasswordProtected(file)) return { kind: 'password', failedAttempt: false };
  return { kind: 'ready' };
}

// ---- Selectors ----

export const readyFiles = (files: QueuedFile[]) =>
  files.filter((row) => row.status.kind === 'ready');

export const oldestAnalyzing = (files: QueuedFile[]) =>
  files.find((row) => row.status.kind === 'analyzing');

/** Convert allowed: at least one ready row, nothing pending or locked. */
export const canConvert = (files: QueuedFile[]) =>
  readyFiles(files).length > 0 &&
  !files.some((row) => row.status.kind === 'analyzing' || row.status.kind === 'password');

export const batchWillFail = (files: QueuedFile[]) =>
  files.some((row) => willFailOnServer(row.file));

export const batchIsSlow = (files: QueuedFile[]) =>
  files.some((row) => isSlowConversion(row.file));

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  const { phase, files } = state;

  switch (action.type) {
    case 'DRAG_CHANGED':
      return { ...state, dragging: action.dragging };

    case 'FILES_ADDED': {
      if (phase.kind !== 'gather') return state;
      const slots = Math.max(0, LIMITS.maxFiles - files.length);
      const added = action.files.slice(0, slots).map(queueFile);
      if (!added.length) return { ...state, dragging: false };
      return {
        ...state,
        dragging: false,
        files: [...files, ...added],
        phase: { kind: 'gather', emptied: false },
      };
    }

    case 'ROW_ANALYZED':
      return {
        ...state,
        files: files.map((row) =>
          row.id === action.id && row.status.kind === 'analyzing'
            ? { ...row, status: resolveAnalysis(row.file) }
            : row,
        ),
      };

    case 'PASSWORD_SUBMITTED':
      return {
        ...state,
        files: files.map((row) => {
          if (row.id !== action.id || row.status.kind !== 'password') return row;
          return action.password === DEMO_PASSWORD
            ? { ...row, status: { kind: 'ready' } }
            : { ...row, status: { kind: 'password', failedAttempt: true } };
        }),
      };

    case 'ROW_REMOVED': {
      if (phase.kind !== 'gather') return state;
      const remaining = files.filter((row) => row.id !== action.id);
      return {
        ...state,
        files: remaining,
        phase: { kind: 'gather', emptied: remaining.length === 0 },
      };
    }

    case 'CONVERT_STARTED': {
      if (phase.kind !== 'gather' || !canConvert(files)) return state;
      // Error rows can't convert — only the ready ones travel on.
      return { ...state, files: readyFiles(files), phase: { kind: 'uploading', progress: 0 } };
    }

    case 'PROGRESS_TICKED': {
      if (phase.kind !== 'uploading' && phase.kind !== 'converting') return state;
      const progress = Math.min(100, phase.progress + action.delta);
      if (progress < 100) return { ...state, phase: { ...phase, progress } };
      // Each stage completes into the next one.
      return phase.kind === 'uploading'
        ? { ...state, phase: { kind: 'converting', progress: 0 } }
        : { ...state, phase: { kind: 'success' } };
    }

    case 'RESULT_SHOWN':
      if (phase.kind !== 'success') return state;
      return { ...state, phase: { kind: 'download-ready' } };

    case 'FAILED':
      if (phase.kind !== 'uploading' && phase.kind !== 'converting') return state;
      return { ...state, phase: { kind: 'server-error' } };

    case 'RETRY':
      if (phase.kind !== 'server-error') return state;
      return { ...state, phase: { kind: 'uploading', progress: 0 } };

    case 'BACK_TO_FILES':
      return { ...state, phase: { kind: 'gather', emptied: false } };

    case 'RESET':
      return { ...state, files: [], dragging: false, phase: { kind: 'gather', emptied: false } };

    case 'PAUSE_TOGGLED':
      return { ...state, paused: !state.paused };

    case 'JUMPED':
      return {
        ...state,
        phase: action.phase,
        files: action.files,
        dragging: action.dragging ?? false,
      };

    default:
      return state;
  }
}
