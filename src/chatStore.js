import { create } from 'zustand';

const messageLength = -13; // 设置保留的最大消息数

const useChatStore = create((set) => ({
  messages: [],
  addMessage: (message) => set((state) => {
    const newMessages = [...state.messages, message];
    // 只保留最后 messageLength 条消息
    return { messages: newMessages.slice(messageLength) };
  }),
}));

export { useChatStore };
