import React, { useContext, useState } from 'react'
import { Card } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Rmodal from './Rmodal'
import PatientsContext from '../context/PatientContext'

const Rtable = () => {
  const context = useContext(PatientsContext)
  const { patients, resData } = context
  const [selectedPatient, setSelectedPatient] = useState(null)
  const onNameClick = (patient) => {
    setSelectedPatient(patient)
  }
  const onModalHide = () => {
    setSelectedPatient(null)
  }
  return (
    <>
      <Card className='mt-5' style={{ overflow: 'hidden', boxShadow: '0 0.1rem 1.5rem rgba(0, 0, 0, 0.4)' }}>
        <Table responsive>
          <thead className='table-responsive-thead' style={{ userSelect: 'none' }}>
            <tr>
              <th>Patient&nbsp;name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Mobile</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {resData ?
              resData.map((patient) => {
                return (
                  <tr onClick={() => onNameClick(patient)} key={patient._id}>
                    <td style={{ cursor: 'pointer' }}>{patient.name.length <= 15 ? patient.name : patient.name.slice(0, 15) + '....'}</td>
                    <td>{patient.sex}</td>
                    <td>{patient.age}</td>
                    <td>{patient.mobile}</td>
                    <td>{patient.address.length <= 15 ? patient.address : patient.address.slice(0, 15) + '....'}</td>
                  </tr>
                )
              })
              : patients.map((patient) => {
                return (
                  <tr onClick={() => onNameClick(patient)} key={patient._id}>
                    <td style={{ cursor: 'pointer' }}>{patient.name.length <= 15 ? patient.name : patient.name.slice(0, 15) + '....'}</td>
                    <td>{patient.sex}</td>
                    <td>{patient.age}</td>
                    <td>{patient.mobile}</td>
                    <td>{patient.address.length <= 15 ? patient.address : patient.address.slice(0, 15) + '....'}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </Card>
      {selectedPatient && (<Rmodal id={selectedPatient._id} name={selectedPatient.name} sex={selectedPatient.sex} age={selectedPatient.age} mobile={selectedPatient.mobile} address={selectedPatient.address} pmh={selectedPatient.pmh} workDone={selectedPatient.workDone} payment={selectedPatient.payment} balance={selectedPatient.balance} nextAppointment={selectedPatient.nextAppointment} registrationDate={selectedPatient.registrationDate} onHide={onModalHide} />)}
    </>
  )
}

export default Rtable
