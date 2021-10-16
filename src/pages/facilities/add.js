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
        onClick={props.toggleNewModal}
      >
        <FontAwesomeIcon icon={faPlus} className="icon-btn-add" />
        Add Facility
      </Button>
      <Modal
        isOpen={props.newModal}
        toggle={props.toggleNewModal}
      >
        <ModalHeader toggle={props.toggleNewModal}>
          Add new facility
        </ModalHeader>
        <form onSubmit={props.add} encType="multipart/form-data" id="addFacility">
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={props.newData.name}
                onChange={props.onChangeAddHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                id="type"
                name="type"
                value={props.newData.type}
                onChange={props.onChangeAddHandler}
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <Input
                id="image"
                type="file"
                name="image"
                onChange={props.onChangeAddHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Add
            </Button>{" "}
            <Button color="secondary" onClick={props.toggleNewModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default Add
