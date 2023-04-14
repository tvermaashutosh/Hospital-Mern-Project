const mongoose = require('mongoose')
const { Schema } = mongoose

const DoctorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { versionKey: false })

const Doctor = mongoose.model('Doctor', DoctorSchema)
module.exports = Doctor
