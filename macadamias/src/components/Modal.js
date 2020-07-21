//Author => Patrick Murphy,
//This module supplies Modal windows for anyone that want to use them in React-Nutshell//

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RequiredModal = (props) => {

    //Place your return in here and modal will send back if you call it in your render//
let modalType

if (props.modalType === "Required") {
    //This one gives you a fields required window => PM//
    modalType = (
    <div>
      <Modal isOpen={props.modal} >
        <ModalHeader >We're Sorry</ModalHeader>
        <ModalBody>
          All article fields must be filled out
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>)
    }

    else if (props.modalType === "Delete") {
        //This one gives you a confirm delete window => PM//
    modalType = (
    <div>
      <Modal isOpen={props.confirmDeleteModal} >
        <ModalHeader >Warning</ModalHeader>
        <ModalBody>
          Are you sure you wish to continue?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={ () => props.handleDelete(props.deleteId)}>Delete</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>)
    }


  return (
      <>
      {modalType}
      </>
   )
}

export default RequiredModal;