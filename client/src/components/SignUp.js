import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { toast } from 'react-toastify'
import PatientContext from '../context/PatientContext'
import Rspinner from './Rspinner'

const SignUp = () => {
  const context = useContext(PatientContext)
  const { setYesShowSpinRequired } = context
  let navigate = useNavigate()
  const HOST = process.env.REACT_APP_BACKEND_URL
  const SECRET = process.env.REACT_APP_SECRET
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '', secretString: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, cpassword, secretString } = credentials
    if (password !== cpassword) {
      toast.error('Passwords do not match')
      return;
    }
    else if (password.length < 8) {
      toast.error('Password must be atleast 8 characters')
      return;
    }
    else if (secretString !== SECRET) {
      toast.error('Wrong secret string')
      return;
    }
    const response = await fetch(`${HOST}/api/auth/createdoctor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()
    // console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      toast.success('New account created')
      setYesShowSpinRequired(true)
      navigate('/dashboard')
    } else {
      toast.error('Invalid particulars')
    }
  }
  const onChangeCapitalise = (e) => {
    setCredentials({ ...credentials, name: e.target.value.toLocaleUpperCase() })
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
              <Form.Label>Doctor's name</Form.Label>
              {/* <InputGroup> */}
                {/* <InputGroup.Text>Dr.</InputGroup.Text> */}
                <Form.Control type='text' name='name' value={credentials.name} onChange={onChangeCapitalise} />
              {/* </InputGroup> */}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' value={credentials.email} onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' value={credentials.password} onChange={onChange} placeholder='password must be atleast 8 characters' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type='password' name='cpassword' value={credentials.cpassword} onChange={onChange} placeholder='password must be atleast 8 characters' />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Secret string</Form.Label>
              <Form.Control type='password' name='secretString' value={credentials.secretString} onChange={onChange} />
            </Form.Group>
            <Button variant='primary' type='submit' disabled={!credentials.name || !credentials.email || !credentials.password || !credentials.cpassword || !credentials.secretString}>
              Sign&nbsp;up
            </Button>
          </Form >
        </div>
      </div>}
    </>
  )
}

export default SignUp
