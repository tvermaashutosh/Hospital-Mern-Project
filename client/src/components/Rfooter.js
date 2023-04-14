import React from 'react'

function Rfooter() {
  return (
    <>
      <div className='pt-3 pb-2' style={{ backgroundColor: '#808080', color: 'white', boxShadow: '0 -0.05rem 1rem rgba(0, 0, 0, 0.6)' }}>
        <div style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", marginTop: '15px' }}>
          <h4 style={{ fontWeight: '200', marginBottom: '5px' }}>Smile Care Dental Clinic</h4>
          <h6 style={{ fontWeight: '200' }}>Hospital Management Website</h6>
        </div>
        <div className='d-flex justify-content-center'>
          <div style={{ width: '40%', marginTop: '15px', marginBottom: '25px', textAlign: 'center' }}>
            <small style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Smile Care Dental Clinic, Kushiyara Civil Line Tiraha, Civil Line Road, Bhadohi, Varanasi, Uttar Pradesh
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rfooter
