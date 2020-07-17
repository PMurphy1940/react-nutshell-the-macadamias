import React, { useState, useEffect } from 'react';
import MessageCard from './MessageCard';
import messagesAPIcalls from './messagesAPIcalls';

// Component is going to grab all messages in API cycle them through component to make them into message cards and display them. User should be able to post and edit own messages and add new friends.
const Messages = () => {
  const [messages, setMessages] = useState([])

  const getMessages = () => {
    return messagesAPIcalls.getAll()
      .then(response => {
        setMessages(response)
      })
  }

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <>
      <div className="messages__container">
        <div className="messages__display">
          {messages.map(message => <MessageCard key={message.id} message={message} />)}
        </div>
        <div className="messages__form">
          {/* Form component goes here */}
        </div>
      </div>
    </>
  )
}

export default Messages;