import { useEffect, useMemo, useReducer } from 'react';
import {
  flowReducer,
  INITIAL_FLOW_STATE,
  isSlowConversion,
  willFailOnServer,
  type FlowAction,
  type FlowState,
} from './conversionMachine';

export interface ConversionFlow {
  state: FlowState;
  dispatch: React.Dispatch<FlowAction>;
}

/**
 * Drives the transient phases of the conversion machine with timers,
 * simulating a backend: analysis → upload progress → conversion progress →
 * success → download-ready. Pausing (state inspector) freezes the timers.
 */
export function useConversionFlow(): ConversionFlow {
  const [state, dispatch] = useReducer(flowReducer, INITIAL_FLOW_STATE);
  const { phase, paused } = state;

  useEffect(() => {
    if (paused) return undefined;

    const slowdown =
      'file' in phase && phase.file && isSlowConversion(phase.file) ? 3 : 1;
    let timer: ReturnType<typeof setTimeout> | undefined;

    switch (phase.kind) {
      case 'analyzing':
        timer = setTimeout(() => dispatch({ type: 'ANALYSIS_DONE' }), 900 * slowdown);
        break;

      case 'uploading':
        timer = setTimeout(
          () => dispatch({ type: 'PROGRESS_TICKED', delta: 5 + Math.random() * 9 }),
          110 * slowdown,
        );
        break;

      case 'converting':
        if (willFailOnServer(phase.file) && phase.progress >= 62) {
          timer = setTimeout(() => dispatch({ type: 'FAILED', reason: 'server-error' }), 350);
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
  }, [phase, paused]);

  return useMemo(() => ({ state, dispatch }), [state]);
}
