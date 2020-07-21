import React, { useState } from 'react';
import messagesAPIcalls from './messagesAPIcalls';
import './MessageForm.css'

const MessageForm = ({getMessages, activeUserId}) => {
  // Initializing message state
  const [messages, setMessages] = useState({
    userId: "",
    message: "",
    date: ""
  })

  // Initializing isLoading state
  const [isLoading, setIsloading] = useState(false)

  // Method changes the message state according to the user input
  const handleFieldChange = (e) => {
    const stateToChange = {...messages}
    stateToChange[e.target.id] = e.target.value
    setMessages(stateToChange)
  }

  // Method posting new message to API on send event click
  const constructNewMessage = (e) => {
    e.preventDefault()
  
    if (messages.message === "") {
      window.alert("Please enter a message")
    } else {
      setIsloading(true)

      const newMessageObj = {
        userId: activeUserId,
        message: messages.message,
        date: new Date().toLocaleString('en-US', {hour12: false}).replace(',', "")
      }

      messagesAPIcalls.post(newMessageObj)
        .then(() => {
          getMessages()
          setMessages({
            userId: "",
            message: "",
            date: ""
          })
          document.getElementById('form').reset()
          setIsloading(false)
        })
    }
  }

  return (
    <>
      <form className="form-inline" id="form">
        <div className="form-group">
          <input type="text" className="form-control" id="message" placeholder="Enter message" onChange={handleFieldChange} />
        </div>
          <button type="button" className="btn btn-primary" disabled={isLoading} onClick={constructNewMessage}>Send</button>
      </form>
    </>
  )
}

export default MessageForm;