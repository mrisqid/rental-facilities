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
        isOpen={props.editModal}
        toggle={props.toggleEditModal}
      >
        <ModalHeader toggle={props.toggleEditModal}>
          Update Facility
        </ModalHeader>
        <form onSubmit={(e) => props.update(e, props.editData.id)} encType="multipart/form-data" id="editFacility">
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={props.editData.name}
                onChange={props.onChangeEditHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                id="type"
                name="type"
                value={props.editData.type}
                onChange={props.onChangeEditHanler}
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <Input
                id="image"
                type="file"
                name="image"
                onChange={props.onChangeEditHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              type="submit"
            >
              Update
            </Button>
            <Button
              color="secondary"
              onClick={props.toggleEditModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default Edit
