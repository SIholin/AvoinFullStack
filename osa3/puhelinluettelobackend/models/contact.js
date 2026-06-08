const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connection to', url)
mongoose.connect(url, { family: 4 })
    .then(r => {
        console.log('connected to MongoDB')
    })
    .catch((e) => {
        console.log('error connection to MongoDB:', e.message)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

contactSchema.set('toJSON', {
    transform: (document, ro) => {
        ro.id = ro._id.toString()
        delete ro._id
        delete ro.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)