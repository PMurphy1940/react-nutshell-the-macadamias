import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import messagesAPIcalls from './messagesAPIcalls';

const MessageEditModal = ({messageIdEdit, modal, toggle}) => {
  const [message, setMessage] = useState({
    userId: "",
    message: "",
    date: "",
    id: ""
  })

  const getSingleMessage = () => {
    messagesAPIcalls.get(messageIdEdit)
      .then(response => {
        setMessage({message: response.message, id: response.id, userId: response.userId, date: response.date})
      })
  }

  const handleFieldChange = (e) => {
    const stateToChange = {...message}
    stateToChange[e.target.id] = e.target.value
    setMessage(stateToChange)
  }

  const updateMessage = (e) => {
    e.preventDefault()

    const editedMessage = {
      userId: message.userId,
      message: message.message,
      date: message.date,
      id: message.id
    }

    messagesAPIcalls.update(editedMessage)
  }

  useEffect(() => {
    if (messageIdEdit === null) {
      return
    } else {
      getSingleMessage()
    }
  }, [messageIdEdit])

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="messageEditModal">
        <ModalHeader toggle={toggle}>Edit Message</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <input type="text" className="form-control" id="message" value={message.message} onChange={handleFieldChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateMessage}>Submit Changes</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default MessageEditModal;