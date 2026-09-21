export const initialState = {
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem('chatapp_user'));
    } catch {
      return null;
    }
  })(),
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      try {
        if (action.user) {
          localStorage.setItem('chatapp_user', JSON.stringify(action.user));
        } else {
          localStorage.removeItem('chatapp_user');
        }
      } catch {
        // ignore storage errors
      }
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.LOGOUT:
      try {
        localStorage.removeItem('chatapp_user');
      } catch {
        // ignore storage errors
      }
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
