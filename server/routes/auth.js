const express = require('express')
const router = express.Router()
const fetchDoctor = require('../middleware/fetchDoctor')
const Doctor = require('../models/Doctor')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

// 1. Create a doctor using, 'POST' '/api/auth/createdoctor'
// No login required
router.post('/createdoctor', [
  body('name', 'Enter a valid name').exists(),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {
  try {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ success, errors: errors.array() })
    }
    let doctor = await Doctor.findOne({ email: req.body.email })
    if (doctor) {
      return res.status(400).json({ success, error: 'This doctor already exists' })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    doctor = await Doctor.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data = {
      doctor: {
        id: doctor.id
      }
    }
    const authToken = await jwt.sign(data, secret)
    success = true
    res.json({ success, authToken })
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

// 2. Authenticate a doctor using, 'POST' '/api/auth/login'
// No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 8 characters long').isLength({ min: 8 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    let doctor = await Doctor.findOne({ email })
    let success = false
    if (!doctor) {
      return res.status(400).json({ success, error: 'Invalid particulars' })
    }
    const passwordCompare = await bcrypt.compare(password, doctor.password)
    if (!passwordCompare) {
      return res.status(400).json({ success, error: 'Invalid particulars' })
    }
    const data = {
      doctor: {
        id: doctor.id
      }
    }
    const authToken = await jwt.sign(data, secret)
    success = true
    res.json({ success, authToken })
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

// 3. Get loggedin doctor details using, 'POST' '/api/auth/getdoctor'
// Login required
router.post('/getdoctor', fetchDoctor, async (req, res) => {
  try {
    const doctorID = req.doctor.id
    const doctor = await Doctor.findById(doctorID).select('-password')
    res.send(doctor)
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Backend server error')
  }
})

module.exports = router
