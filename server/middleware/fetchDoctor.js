const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const fetchDoctor = (req, res, next) => {
  try {
    const token = req.header('auth-token')
    if (!token) {
      res.status(401).send({ error: 'Please authenticate using a valid token' })
    }
    const data = jwt.verify(token, secret)
    req.doctor = data.doctor
    next()
  }
  catch (error) {
    res.status(401).send({ error: 'Please authenticate using a valid token' })
  }
}

module.exports = fetchDoctor
