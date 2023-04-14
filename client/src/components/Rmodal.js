import React, { useContext, useRef, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PatientsContext from '../context/PatientContext'
import InputGroup from 'react-bootstrap/InputGroup'

const Rmodal = (props) => {
  const context = useContext(PatientsContext)
  const { editPatient, deletePatient } = context
  const { id, name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment, registrationDate, onHide } = props
  const [modalPatient, setModalPatient] = useState({
    name: name, sex: sex, age: age, mobile: mobile, address: address, pmh: pmh, workDone: workDone, payment: payment, balance: balance, nextAppointment: nextAppointment
  })
  const sexOptions = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'O', label: 'Other' }
  ]
  const getSexLabel = (s) => {
    if (s === 'M') return 'Male'
    else if (s === 'F') return 'Female'
    else if (s === 'O') return 'Other'
  }
  const [modalShow, setModalShow] = useState(true)
  const onModalHide = () => {
    onHide()
    setModalShow(false)
  }

  const [operation, setOperation] = useState(-1) // nothing -1, edit 1, delete 0
  const [sahayakModal, setSahayakModal] = useState(false)
  const [editAccess, setEditAccess] = useState(false)

  const handleEditClick = () => {
    setOperation(1)
    setSahayakModal(true)
  }
  const handleDeleteClick = () => {
    setOperation(0)
    setSahayakModal(true)
  }
  const sahayakModalReturnsFalse = () => {
    setOperation(-1)
    setSahayakModal(false)
  }
  const sahayakModalReturnsTrue = () => {
    if (operation === 1) {
      setEditAccess(true)
      setOperation(-1)
      setSahayakModal(false)
    }
    else if (operation === 0) {
      deletePatient(id)
      setOperation(-1)
      setSahayakModal(false)
      onHide()
      setModalShow(false)
    }
  }
  const handleSaveClick = () => {
    editPatient(id, modalPatient.name, modalPatient.sex, modalPatient.age, modalPatient.mobile, modalPatient.address, modalPatient.pmh, modalPatient.workDone, modalPatient.payment, modalPatient.balance, modalPatient.nextAppointment)
    setOperation(-1)
    onHide()
    setModalShow(false)
  }
  const setInput = (e) => {
    setModalPatient({ ...modalPatient, [e.target.name]: e.target.value.toLocaleUpperCase() })
  }
  const setSex = (e) => {
    setModalPatient({ ...modalPatient, sex: e.value })
  }

  return (
    <>
      <Modal show={sahayakModal} centered animation={false}>
        <Modal.Body style={{ backgroundColor: 'yellow', border: '1px solid #adacac', borderRadius: '6px' }}>
          Confirm {operation === 1 ? 'editing' : 'deleting'} this patient
          <div className='parent d-flex justify-content-end'>
            <div className='child'>
              <Button variant='secondary mx-2' size='sm' onClick={sahayakModalReturnsFalse} style={{ backgroundColor: 'white', color: 'black', border: '1px solid white' }}>No</Button>
            </div>
            <div className='child'>
              <Button variant='primary' size='sm' onClick={sahayakModalReturnsTrue} style={{ backgroundColor: 'white', color: 'black', border: '1px solid white' }}>Yes</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalShow} onHide={onModalHide} backdrop='static' keyboard={false} centered style={{filter: `contrast(${sahayakModal ? 0.5 : 1})`}}>
        <Modal.Header closeButton>
          <div>
            <div><Modal.Title>{modalPatient.name.length <= 15 ? modalPatient.name : modalPatient.name.slice(0, 15) + '....'}&nbsp;</Modal.Title></div>
            <div style={{ color: '#696969', fontSize: 'small' }}>Registered on:&nbsp;{registrationDate}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
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
                <Form.Control type='text' name='name' value={modalPatient.name} disabled={!editAccess} onInput={setInput} />
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
                {!editAccess ? <Form.Control type='text' name='sex' value={getSexLabel(modalPatient.sex)} disabled /> : <Select options={sexOptions} name='sex' defaultValue={{ value: modalPatient.sex, label: getSexLabel(modalPatient.sex) }} onChange={setSex} />}
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
                <Form.Control type='number' name='age' value={modalPatient.age} disabled={!editAccess} onChange={setInput} />
              </Form.Group>
              <Form.Group className='mb-3 col-lg-6'>
                <Form.Label>Mobile</Form.Label>
                <InputGroup>
                  <InputGroup.Text>+91</InputGroup.Text>
                  <Form.Control type='tel' name='mobile' value={modalPatient.mobile} disabled={!editAccess} onChange={setInput} minLength={10} maxLength={10} />
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
                <Form.Control type='text' name='address' value={modalPatient.address} disabled={!editAccess} onChange={setInput} />
              </Form.Group>
              <Form.Group className='mb-3 col-lg-6'>
                <Form.Label>Past medical history (PMH)</Form.Label>
                <Form.Control type='text' name='pmh' value={modalPatient.pmh} disabled={!editAccess} onChange={setInput} />
              </Form.Group>
              <Form.Group className='mb-3 col-lg-6'>
                <Form.Label>Work done</Form.Label>
                <Form.Control type='text' name='workDone' value={modalPatient.workDone} disabled={!editAccess} onChange={setInput} />
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
                <Form.Control type='number' name='payment' value={modalPatient.payment} disabled={!editAccess} onChange={setInput} />
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
                <Form.Control type='number' name='balance' value={modalPatient.balance} disabled={!editAccess} onChange={setInput} />
              </Form.Group>
              <Form.Group className='mb-3 col-lg-6'>
                <Form.Label>Next appointment</Form.Label>
                {!editAccess ? <Form.Control type='text' name='nextAppointment' value={modalPatient.nextAppointment} disabled /> : <Form.Control type='datetime-local' name='nextAppointment' value={modalPatient.nextAppointment} onChange={setInput} />}
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!editAccess ? <>
            <Button variant='primary' onClick={handleEditClick}>Edit</Button>
            <Button variant='danger' onClick={handleDeleteClick}>Delete</Button></> : <Button variant='primary' onClick={handleSaveClick} disabled={!modalPatient.name.toString().length || !modalPatient.sex.toString().length || !modalPatient.age.toString().length || !modalPatient.address.toString().length || !modalPatient.payment.toString().length || !modalPatient.balance.toString().length}>Save</Button>}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Rmodal
