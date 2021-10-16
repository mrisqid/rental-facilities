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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Add = (props) => {
  return (
    <div>
      <Button
        className="float-right mb-4"
        color="primary"
        onClick={props.toggleNewUserModal}
      >
        <FontAwesomeIcon icon={faPlus} className="icon-btn-add" />
        Add User
      </Button>
      <Modal
        isOpen={props.newUserModal}
        toggle={props.toggleNewUserModal}
      >
        <ModalHeader toggle={props.toggleNewUserModal}>
          Add new User
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={props.newUserData.username}
              onChange={props.onChangeAddUserHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={props.newUserData.email}
              onChange={props.onChangeAddUserHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={props.newUserData.password}
              onChange={props.onChangeAddUserHandler}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.addUser()}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={props.toggleNewUserModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Add
