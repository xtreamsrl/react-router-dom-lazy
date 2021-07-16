import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

function isCallable<S>(
  newState: SetStateAction<S>,
): newState is (prevState: S) => S {
  return typeof newState === 'function';
}

export default function useStateWithRef<S>(
  initialState: S,
): [S, Dispatch<SetStateAction<S>>, React.MutableRefObject<S>];

export default function useStateWithRef<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  React.MutableRefObject<S | undefined>,
];


export default function useStateWithRef(initialState?: any) {
  const [state, setStateInternal] = useState(initialState);

  const stateRef = useRef(state);

  const setState = useCallback(newState => {
    if (isCallable(newState)) {
      setStateInternal((prevState: any) => {
        const nextState = newState(prevState);
        stateRef.current = nextState;
        return nextState;
      });
    } else {
      setStateInternal(newState);
      stateRef.current = newState;
    }
  }, []);

  return [state, setState, stateRef];
}
