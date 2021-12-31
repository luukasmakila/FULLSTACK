require('dotenv').config()

let PORT = process.env.PORT
let MONGO_URL = process.env.MONGO_URL

module.exports = {
    PORT, MONGO_URL
}