import React, { useState, useEffect } from 'react';
import MessageCard from './MessageCard';
import messagesAPIcalls from './messagesAPIcalls';
import MessageForm from './MessageForm';
import MessageEditModal from './MessageEditModal';
import MessageAddFriendModal from './MessageAddFriendModal';
import './Messages.css'

// Component is going to grab all messages in API cycle them through component to make them into message cards and display them. User should be able to post and edit own messages and add new friends.
const Messages = () => {
  // Initializing messages state
  const [messages, setMessages] = useState([])
  
  // Initializing user's friends state
  const [userFriends, setUserFriends] = useState([])

  // Initializing state to store message id to be edited
  const [messageIdEdit, setMessageIdEdit] = useState(null)

  // Initializing state to store friend user id to be added
  const [friendUserObj, setFriendUserObj] = useState({userId: "", username: ""})

  // Initializing modal state for edit message
  const [modal, setModal] = useState(false);

  // Initializing modal state for add new friend
  const [modalFriend, setModalFriend] = useState(false)

  // Method toggles modal state to true or open for edit message
  const toggle = () => setModal(!modal);

  // Method toggles modal state to true or open for add new friend
  const toggleFriendModal = () => setModalFriend(!modalFriend)

  // Method grabs the id of the message to be edited and sets the message id state with it
  const editMessageId = (id) => {
    setMessageIdEdit(id)
    toggle()
  }

  // Method grabs the friend user id to be added and sets the friend user id state
  const addFriendObj = (friendObj) => {
    setFriendUserObj({userId: friendObj.userId, username: friendObj.user.username})
    toggleFriendModal()
  }

  // Retrieving active user credentials from session storage, storing activeUserId in variable
  const activeUser = JSON.parse(sessionStorage.getItem('credentials'))
  const activeUserId = activeUser.activeUserId

  // Method invokes getAll() API method retrieving all messages and setting the messages state
  const getMessages = () => {
    return messagesAPIcalls.getAll()
      .then(response => {
        setMessages(response)
      })
  }

  // Method invokes getUserFriends(activeUserId) API method retrieving all of active user's friends and setting userFriends state
  const getFriends = () => {
    return messagesAPIcalls.getUserFriends(activeUserId)
      .then(response => {
        setUserFriends(response)
      })
  }

  // useEffect invokes getMessages() method
  useEffect(() => {
    getMessages()
    getFriends()
  }, [])

  return (
    <>
      <div className="messages__container">
        <div className="messages__display">
          <MessageEditModal messageIdEdit={messageIdEdit} modal={modal} toggle={toggle} getMessages={getMessages} />
          <MessageAddFriendModal friendUserObj={friendUserObj} modalFriend={modalFriend} toggleFriendModal={toggleFriendModal} activeUserId={activeUserId} getFriends={getFriends} />
          {messages.map(message => <MessageCard key={message.id} message={message} activeUserId={activeUserId} userFriends={userFriends} editMessageId={editMessageId} addFriendObj={addFriendObj} />)}
        </div>
        <div className="messages__form">
          <MessageForm getMessages={getMessages} activeUserId={activeUserId} />
        </div>
      </div>
    </>
  )
}

export default Messages;