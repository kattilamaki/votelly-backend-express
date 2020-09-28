const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getPrograms = (request, response) => {
  pool.query('SELECT * FROM programs_program', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app
  .route('/programs')
  // GET endpoint
  .get(getPrograms)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})