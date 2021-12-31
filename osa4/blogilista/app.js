const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to mongodb')
mongoose.connect(config.MONGO_URL)
    .then(result => {
        logger.info('connected to the database')
    })
    .catch(error => {
        logger.error('error connecting to the database', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app