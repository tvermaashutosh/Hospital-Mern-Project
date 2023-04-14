import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Rspinner = () => {
  return (
    <>
      <div className='rspinner-parent d-flex justify-content-center align-items-center'>
        <div className='rspinner-child'>
          <Spinner animation='grow' />
        </div>
        <div className='rspinner-child'>
          &nbsp;Loading....
        </div>
      </div>
    </>
  )
}

export default Rspinner
