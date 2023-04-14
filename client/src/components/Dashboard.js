import React, { useContext, useEffect, useState } from 'react'
import PatientContext from '../context/PatientContext'
import Rspinner from './Rspinner'
import Rheader from './Rheader'
import Rtable from './Rtable'
import AddPatient from './AddPatient'
import { ToastContainer, toast } from 'react-toastify'
import Rmodal from './Rmodal'
import { useNavigate } from 'react-router-dom'
import Tmp2 from './Tmp2'

const Dashboard = () => {
  const context = useContext(PatientContext)
  const { getPatients, yesShowSpinRequired, setYesShowSpinRequired } = context
  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getPatients()
    } else {
      navigate('/login')
    }
  }, [])
  setTimeout(() => {
    setYesShowSpinRequired(false)
  }, 500)

  return (
    <>
      {yesShowSpinRequired ? <Rspinner /> : <>
        <Rheader />
        <Rtable /></>}
      {/* <Tmp2 /> */}
    </>
  )
}

export default Dashboard
