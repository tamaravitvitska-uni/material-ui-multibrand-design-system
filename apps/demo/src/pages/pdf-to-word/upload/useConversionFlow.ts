import { useEffect, useMemo, useReducer } from 'react';
import {
  batchIsSlow,
  batchWillFail,
  flowReducer,
  INITIAL_FLOW_STATE,
  oldestAnalyzing,
  type FlowAction,
  type FlowState,
} from './conversionMachine';

export interface ConversionFlow {
  state: FlowState;
  dispatch: React.Dispatch<FlowAction>;
}

/**
 * Drives the transient parts of the conversion machine with timers,
 * simulating a backend: per-row analysis while gathering, then batch upload
 * progress → conversion progress → success → download-ready. Pausing (state
 * inspector) freezes the timers.
 */
export function useConversionFlow(): ConversionFlow {
  const [state, dispatch] = useReducer(flowReducer, INITIAL_FLOW_STATE);
  const { phase, files, paused } = state;

  useEffect(() => {
    if (paused) return undefined;

    const slowdown = batchIsSlow(files) ? 3 : 1;
    let timer: ReturnType<typeof setTimeout> | undefined;

    switch (phase.kind) {
      case 'gather': {
        // Rows are analyzed one by one, oldest first.
        const pending = oldestAnalyzing(files);
        if (pending) {
          timer = setTimeout(
            () => dispatch({ type: 'ROW_ANALYZED', id: pending.id }),
            700 * slowdown,
          );
        }
        break;
      }

      case 'uploading':
        timer = setTimeout(
          () => dispatch({ type: 'PROGRESS_TICKED', delta: 5 + Math.random() * 9 }),
          110 * slowdown,
        );
        break;

      case 'converting':
        if (batchWillFail(files) && phase.progress >= 62) {
          timer = setTimeout(() => dispatch({ type: 'FAILED' }), 350);
        } else {
          timer = setTimeout(
            () => dispatch({ type: 'PROGRESS_TICKED', delta: 2.5 + Math.random() * 5 }),
            150 * slowdown,
          );
        }
        break;

      case 'success':
        timer = setTimeout(() => dispatch({ type: 'RESULT_SHOWN' }), 1400);
        break;

      default:
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase, files, paused]);

  return useMemo(() => ({ state, dispatch }), [state]);
}
