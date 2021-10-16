import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap"

const Edit = (props) => {
  return (
    <div>
      <Modal
        isOpen={props.editUserModal}
        toggle={props.toggleEditUserModal}
      >
        <ModalHeader toggle={props.toggleEditUserModal}>
          Update User
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={props.editUserData.username}
              onChange={props.onChangeEditUserHanler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={props.editUserData.email}
              onChange={props.onChangeEditUserHanler}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            onClick={() => props.updateUser(props.editUserData.id)}
          >
            Update
          </Button>
          <Button
            color="secondary"
            onClick={props.toggleEditUserModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Edit
