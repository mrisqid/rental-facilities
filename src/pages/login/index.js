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

const Login = () => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  })
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
        .post('http://localhost:8000/api/user/login', account)
        .then((response) => {
          setIsLoading(false)
          if (response.data.status === 200) {
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("userData", JSON.stringify(response.data.data))
            setMsg(response.data.message)
            window.location.reload()
          }
          if (response.data.status === "failed" && response.data.success === undefined) {
            setErrMsgEmail(response.data.validation_error.email)
            setErrMsgPwd(response.data.validation_error.password)
            setTimeout(() => {
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
    <div className="login-box shadow bg-white">
      <div className="text-center mb-4">
        <h1 className="login-title">Admin Login</h1>
      </div>
      <Form>
        <FormGroup className="mb-2">
          <Label for="email" className="label">Email</Label>
          <Input type="email" name="email" className="form-control" id="email" onChange={onChangeHandler} />
          <span className="text-success">{msg}</span>
          <span className="text-danger">{errMsgEmail}</span>
        </FormGroup>
        <FormGroup>
          <Label for="password" className="label">Password</Label>
          <Input type="password" name="password" className="form-control" id="password" onChange={onChangeHandler} />
          <span className="text-danger">{errMsgPwd}</span>
        </FormGroup>
      </Form>
      <div className="text-center">
        <p className="text-danger">{errMsg}</p>
        <MyButton type="submit" className="mt-4 w-100 button" onClick={onSubmitHandler}>
          Login
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
    </div>
  )
}

export default Login