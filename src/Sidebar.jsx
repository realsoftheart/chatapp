import { useEffect, useState } from 'react';
import SidebarChat from './SidebarChat';
import { useStateValue } from './useStateValue';
import { actionTypes } from './reducer';
import { chatService } from './chatService';
import './Sidebar.css';

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRooms = () => {
      setRooms(chatService.getRooms());
    };

    fetchRooms();
    const unsubscribe = chatService.subscribe(fetchRooms);
    return () => unsubscribe();
  }, []);

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_user">
          <img
            className="sidebar_avatar"
            src={user?.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
            alt={user?.name}
          />
          <div className="sidebar_userName">
            <h3>{user?.name || 'Guest'}</h3>
            <span>Online</span>
          </div>
        </div>
        <div className="sidebar_headerRight">
          <button onClick={logout} className="sidebar_iconButton" title="Log Out">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#54656f" className="search_icon">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            placeholder="Search or start new chat"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {filteredRooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
