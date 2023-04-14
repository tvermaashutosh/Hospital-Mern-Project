import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RNavbar = () => {
  const onClickDashboard = () => {
    if (localStorage.getItem('token')) navigate('/dashboard')
    else toast.info('Please log in or sign up to view your dashboard')
  }
  let navigate = useNavigate()
  const onClickLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light' style={{ boxShadow: '0 0.01rem 1rem rgba(0, 0, 0, 0.3)' }}>
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Smile&nbsp;Care&nbsp;Dental&nbsp;Clinic
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
            <Nav.Link onClick={onClickDashboard}>Dashboard</Nav.Link>
          </Nav>
          <Nav>
            {!localStorage.getItem('token') ? <>
              <Nav.Link><Button variant='primary' onClick={() => navigate('/login')}>Log&nbsp;in</Button></Nav.Link>
              <Nav.Link><Button variant='primary' onClick={() => navigate('/signup')}>Sign&nbsp;up</Button></Nav.Link></>
              : <Nav.Link><Button variant='primary' onClick={onClickLogOut}>Log&nbsp;out</Button></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default RNavbar
