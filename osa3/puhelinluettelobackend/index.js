require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Contact = require('./models/contact')

morgan.token('content', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.static('dist'))

app.get('/api/persons', (req, resp) => {
    Contact.find({}).then(c => {
        resp.json(c)
    })
})

app.get('/info', (req, resp) => {
    const time = new Date()
    Contact.find({}).then(c => {
        resp.send(`<p>Phonebook has info for ${c.length} people</p><p>${time}</p>`)
    })
})

app.get('/api/persons/:id', (req, resp, next) => {
    Contact.findById(req.params.id)
        .then(c => {
            if (c) {
                resp.json(c)
            } else {
                resp.status(404).end()
            }
        })
        .catch(e => next(e))
})

app.delete('/api/persons/:id', (req, resp, next) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(c => {
            resp.status(204).end()
        })
        .catch(e => next(e))
})

app.put('/api/persons/:id', (req, resp, next) => {
    const { name, number } = req.body
    Contact.findById(req.params.id)
        .then(c => {
            if (!c) {
                return resp.status(404).end()
            }

            c.name = name
            c.number = number

            return c.save().then((newC) => {
                resp.json(c)
            })
        })
        .catch(e => next(e))
})

app.post('/api/persons', (req, resp, next) => {
    const body = req.body
    const contact = new Contact({
        name: body.name,
        number: body.number,
    })
    contact.save().then(savedC => {
        resp.json(savedC)
    }).catch(e => next(e))
})

const unknownEndoint = (req, resp) => {
    resp.status(404).send({ error: 'unkown endpoint' })
}

app.use(unknownEndoint)

const errorHandler = (error, req, resp, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return resp.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return resp.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Running on port ${PORT}`)