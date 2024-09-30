  
import { create } from 'zustand';
const apiKey = import.meta.env.VITE_CHAT_API_KEY;
if (!apiKey) {
  throw new Error('Please set your API key in a .env file');
}

const useChatStore = create((set) => ({
  apiKey: apiKey,
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
export { useChatStore };