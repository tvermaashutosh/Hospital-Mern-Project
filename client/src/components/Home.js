import React from 'react'
import smileCareDentalClinicLogo from './smileCareDentalClinicLogo.png'

const Home = () => {
  return (
    <>
      <div className='home-container-parent d-flex justify-content-center align-items-center'>
        <div className='home-container-child-1 d-flex justify-content-center align-items-center'>
          <img src={smileCareDentalClinicLogo} alt='smile care dental clinic logo' style={{ maxWidth: '100%', maxHeight: '100%', userSelect: 'none' }} />
        </div>
        <div className='home-container-child-2'>
          <div className='d-flex flex-column justify-content-center align-items-center p-5 pt-3 pb-4'>
            <div className='d-flex justify-content-center align-items-center text-center'>
              <h1 style={{ fontWeight: '500', fontSize: '50px', color: '#696969', textShadow: '4px 4px 4px rgba(0, 0, 0, 0.4)', fontFamily: "'Poppins', sans-serif", marginBottom: '20px' }}>
                Smile Care Dental Clinic
              </h1>
            </div>
            <div className='d-flex justify-content-center align-items-center text-center'>
              <h1 style={{ fontWeight: '500', fontSize: '30px', color: 'rgba(0, 0, 0, 0.6)', textShadow: '4px 4px 4px rgba(0, 0, 0, 0.3)', fontFamily: "'Quicksand', sans-serif" }}>
                Hospital Management Website
              </h1>
            </div>
            <div style={{ fontFamily: "'Comfortaa', cursive", padding: '15px', textAlign: 'justify' }}>
              The following website is developed by 5 sophomores of batch 2022-23 of the Indian Institute of Technology (BHU) Varanasi.<br />
              The website serves the doctor-patient data management of Smile Care Dental Clinic.<br />
              We wish healing and profound health to all patients who constitute the records of our website and that they may soon be out of our records.
            </div>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center' >
            <div className='d-flex justify-content-center align-items-center p-2 pb-3' style={{ width: '60%', fontFamily: "'Libre Baskerville', serif", textAlign: 'center', color: '#A9A9A9', fontSize: 'small' }}>
              “For I will restore health to you, and your wounds I will heal, says the LORD, neither herb nor polutice but my Word will cure you.”—(Holy Bible)
            </div>
            <div className='d-flex justify-content-center align-items-center p-2 pb-3' style={{ width: '60%', fontFamily: "'Baloo 2', cursive", textAlign: 'center', color: '#A9A9A9', fontWeight: '100' }}>
              “मैं तुम्हें स्वस्थ करुँगा और तुम्हारे घाव भर दूँगा, जड़ी-बूटियाँ या लेप नहीं अपितु मेरे शब्द तुम्हें स्वस्थ करेंगे–यह प्रभु की वाणी है।”—(पवित्र बाइबिल)
            </div>
          </div>
        </div>

      </div >
    </>
  )
}

export default Home
