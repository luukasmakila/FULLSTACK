const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log("Connecting to MongoDB")
mongoose.connect(url)
.then(result => {
    console.log("connected to MongoDB")
})
.catch((error) => {
    console.log("error connecting to MongoDB", error.message)
})

const personSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minlength: 3},
    number: {type: String, required: true, minlength: 8}
})
personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)