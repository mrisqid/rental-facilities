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

const UsersTable = ({ data, deleteUser, editUser }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data.length > 0 && data.map((user, index) => {
            return (
              <tr key={user.email}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className="table-action">
                    <Button
                      size="sm"
                      color="warning"
                      className="btn-action"
                      onClick={() => editUser(
                        user.id,
                        user.username,
                        user.email,
                      )}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => deleteUser(user.id)}
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

const AdminUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState([])
  const [openAddModal, setopenAddModal] = useState(false)
  const [openEditModal, setopenEditModal] = useState(false)
  const [newList, setNewList] = useState({
    username: '',
    email: '',
    password: '',
    level: 'admin',
  })
  const [editList, setEditList] = useState({
    username: '',
    email: '',
  })

  const getList = () => {
    setIsLoading(true)
    axios.get('http://localhost:8000/api/user/list')
      .then((response) => {
        if (response.status === 200) {
          setList(response.data.data ? response.data.data : [])
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
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

  const onChangeAddUserHandler = useCallback((e) => {
    setNewList({ ...newList, [e.target.name]: e.target.value })
  }, [newList])
  const onChangeEditUserHandler = useCallback((e) => {
    setEditList({ ...editList, [e.target.name]: e.target.value })
  }, [editList])

  const addUser = useCallback(() => {
    axios.post('http://localhost:8000/api/user/create', newList)
      .then((response) => {
        setopenAddModal(false)
        setNewList({
          username: '',
          email: '',
          password: '',
        })
        getList()
        if (response.data.status === 200) {
          NotifSuccess('New User', 'created')
        } else {
          NotifFail()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [newList])

  const deleteUser = (id) => {
    axios.delete('http://localhost:8000/api/user/delete/' + id)
      .then((response) => {
        getList()
        if (response.data.status === 200) {
          NotifSuccess('User', 'deleted')
        } else {
          NotifFail()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateUser = (id) => {
    axios.post('http://localhost:8000/api/user/edit/' + id, editList)
      .then((response) => {
        getList()
        setopenEditModal(false)
        setEditList({
          id: '',
          username: '',
          email: ''
        })
        console.log(response)
        if (response.data.status === 200) {
          NotifSuccess('User', 'updated')
        } else {
          NotifFail()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editUser = useCallback((id, username, email) => {
    setEditList({ id, username, email })
    setopenEditModal(!openEditModal)
  }, [openEditModal])

  return (
    <div className="users-section mt-4 mx-3">
      <Card>
        <CardHeader>Users</CardHeader>
        <div className="btn-add-user">
          {/* Modal Add User */}
          <Add
            toggleNewUserModal={toggleOpenAddModal}
            newUserModal={openAddModal}
            onChangeAddUserHandler={onChangeAddUserHandler}
            addUser={addUser}
            newUserData={newList}
          />
          {/* Modal Edit User */}
          <Edit
            toggleEditUserModal={toggleOpenEditModal}
            editUserModal={openEditModal}
            onChangeEditUserHanler={onChangeEditUserHandler}
            editUser={editUser}
            editUserData={editList}
            updateUser={updateUser}
          />
        </div>
        <CardBody className="px-4 pt-2">
          {
            isLoading ? (
              <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <UsersTable
                data={list}
                deleteUser={deleteUser}
                editUser={editUser}
              />
            )
          }
        </CardBody>
      </Card>
    </div>
  )
}

export default AdminUser