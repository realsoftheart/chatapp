const ROOMS_KEY = 'chatapp_rooms';
const MESSAGES_KEY_PREFIX = 'chatapp_messages_';

const initialRooms = [
  { id: 'general', name: 'General Chat' },
  { id: 'react-devs', name: 'React & Vite Devs' },
  { id: 'random', name: 'Random Watercooler' }
];

const initialMessages = {
  general: [
    {
      id: 'm1',
      name: 'Alice',
      message: 'Hey everyone, welcome to ChatApp! 🎉',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 'm2',
      name: 'Bob',
      message: 'Great to be here! The interface looks super fast.',
      timestamp: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  'react-devs': [
    {
      id: 'm3',
      name: 'Sarah',
      message: 'Anyone experimenting with React 19 compiler?',
      timestamp: new Date(Date.now() - 1200000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  random: [
    {
      id: 'm4',
      name: 'Charlie',
      message: 'Coffee or tea for your morning coding session? ☕',
      timestamp: new Date(Date.now() - 600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]
};

function getStoredRooms() {
  try {
    const raw = localStorage.getItem(ROOMS_KEY);
    if (!raw) {
      localStorage.setItem(ROOMS_KEY, JSON.stringify(initialRooms));
      Object.keys(initialMessages).forEach((roomId) => {
        localStorage.setItem(MESSAGES_KEY_PREFIX + roomId, JSON.stringify(initialMessages[roomId]));
      });
      return initialRooms;
    }
    return JSON.parse(raw);
  } catch {
    return initialRooms;
  }
}

function getStoredMessages(roomId) {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY_PREFIX + roomId);
    if (!raw) {
      if (initialMessages[roomId]) {
        localStorage.setItem(MESSAGES_KEY_PREFIX + roomId, JSON.stringify(initialMessages[roomId]));
        return initialMessages[roomId];
      }
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

const listeners = new Set();
function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error(e);
    }
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', notifyListeners);
}

export const chatService = {
  getRooms() {
    return getStoredRooms();
  },

  addRoom(name) {
    if (!name || !name.trim()) return null;
    const rooms = getStoredRooms();
    const id = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36);
    const newRoom = { id, name: name.trim() };
    const updated = [...rooms, newRoom];
    try {
      localStorage.setItem(ROOMS_KEY, JSON.stringify(updated));
      localStorage.setItem(MESSAGES_KEY_PREFIX + id, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
    notifyListeners();
    return newRoom;
  },

  getRoom(roomId) {
    const rooms = getStoredRooms();
    return rooms.find((r) => r.id === roomId) || null;
  },

  getMessages(roomId) {
    return getStoredMessages(roomId);
  },

  sendMessage(roomId, { name, message }) {
    if (!message || !message.trim()) return null;
    const messages = getStoredMessages(roomId);
    const newMsg = {
      id: 'msg-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: name || 'Anonymous',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [...messages, newMsg];
    try {
      localStorage.setItem(MESSAGES_KEY_PREFIX + roomId, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    notifyListeners();
    return newMsg;
  },

  subscribe(callback) {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }
};
