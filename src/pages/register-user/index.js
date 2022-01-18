import React, { useState } from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import axios from 'axios'

import MyButton from '../../components/button'

import './styles.css'

const Register = () => {
  const [account, setAccount] = useState({
    username: '',
    email: '',
    password: '',
    level: 'user',
  })
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errMsgUsername, setErrMsgUsername] = useState('')
  const [errMsgEmail, setErrMsgEmail] = useState('')
  const [errMsgPwd, setErrMsgPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const onChangeHandler = (e) => {
    let name = e.target.name
    let value = e.target.value
    setAccount({...account, [name]: value })
  }

  const onSubmitHandler = async () => {
    setIsLoading(true)
    try {
      await axios
        .post('http://localhost:8000/api/user/create', account)
        .then((response) => {
          setIsLoading(false)
          if (response.data.status === 200) {
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("userData", JSON.stringify(response.data.data))
            setMsg(response.data.message)
            setAccount({
              username: '',
              email: '',
              password: '',
            })
            window.location.reload()
          }
          if (response.data.status === "failed" && response.data.success === undefined) {
            setErrMsgUsername(response.data.errors.username)
            setErrMsgEmail(response.data.errors.email)
            setErrMsgPwd(response.data.errors.password)
            setTimeout(() => {
              setErrMsgUsername('')
              setErrMsgEmail('')
              setErrMsgPwd('')
            }, 2000)
          }
          if (response.data.status === "failed" && response.data.success === false) {
            setErrMsg(response.data.message)
            setTimeout(() => {
              setErrMsg('')
            }, 2000)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      // do nothing
    }
  }

  return (
    <div className="register-box shadow bg-white">
      <div className="text-center mb-4">
        <h1 className="register-title">Form Register</h1>
      </div>
      <Form>
        <FormGroup className="mb-2">
          <Label for="username" className="label">Username</Label>
          <Input type="text" name="username" className="form-control" id="username" onChange={onChangeHandler} />
          <span className="text-danger">{errMsgUsername}</span>
        </FormGroup>
        <FormGroup className="mb-2">
          <Label for="email" className="label">Email</Label>
          <Input type="email" name="email" className="form-control" id="email" onChange={onChangeHandler} />
          <span className="text-danger">{errMsgEmail}</span>
        </FormGroup>
        <FormGroup>
          <Label for="password" className="label">Password</Label>
          <Input type="password" name="password" className="form-control" id="password" onChange={onChangeHandler} />
          <span className="text-danger">{errMsgPwd}</span>
        </FormGroup>
      </Form>
      <div className="text-center">
        <p className="text-success">{msg}</p>
        <p className="text-danger">{errMsg}</p>
        <MyButton type="submit" className="mt-4 w-100 button" onClick={onSubmitHandler}>
          Register
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm ml-5"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <span></span>
          )}
        </MyButton>
      </div>
      <div className="mt-2 d-flex flex-row justify-content-end">
        <p className="text-muted">
          Sudah punya akun? <a className="text-reset" href="/">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register