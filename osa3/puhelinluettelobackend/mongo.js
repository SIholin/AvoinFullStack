const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://sannaiholin_db_user:${password}@cluster0.kkwqwyy.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const contact = new Contact({
    name: name,
    number: number,
  })
  contact.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then(r => {
    console.log('Phonebook:')
    r.forEach(n => {
      console.log(`${n.name} ${n.number}`)
    })
    mongoose.connection.close()
  })
}
