const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.static('build'))

morgan.token("data", (req,res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
app.use(cors())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) res.json(person)
    else res.status(404).end()
})

app.get("/info", (req, res) => {
    const date = new Date()
    res.send(`<p>
        Phonebook has info for ${persons.length} people
        </p>
        <p>
        ${date}
        </p>`)
})

const generateId = () => {
    const maxId = Math.floor(Math.random() * (10000 - 1) + 1)
    console.log(maxId)
    return maxId
}

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name || !body.number) return res.status(400).json({error: "name or number missing"})

    else if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({error: "name is already in the phonebook"})
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)
    console.log("ok")

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})