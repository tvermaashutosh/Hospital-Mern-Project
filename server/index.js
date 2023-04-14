require('dotenv').config()
const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo()
const app = express()
const port = process.env.PORT || 6421

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/patients', require('./routes/patients'))

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})
