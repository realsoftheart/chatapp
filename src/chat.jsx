import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from './useStateValue';
import { chatService } from './chatService';
import './Chat.css';

function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      const loadRoomData = () => {
        const room = chatService.getRoom(roomId);
        if (room) {
          setRoomName(room.name);
        } else {
          setRoomName('Chat Room');
        }
        setMessages(chatService.getMessages(roomId));
      };

      loadRoomData();
      const unsubscribe = chatService.subscribe(loadRoomData);
      return () => unsubscribe();
    }
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !roomId) return;

    chatService.sendMessage(roomId, {
      name: user?.name || 'Anonymous',
      message: input.trim()
    });

    setInput('');
  };

  const lastSeen = messages.length > 0 ? messages[messages.length - 1].timestamp : 'recently';

  return (
    <div className="chat">
      <div className="chat_header">
        <img
          className="chat_headerAvatar"
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${roomId}`}
          alt={roomName}
        />
        <div className="chat_headerInfo">
          <h3>{roomName || 'Select a room'}</h3>
          <p>Last activity at {lastSeen}</p>
        </div>
        <div className="chat_headerRight">
          <button className="chat_iconBtn" title="Search messages">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
          <button className="chat_iconBtn" title="Attach file">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V6H9v9.5a3 3 0 0 0 6 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="chat_body">
        {messages.length === 0 ? (
          <div className="chat_noMessages">No messages in this room yet. Say hi! 👋</div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.name === user?.name;
            return (
              <p key={msg.id} className={`chat_message ${isMe ? 'chat_receiver' : ''}`}>
                <span className="chat_name">{msg.name}</span>
                {msg.message}
                <span className="chat_timestamp">{msg.timestamp}</span>
              </p>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat_footer">
        <button
          type="button"
          className="chat_iconBtn"
          onClick={() => setInput((prev) => prev + ' 😊')}
          title="Insert emoji"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </button>

        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message..."
            autoFocus
          />
          <button type="submit" className="chat_sendBtn" title="Send message">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;