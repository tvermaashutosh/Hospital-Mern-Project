import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ReactDOM } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import PatientContext from '../context/PatientContext'
import AddPatient from './AddPatient'
import Rdoctor from './Rdoctor'

const Rheader = () => {
  const context = useContext(PatientContext)
  const { searchPatients, setResData, resData } = context
  const [searchQuery, setSearchQuery] = useState('')
  let navigate = useNavigate()
  const handleAddPatientOnClick = () => {
    navigate('/addpatient')
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value.toLocaleLowerCase())
    if (e.target.value) searchPatients(e.target.value.toLocaleLowerCase())
    else setResData(false)
  }

  return (
    <>
      <div className='container-parent-1 d-flex justify-content-between'>
        <div className='container-child-1'>
          <div className='mb-2'><Rdoctor /></div>
          <Form className='d-flex'>
            <Form.Control type='search' value={searchQuery} placeholder='Search' className='me-2 dashboard-search-form' aria-label='Search' onChange={handleSearch} />
            <Button variant='success' onClick={handleSearch}>
              <div className='search-parent d-flex'>
                <div className='search-child'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className='search-child'>
                  &nbsp;Search
                </div>
              </div>
            </Button>
          </Form>
        </div>
        <div className='container-child-2'>
          <Button variant='primary' onClick={handleAddPatientOnClick}>
            <div className='add-patient-parent d-flex'>
              <div className='add-patient-child'>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className='add-patient-child'>
                &nbsp;Add&nbsp;patient
              </div>
            </div>
          </Button>
        </div>
      </div>
      <div className='container-parent-2 d-flex justify-content-end' style={{ marginTop: '15px' }}>
        <div className='container-child'>
          <Button variant='primary' onClick={() => {setResData(false); setSearchQuery('');}}>All&nbsp;patient&nbsp;records</Button>
        </div>
      </div>
    </>
  )
}

export default Rheader
