import React, { useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap'

import axios from 'axios'

import Button from '../../components/button'
import Add from './add'
import Edit from './edit'

import './styles.css'

const FacilityTable = ({ data, deleteData, editFacility }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data.length > 0 && data.map((facility, index) => {
            return (
              <tr key={facility.name + index}>
                <th scope="row">{index + 1}</th>
                <td>{facility.name}</td>
                <td>{facility.type}</td>
                <td>{facility.image}</td>
                <td>
                  <div className="table-action">
                    <Button
                      size="sm"
                      color="warning"
                      className="btn-action"
                      onClick={() => editFacility(
                        facility.id,
                        facility.name,
                        facility.type,
                        facility.image,
                      )}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => deleteData(facility.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

const Facilities = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState([])
  const [openAddModal, setopenAddModal] = useState(false)
  const [openEditModal, setopenEditModal] = useState(false)
  const [newList, setNewList] = useState({
    name: '',
    type: '',
    image: '',
  })
  const [editList, setEditList] = useState({
    name: '',
    type: '',
    image: '',
  })

  const getList = () => {
    axios.get('http://localhost:8000/api/facility/list')
      .then((response) => {
        if (response.status === 200) {
          setList(response.data.data ? response.data.data : [])
        }
      })
  }

  useEffect(() => {
    getList()
  }, [])

  const toggleOpenAddModal = () => {
    setopenAddModal(!openAddModal)
  }
  const toggleOpenEditModal = () => {
    setopenEditModal(!openEditModal)
  }

  const onChangeAddHandler = useCallback((e) => {
    if (e.target.name === 'image') {
      setNewList({ ...newList, [e.target.name]: e.target.files[0] })
    } else {
      setNewList({ ...newList, [e.target.name]: e.target.value })
    }
  }, [newList])
  const onChangeEditHandler = useCallback((e) => {
    if (e.target.name === 'image') {
      setEditList({ ...editList, [e.target.name]: e.target.files[0] })  
    } else {
      setEditList({ ...editList, [e.target.name]: e.target.value })
    }
  }, [editList])

  const add = useCallback((e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", newList.name)
    data.append("type", newList.type)
    data.append("image", newList.image)
    axios.post('http://localhost:8000/api/facility/create', data)
      .then(() => {
        setopenAddModal(false)
        setNewList({
          name: '',
          type: '',
          image: '',
        })
        document.querySelector("#addFacility").reset()
        getList()
      })
  }, [newList])

  const deleteData = (id) => {
    setIsLoading(true)
    axios.delete('http://localhost:8000/api/facility/delete/' + id)
      .then(() => {
        setIsLoading(false)
        getList()
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const update = (e, id) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", editList.name)
    data.append("type", editList.type)
    data.append("image", editList.image)
    setIsLoading(true)
    axios.post('http://localhost:8000/api/facility/edit/' + id, data)
      .then(() => {
        getList()
        setopenEditModal(false)
        setEditList({
          name: '',
          type: '',
          image: ''
        })
        document.querySelector("#editFacility").reset()
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error.response)
      })
  }

  const editFacility = useCallback((id, name, type, image) => {
    setEditList({ id, name, type, image })
    setopenEditModal(!openEditModal)
  }, [openEditModal])

  return (
    <div className="users-section mt-4 mx-3">
      <Card>
        <CardHeader>Facilities</CardHeader>
        <div className="btn-add-user">
          {/* Modal Add */}
          <Add
            toggleNewModal={toggleOpenAddModal}
            newModal={openAddModal}
            onChangeAddHandler={onChangeAddHandler}
            add={add}
            newData={newList}
          />
          {/* Modal Edit */}
          <Edit
            toggleEditModal={toggleOpenEditModal}
            editModal={openEditModal}
            onChangeEditHandler={onChangeEditHandler}
            edit={editFacility}
            editData={editList}
            update={update}
          />
        </div>
        <CardBody className="px-4 pt-2">
          {
            isLoading ? (
              <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <FacilityTable
                data={list}
                deleteData={deleteData}
                editFacility={editFacility}
              />
            )
          }
        </CardBody>
      </Card>
    </div>
  )
}

export default Facilities