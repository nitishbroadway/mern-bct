const express = require('express')
const router = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

const mongoUrl = "mongodb://localhost:27017/mern-bct"

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use(router)

app.use((error, req, res, next) => {
    res.status(error.status || 400).send({
        message: error.message || 'Problem while processing request!',
        validation: error.validation,
    })
})

app.listen(5000, async () => {
    console.log('Server started at http://localhost:5000')
    console.log('Press Ctrl+C to stop...')

    await mongoose.connect(mongoUrl)
    console.log('MongoDB connected..')
})