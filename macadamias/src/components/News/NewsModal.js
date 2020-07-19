import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RequiredModal = (props) => {
 
const modalRequired = (
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

const modalConfirm = (
    <div>
      <Modal isOpen={props.modal} >
        <ModalHeader >Warning</ModalHeader>
        <ModalBody>
          Are you sure you wish to continue?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>)

//   const [modal, setModal] = useState(true);

//   const toggle = () => setModal(!modal);

  return (
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
    </div>
  );
}

export default RequiredModal;