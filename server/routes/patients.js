const express = require('express')
const router = express.Router()
const fetchDoctor = require('../middleware/fetchDoctor')
const Patient = require('../models/Patient')
const { body, validationResult } = require('express-validator')

// 1. Get all patients, 'GET' 'api/patients/fetchallpatients'
// Login required
router.get('/fetchallpatients', fetchDoctor, async (req, res) => {
  try {
    const patients = await Patient.find({ doctor: req.doctor.id })
    res.json(patients)
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

// 2. Add a new patient, 'POST' 'api/patients/addpatient'
// Login required
router.post('/addpatient', fetchDoctor, [
  body('name', 'Enter a valid name').exists(),
  body('sex', 'Enter a valid sex').exists(),
  body('age', 'Enter a valid title').isNumeric(),
  body('address', 'Enter a valid address').exists(),
  body('payment', 'Enter a valid payment').isNumeric(),
  body('balance', 'Enter a valid balance').isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment, registrationDate } = req.body
    const patient = new Patient({
      name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment, registrationDate, doctor: req.doctor.id
    })
    const savedPatient = await patient.save()
    res.json(savedPatient)
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

// 3. Update an existing patient, 'PUT' 'api/patients/updatepatient'
// Login required
router.put('/updatepatient/:id', fetchDoctor, [
  body('name', 'Enter a valid name').exists(),
  body('sex', 'Enter a valid sex').exists(),
  body('age', 'Enter a valid title').isNumeric(),
  body('address', 'Enter a valid address').exists(),
  body('payment', 'Enter a valid payment').isNumeric(),
  body('balance', 'Enter a valid balance').isNumeric(),
], async (req, res) => {
  try {
    const { name, sex, age, mobile, address, pmh, workDone, payment, balance, nextAppointment } = req.body
    const newPatient = {
      name: name, sex: sex, age: age, mobile: mobile, address: address, pmh: pmh, workDone: workDone, payment: payment, balance: balance, nextAppointment: nextAppointment
    }
    let patient = await Patient.findById(req.params.id)
    if (!patient) {
      return res.status(404).send('Patient not found')
    }
    if (patient.doctor.toString() !== req.doctor.id) {
      return res.status(401).send('Update not allowed')
    }
    patient = await Patient.findByIdAndUpdate(req.params.id, { $set: newPatient }, { new: true })
    res.json({ patient })
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

// 4. Delete an existing patient, 'DELETE' '/api/patients/deletepatient'
// Login required
router.delete('/deletepatient/:id', fetchDoctor, async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id)
    if (!patient) {
      return res.status(404).send('Patient not found')
    }
    if (patient.doctor.toString() !== req.doctor.id) {
      return res.status(401).send('Delete not allowed')
    }
    patient = await Patient.findByIdAndDelete(req.params.id)
    res.json({ 'success': 'Patient successfully deleted', patient: patient })
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

// 5. Search patients, 'GET' '/api/patients/search'
// Login required
router.post('/search', fetchDoctor, async (req, res) => {
  try {
    const { name } = req.body
    const queryName = name
    if (!queryName) {
      res.status(400).send('Search query required')
    }
    const patients = await Patient.find({ name: { $regex: new RegExp(queryName, 'i') }, doctor: req.doctor.id })
    // console.log(patients)
    res.json(patients)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

// 6. Fetch an existing patient by id
// Login required
// router.put('/fetchpatient/:id', fetchDoctor, async (req, res) => {
//   try {
//     let patient = await Patient.findById(req.params.id)
//     if (!patient) {
//       return res.status(404).send('Patient not found')
//     }
//     if (patient.doctor.toString() !== req.doctor.id) {
//       return res.status(401).send('Fetch not allowed')
//     }
//     res.json(patient)
//   }
//   catch (err) {
//     console.error(err.message)
//     res.status(500).send('Backend server error')
//   }
// })

module.exports = router
