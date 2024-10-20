import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useChatStore } from "./store";
import './ChatBot.css'; // 引入CSS样式
import { useChatStore } from './chatStore'; // 引入 chatStore


const ChatBot = () => {
  const {messages, addMessage } = useChatStore();
  const [userInput, setUserInput] = useState('');

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!userInput) return;

  //   try {
  //     const response = await axios.post('/api/azurechatgpt', {
  //       text: userInput // 发送的文本字段
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     let aiResponse = response.data.choices[0].message.content;
  //     addMessage({ role: 'assistant', content: aiResponse });
  //     setUserInput(''); // 清空输入框
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput) return;
    setUserInput(''); 
    addMessage({ role: 'user', content: userInput }); // 添加用户消息
  
    try {
      const response = await axios.post('/api/azurechatgpt', {
        text: userInput
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      let aiResponse = response.data.choices[0].message.content;
      addMessage({ role: 'assistant', content: aiResponse }); // 添加AI回复
      setUserInput('');
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
  // const renderMessages = () => {
  //   return messages.map((message, index) => (
  //     <div key={index} className={`message ${message.role}`}>
  //       {message.content}
  //     </div>
  //   ));
  // };
  const renderMessages = () => {
    const pairedMessages = [];
    
    // 遍历消息列表，按顺序将用户消息和 AI 回复配对
    for (let i = 0; i < messages.length; i++) {
      const userMessage = messages[i];
      const aiMessage = messages[i + 1]; // 假设下一个是 AI 的回复
  
      if (userMessage.role === 'user' && aiMessage && aiMessage.role === 'assistant') {
        pairedMessages.push(
          <div key={i} className="message-pair">
            <div className="message user">{userMessage.content}</div>
            <div className="message assistant">{aiMessage.content}</div>
          </div>
        );
        i++; // 跳过 AI 回复，因为已经配对显示
      } else {
        // 单独显示未配对的消息（如出错消息）
        pairedMessages.push(
          <div key={i} className={`message ${userMessage.role}`}>
            {userMessage.content}
          </div>
        );
      }
    }
  
    return pairedMessages;
  };
  

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);
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