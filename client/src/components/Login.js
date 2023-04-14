import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import Rspinner from './Rspinner'
import PatientContext from '../context/PatientContext'

const Login = () => {
  const context = useContext(PatientContext)
  const { setYesShowSpinRequired } = context
  let navigate = useNavigate()
  const HOST = process.env.REACT_APP_BACKEND_URL
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${HOST}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
    const json = await response.json()
    // console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      toast.success('Logged into your account')
      setYesShowSpinRequired(true)
      navigate('/dashboard')
    } else {
      toast.error('Invalid particulars')
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])
  const [spinnerShow, setSpinnerShow] = useState(true)
  setTimeout(() => {
    setSpinnerShow(false)
  }, 500)

  return (
    <>
      {spinnerShow ? <Rspinner /> : <div className="d-flex justify-content-center">
        <div className='login-signup-class'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' value={credentials.email} onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' value={credentials.password} onChange={onChange} />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Log&nbsp;in
            </Button>
          </Form>
        </div>
      </div >}
    </>
  )
}

export default Login
