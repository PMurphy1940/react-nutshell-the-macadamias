import React from 'react';
import messagesAPIcalls from './messagesAPIcalls';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MessageAddFriendModal = ({friendUserObj, modalFriend, toggleFriendModal, activeUserId, getFriends}) => {
  const addNewFriend = (e) => {
    e.preventDefault()

    const newFriendObj = {
      userId: friendUserObj.userId,
      activeUserId: activeUserId,
      date: new Date()
    }

    messagesAPIcalls.postNewFriend(newFriendObj)
      .then(() => {
        toggleFriendModal()
        getFriends()
      })
  }

  return (
    <div>
      <Modal isOpen={modalFriend} toggle={toggleFriendModal} className="addFriendModal">
        <ModalHeader toggle={toggleFriendModal}>Add New Friend</ModalHeader>
        <ModalBody>
          Are you sure you want to add <b>{friendUserObj.username}</b>?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addNewFriend}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggleFriendModal}>No, I've Changed My Mind</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default MessageAddFriendModal;