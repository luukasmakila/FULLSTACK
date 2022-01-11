const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
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

app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

module.exports = app