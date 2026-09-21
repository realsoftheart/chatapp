import { useState } from 'react';
import { useStateValue } from './useStateValue';
import { actionTypes } from './reducer';
import './Login.css';

function Login() {
  const [, dispatch] = useStateValue();
  const [name, setName] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    const displayName = name.trim() || 'Demo User';
    dispatch({
      type: actionTypes.SET_USER,
      user: {
        name: displayName,
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`
      }
    });
  };

  return (
    <div className="login">
      <div className="login_container">
        <div className="login_icon">
          <svg viewBox="0 0 24 24" width="70" height="70" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.08-1.34C8.54 21.49 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        </div>
        <div className="login_text">
          <h1>Sign in to ChatApp</h1>
          <p>Join conversations in real-time rooms</p>
        </div>

        <form onSubmit={signIn} className="login_form">
          <input
            type="text"
            placeholder="Enter your username (e.g. Alex)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button type="submit" className="login_button">
            Sign In with Username
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            dispatch({
              type: actionTypes.SET_USER,
              user: {
                name: 'Guest User',
                photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=Guest'
              }
            });
          }}
          className="login_guest_button"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default Login;
