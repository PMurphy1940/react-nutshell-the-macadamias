import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RequiredModal = (props) => {
 

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