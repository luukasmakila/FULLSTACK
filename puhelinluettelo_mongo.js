const mongoose = require("mongoose")

if (process.argv.length<3) process.exit(1)

const password = process.argv[2]
let name = ""
let number = 0

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ire7o.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: name,
    number: number
})

const Person = mongoose.model("Person", personSchema)

if (!process.argv[3]) {
    console.log("phonebook:")
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}

else if (process.argv[3]) {
    name = process.argv[3]
    number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(response => {
        console.log(`Added ${name} to the phonebook!`)
        mongoose.connection.close()
    })
}