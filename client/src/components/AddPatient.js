import React, { useContext, useEffect, useRef, useState } from 'react'
import PatientContext from '../context/PatientContext'
import Rspinner from './Rspinner'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'

const AddPatient = () => {
  const context = useContext(PatientContext)
  const { addPatient } = context
  const [patient, setPatient] = useState({
    name: '', sex: '', age: '', mobile: '', address: '', pmh: '', workDone: '', payment: '', balance: '', nextAppointment: ''
  })
  const sexOptions = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'O', label: 'Other' }
  ]
  const setInput = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value.toLocaleUpperCase() })
  }
  const setSex = (e) => {
    setPatient({ ...patient, sex: e.value })
  }
  let navigate = useNavigate()
  const handleOnClick = (e) => {
    e.preventDefault()
    addPatient(patient.name, patient.sex, patient.age, patient.mobile || '', patient.address, patient.pmh || '', patient.workDone || '', patient.payment, patient.balance, patient.nextAppointment || '', '' + Date().toLocaleString())
    toast.success('New patient added')
    navigate('/dashboard')
  }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])
  const [spinnerShow, setSpinnerShow] = useState(true)
  setTimeout(() => {
    setSpinnerShow(false)
  }, 500)

  return (
    <>
      {spinnerShow ? <Rspinner /> : <Card className='p-3' style={{ boxShadow: '0 0.1rem 1.5rem rgba(0, 0, 0, 0.4)' }}>
        <Form>
          <Row>
            <Form.Group className='mb-3 col-lg-6'>
              <div className='form-label-parent d-flex'>
                <div className='form-label-child'>
                  <Form.Label>Name</Form.Label>
                </div>
                <div className='form-label-child' style={{ color: 'red' }}>
                  &nbsp;*
                </div>
              </div>
              <Form.Control type='text' name='name' value={patient.name} onChange={setInput} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <div className='form-label-parent d-flex'>
                <div className='form-label-child'>
                  <Form.Label>Sex</Form.Label>
                </div>
                <div className='form-label-child' style={{ color: 'red' }}>
                  &nbsp;*
                </div>
              </div>
              <Select options={sexOptions} onChange={setSex} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <div className='form-label-parent d-flex'>
                <div className='form-label-child'>
                  <Form.Label>Age</Form.Label>
                </div>
                <div className='form-label-child' style={{ color: 'red' }}>
                  &nbsp;*
                </div>
              </div>
              <Form.Control type='number' name='age' value={patient.age} onChange={setInput} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <Form.Label>Mobile</Form.Label>
              <InputGroup>
                <InputGroup.Text>+91</InputGroup.Text>
                <Form.Control type='tel' name='mobile' value={patient.mobile} onChange={setInput} minLength={10} maxLength={10} />
              </InputGroup>
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <div className='form-label-parent d-flex'>
                <div className='form-label-child'>
                  <Form.Label>Address</Form.Label>
                </div>
                <div className='form-label-child' style={{ color: 'red' }}>
                  &nbsp;*
                </div>
              </div>
              <Form.Control type='text' name='address' value={patient.address} onChange={setInput} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <Form.Label>Past medical history (PMH)</Form.Label>
              <Form.Control type='text' name='pmh' value={patient.pmh} onChange={setInput} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <Form.Label>Work done</Form.Label>
              <Form.Control type='text' name='workDone' value={patient.workDone} onChange={setInput} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <div className='form-label-parent d-flex'>
                <div className='form-label-child'>
                  <Form.Label>Payment</Form.Label>
                </div>
                <div className='form-label-child' style={{ color: 'red' }}>
                  &nbsp;*
                </div>
              </div>
              <Form.Control type='number' name='payment' value={patient.payment} onChange={setInput} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <div className='form-label-parent d-flex'>
                <div className='form-label-child'>
                  <Form.Label>Balance</Form.Label>
                </div>
                <div className='form-label-child' style={{ color: 'red' }}>
                  &nbsp;*
                </div>
              </div>
              <Form.Control type='number' name='balance' value={patient.balance} onChange={setInput} />
            </Form.Group>
            <Form.Group className='mb-3 col-lg-6'>
              <Form.Label>Next appointment</Form.Label>
              <Form.Control type='datetime-local' name='nextAppointment' value={patient.nextAppointment} onChange={setInput} />
            </Form.Group>
          </Row>
          <Button disabled={!patient.name.toString().length || !patient.sex.toString().length || !patient.age.toString().length || !patient.address.toString().length || !patient.payment.toString().length || !patient.balance.toString().length} variant='primary mt-2 mb-2' style={{ width: '100%' }} type='submit' onClick={handleOnClick}>
            Add&nbsp;patient
          </Button>
        </Form>
      </Card >}
    </>
  )
}

export default AddPatient
