/**
 * Conversion flow state machine (pure — no timers, no React).
 *
 * The widget renders one panel per phase; useConversionFlow drives the
 * transient phases (analyzing/uploading/converting/success) with timers.
 * Filename triggers simulate backend outcomes so every state is reachable
 * with any small real file — see FILENAME_TRIGGERS in demoData.ts.
 */
import { DEMO_PASSWORD, FILENAME_TRIGGERS, LIMITS } from '../demoData';

export interface DemoFile {
  name: string;
  sizeBytes: number;
  pages: number;
}

export type ErrorReason =
  | 'unsupported-format'
  | 'file-too-large'
  | 'corrupted-file'
  | 'server-error';

export type UploadPhase =
  | { kind: 'idle' }
  | { kind: 'empty' }
  | { kind: 'analyzing'; file: DemoFile }
  | { kind: 'selected'; file: DemoFile }
  | { kind: 'password'; file: DemoFile; failedAttempt: boolean }
  | { kind: 'uploading'; file: DemoFile; progress: number }
  | { kind: 'converting'; file: DemoFile; progress: number }
  | { kind: 'success'; file: DemoFile }
  | { kind: 'download-ready'; file: DemoFile }
  | { kind: 'error'; file: DemoFile | null; reason: ErrorReason };

export interface FlowState {
  phase: UploadPhase;
  /** A file is being dragged over the window — shows the drop overlay. */
  dragging: boolean;
  /** Freeze transient phases (used by the demo state inspector). */
  paused: boolean;
}

export type FlowAction =
  | { type: 'DRAG_CHANGED'; dragging: boolean }
  | { type: 'FILE_PICKED'; file: DemoFile }
  | { type: 'ANALYSIS_DONE' }
  | { type: 'PASSWORD_SUBMITTED'; password: string }
  | { type: 'CONVERT_STARTED' }
  | { type: 'PROGRESS_TICKED'; delta: number }
  | { type: 'RESULT_SHOWN' }
  | { type: 'FAILED'; reason: ErrorReason }
  | { type: 'UPLOAD_CANCELLED' }
  | { type: 'FILE_REMOVED' }
  | { type: 'RESET' }
  | { type: 'PAUSE_TOGGLED' }
  | { type: 'JUMPED'; phase: UploadPhase };

export const INITIAL_FLOW_STATE: FlowState = {
  phase: { kind: 'idle' },
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

/** Synchronous validation at pick time (extension + size). */
function validatePicked(file: DemoFile): UploadPhase {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!LIMITS.acceptedExtensions.includes(extension)) {
    return { kind: 'error', file, reason: 'unsupported-format' };
  }
  if (file.sizeBytes > LIMITS.maxSizeBytes) {
    return { kind: 'error', file, reason: 'file-too-large' };
  }
  return { kind: 'analyzing', file };
}

/** Outcome of the simulated server-side analysis. */
function resolveAnalysis(file: DemoFile): UploadPhase {
  if (isCorrupted(file)) return { kind: 'error', file, reason: 'corrupted-file' };
  if (isPasswordProtected(file)) return { kind: 'password', file, failedAttempt: false };
  return { kind: 'selected', file };
}

const fileOf = (phase: UploadPhase): DemoFile | null =>
  'file' in phase ? phase.file : null;

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  const { phase } = state;

  switch (action.type) {
    case 'DRAG_CHANGED':
      return { ...state, dragging: action.dragging };

    case 'FILE_PICKED':
      return { ...state, dragging: false, phase: validatePicked(action.file) };

    case 'ANALYSIS_DONE':
      if (phase.kind !== 'analyzing') return state;
      return { ...state, phase: resolveAnalysis(phase.file) };

    case 'PASSWORD_SUBMITTED': {
      if (phase.kind !== 'password') return state;
      const unlocked = action.password === DEMO_PASSWORD;
      return unlocked
        ? { ...state, phase: { kind: 'uploading', file: phase.file, progress: 0 } }
        : { ...state, phase: { ...phase, failedAttempt: true } };
    }

    case 'CONVERT_STARTED': {
      const file = fileOf(phase);
      if (!file || (phase.kind !== 'selected' && phase.kind !== 'error')) return state;
      return { ...state, phase: { kind: 'uploading', file, progress: 0 } };
    }

    case 'PROGRESS_TICKED': {
      if (phase.kind !== 'uploading' && phase.kind !== 'converting') return state;
      const progress = Math.min(100, phase.progress + action.delta);
      if (progress < 100) return { ...state, phase: { ...phase, progress } };
      // Each stage completes into the next one.
      return phase.kind === 'uploading'
        ? { ...state, phase: { kind: 'converting', file: phase.file, progress: 0 } }
        : { ...state, phase: { kind: 'success', file: phase.file } };
    }

    case 'RESULT_SHOWN':
      if (phase.kind !== 'success') return state;
      return { ...state, phase: { kind: 'download-ready', file: phase.file } };

    case 'FAILED':
      return { ...state, phase: { kind: 'error', file: fileOf(phase), reason: action.reason } };

    case 'UPLOAD_CANCELLED':
      if (phase.kind !== 'uploading') return state;
      return { ...state, phase: { kind: 'selected', file: phase.file } };

    case 'FILE_REMOVED':
      return { ...state, phase: { kind: 'empty' } };

    case 'RESET':
      return { ...state, dragging: false, phase: { kind: 'idle' } };

    case 'PAUSE_TOGGLED':
      return { ...state, paused: !state.paused };

    case 'JUMPED':
      return { ...state, dragging: false, phase: action.phase };

    default:
      return state;
  }
}
