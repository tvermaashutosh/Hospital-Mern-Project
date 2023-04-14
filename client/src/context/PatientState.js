import { useContext, useState } from 'react'
import PatientContext from './PatientContext'

const PatientState = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL
  const [patients, setPatients] = useState([])
  const [resData, setResData] = useState(false) // for Search bar
  const [yesShowSpinRequired, setYesShowSpinRequired] = useState(false)

  // 1. Get all patients
  const getPatients = async () => {
    const response = await fetch(`${host}/api/patients/fetchallpatients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify()
    })
    const json = await response.json()
    // console.log(json)
    setPatients(json)
  }
  // 2. Add a patient
  const addPatient = async (name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment, registrationDate) => {
    const response = await fetch(`${host}/api/patients/addpatient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment, registrationDate })
    })
    const json = await response.json()
    // console.log(json)
    const patient = json
    setPatients(patients.concat(patient))
  }
  // 3. Delete a patient
  const deletePatient = async (id) => {
    const response = await fetch(`${host}/api/patients/deletepatient/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify()
    })
    // const json = await response.json()
    // console.log(json)
    const newPatients = patients.filter((patient) => {
      return patient._id !== id
    })
    setPatients(newPatients)
  }
  // 4. Edit a patient
  const editPatient = async (id, name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment) => {
    const response = await fetch(`${host}/api/patients/updatepatient/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment })
    })
    // const json = await response.json()
    // console.log(json)
    let newPatients = JSON.parse(JSON.stringify(patients))
    for (let i = 0; i < patients.length; i++) {
      const element = newPatients[i];
      if (element._id === id) {
        newPatients[i].name = name
        newPatients[i].sex = sex
        newPatients[i].age = age
        newPatients[i].mobile = mobile
        newPatients[i].address = address
        newPatients[i].payment = payment
        newPatients[i].balance = balance
        newPatients[i].workDone = workDone
        newPatients[i].nextAppointment = nextAppointment
        newPatients[i].pmh = pmh
        break
      }
    }
    setPatients(newPatients)
  }
  // 5. Search Patients
  const searchPatients = async (name) => {
    const response = await fetch(`${host}/api/patients/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ name })
    })
    // console.log(typeof name)
    // console.log(JSON.stringify(name))
    const json = await response.json()
    // console.log(json)
    setResData(json)
  }

  return (
    <PatientContext.Provider value={{ patients, getPatients, addPatient, deletePatient, editPatient, searchPatients, resData, setResData, yesShowSpinRequired, setYesShowSpinRequired }}>
      {props.children}
    </PatientContext.Provider>
  )
}

export default PatientState
