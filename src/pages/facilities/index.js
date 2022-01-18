import React, { useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap'

import axios from 'axios'

import Button from '../../components/button'
import NotifSuccess from '../../components/notif-success'
import NotifFail from '../../components/notif-fail'
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
          <th>Location</th>
          <th>Price</th>
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
                <td>{facility.location}</td>
                <td>{facility.price}</td>
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
                        facility.location,
                        facility.price,
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
    location: '',
    price: '',
  })
  const [editList, setEditList] = useState({
    name: '',
    type: '',
    image: '',
    location: '',
    price: '',
  })

  const getList = () => {
    setIsLoading(true)
    axios.get('http://localhost:8000/api/facility/list')
      .then((response) => {
        if (response.status === 200) {
          setList(response.data.data ? response.data.data : [])
          setIsLoading(false)
        }
      })
      .catch((error) => console.log(error))
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
    data.append("location", newList.location)
    data.append("price", newList.price)
    axios.post('http://localhost:8000/api/facility/create', data)
      .then((response) => {
        setopenAddModal(false)
        setNewList({
          name: '',
          type: '',
          image: '',
          location: '',
          price: '',
        })
        document.querySelector("#addFacility").reset()
        getList()
        if (response.data.status === 200) {
          NotifSuccess('New Facility', 'created')
        } else {
          NotifFail()
        }
      })
      .catch((error) => console.log(error))
  }, [newList])

  const deleteData = (id) => {
    axios.delete('http://localhost:8000/api/facility/delete/' + id)
      .then((response) => {
        getList()
        if (response.data.status === 200) {
          NotifSuccess('Facility', 'deleted')
        } else {
          NotifFail()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const update = (e, id) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", editList.name)
    data.append("type", editList.type)
    data.append("image", editList.image)
    data.append("location", editList.location)
    data.append("price", editList.price)
    axios.post('http://localhost:8000/api/facility/edit/' + id, data)
      .then((response) => {
        getList()
        setopenEditModal(false)
        setEditList({
          name: '',
          type: '',
          image: '',
          location: '',
          price: '',
        })
        document.querySelector("#editFacility").reset()
        if (response.data.status === 200) {
          NotifSuccess('Facility', 'updated')
        } else {
          NotifFail()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editFacility = useCallback((id, name, type, image, location, price) => {
    setEditList({ id, name, type, image, location, price })
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