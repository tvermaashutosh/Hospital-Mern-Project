import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import Rnavbar from './components/Rnavbar'
import Rfooter from './components/Rfooter'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import AddPatient from './components/AddPatient'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PatientState from './context/PatientState'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <PatientState>
        <ToastContainer position="top-right" autoClose={1500} />
        <div style={{ minHeight: '100vh' }}>
          <Rnavbar />
          <div className='container mt-5'>
            <Routes>
              <Route>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/addpatient' element={<AddPatient />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<SignUp />} />
              </Route>
            </Routes>
            <div style={{ height: '50px' }}></div>
          </div>
        </div>
        <Rfooter />
      </PatientState>
    </>
  )
}

export default App
