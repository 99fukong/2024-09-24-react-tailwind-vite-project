import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useChatStore } from "./store";
import './ChatBot.css'; // 引入CSS样式

const ChatBot = () => {
  const { messages, addMessage } = useChatStore();
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://burn.hair/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }],
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const aiResponse = response.data.choices[0].message.content;
      addMessage({ role: 'assistant', content: aiResponse });
      setUserInput(''); // 清空输入框
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        addMessage({ role: 'error', content: `与AI通信时发生错误：${error.response.data.error.message}` });
      } else if (error.request) {
        console.error('No response received:', error.request);
        addMessage({ role: 'error', content: '与AI通信时没有收到响应。' });
      } else {
        console.error('Error setting up request:', error.message);
        addMessage({ role: 'error', content: `请求配置错误：${error.message}` });
      }
    }
    
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // 渲染消息列表
  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className={`message ${message.role}`}>
        {message.content}
      </div>
    ));
  };

  // 在组件渲染后自动滚动到最新消息
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="messages">
        {renderMessages()}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="在此输入消息..."
          value={userInput}
          onChange={handleInputChange}
        />
        <button type="submit">发送</button>
      </form>
    </div>
  );
};

export default ChatBot;