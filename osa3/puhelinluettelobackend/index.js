const express = require('express')
const app = express()

app.use(express.json())

let numbers = [
    {
        id: "1",
        name: "ihqsanna",
        number: "123"
    },
    {
        id: "2",
        name: "ihqsanna2",
        number: "222"
    }
]

app.get('/api/persons', (req, resp) => {
    resp.json(numbers)
})

app.get('/info', (req, resp) => {
    const time = new Date()
    resp.send(`<p>Phonebook has info for ${numbers.length} people</p><p>${time}</p>`)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = req.params.id
    const number = numbers.find(n => n.id === id)
    if (number) {
        resp.json(number)
    } else {
        resp.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, resp) => {
    const id = req.params.id
    numbers = numbers.filter(n => n.id !== id)

    resp.status(204).end()
})

app.post('/api/persons', (req, resp) => {
    const id = String(Math.floor(Math.random() * 1000) +1)
    const body = req.body

    if (!body.number || !body.name) {
        return resp.status(400).json({
            error: 'content missing'
        })
    } if (numbers.find(n => n.name === body.name)) {
        return resp.status(400).json({
            error: 'name must be unique'
        })
    }

    const number = {
        name: body.name,
        number: body.number,
        id: id
    }
    numbers = numbers.concat(number)
    resp.json(number)
})

const PORT = 3001
app.listen(PORT)
console.log(`Running on port ${PORT}`)