const mongoose = require('mongoose')
const { Schema } = mongoose

const PatientSchema = new Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
  name: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: Number },
  address: { type: String, required: true },
  pmh: { type: String },
  workDone: { type: String },
  payment: { type: Number, required: true },
  balance: { type: Number, required: true },
  nextAppointment: { type: String },
  registrationDate: { type: String }
}, { versionKey: false })

const Patient = mongoose.model('Patient', PatientSchema)
module.exports = Patient
