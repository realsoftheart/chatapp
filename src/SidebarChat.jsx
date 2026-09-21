import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { chatService } from './chatService';
import './SidebarChat.css';

function SidebarChat({ id, name, addNewChat }) {
  const { roomId } = useParams();
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    if (id) {
      const updateLastMsg = () => {
        const msgs = chatService.getMessages(id);
        if (msgs && msgs.length > 0) {
          setLastMessage(msgs[msgs.length - 1].message);
        } else {
          setLastMessage('No messages yet');
        }
      };

      updateLastMsg();
      const unsubscribe = chatService.subscribe(updateLastMsg);
      return () => unsubscribe();
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat room:');
    if (roomName && roomName.trim()) {
      chatService.addRoom(roomName.trim());
    }
  };

  if (addNewChat) {
    return (
      <div onClick={createChat} className="sidebarChat add_new_chat">
        <div className="add_chat_icon">+</div>
        <h2>Add new Chat Room</h2>
      </div>
    );
  }

  const isSelected = roomId === id;

  return (
    <Link to={`/room/${id}`} className="sidebarChat_link">
      <div className={`sidebarChat ${isSelected ? 'sidebarChat_selected' : ''}`}>
        <img
          className="sidebarChat_avatar"
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${id}`}
          alt={name}
        />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{lastMessage || 'No messages yet'}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
