const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('usage: node mongo.js password [name number]')
  process.exit(1)
}

const url = `mongodb+srv://hashleycuachin03_db_user:${password}@cluster0.cpzeokb.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
})

const Person = mongoose.model('Person', noteSchema)

async function main() {
  try {
    await mongoose.connect(url, { family: 4 })

    if (process.argv.length === 5) {
      const person = new Person({
        name: name,
        number: number,
        important: true,
      })

      await person.save()
      console.log(`added ${name} number ${number} to phonebook`)
    } else {
      const people = await Person.find({})
      console.log('phonebook:')
      people.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    }
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
  }
}

main()
