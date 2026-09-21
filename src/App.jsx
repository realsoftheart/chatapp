import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Chat from './chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './useStateValue';

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/room/:roomId" element={<Chat />} />
              <Route
                path="/"
                element={
                  <div className="chat_placeholder">
                    <div className="chat_placeholder_content">
                      <svg viewBox="0 0 24 24" width="80" height="80" fill="#00a884">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.08-1.34C8.54 21.49 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                      </svg>
                      <h2>Welcome to ChatApp</h2>
                      <p>Select a chat room on the left to start messaging, or create a new room.</p>
                    </div>
                  </div>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
