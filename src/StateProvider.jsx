import { useReducer } from 'react';
import { StateContext } from './StateContext';

function StateProvider({ reducer, initialState, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;
