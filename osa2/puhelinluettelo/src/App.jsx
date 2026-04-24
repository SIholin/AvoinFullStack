import { useState , useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.filter} onChange={props.change} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={() => props.addPerson()}>
        <div>
          name: <input value={props.name} onChange={props.nameChange} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
       {props.persons.map((p) => {
        if (p.name.toLowerCase().includes(props.filter.toLowerCase())) {
          return ( 
            <p key={p.id}>{p.name} {p.number} <button onClick={() => props.deletePerson(p.id)}>delete</button></p>
          )
          }
        }
      )}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('Already')) {
    return (
      <div className='fail'>
        {message}
      </div>
    )
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  const addPerson = () => {
    event.preventDefault()
    const pObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(p => p.name)
    if (names.includes(newName)) {
      const text = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(text)) {
        const id = persons.find((p) => p.name === newName).id
        personService.modify(id, pObject)
          .then(returnP => {
            setPersons(persons.map(p => p.id !== id ? p : returnP))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${newName}!`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }).catch(() => {
            setSuccessMessage(`Already deleted ${newName}!`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    } else {
        personService.create(pObject)
        .then(resp => {
          setPersons(persons.concat(resp.data))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${newName}!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    event.preventDefault()
    const name = persons.find((p) => p.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
        personService.deletePerson(id)
        setPersons(persons.filter(p => p.id !== id))
        setSuccessMessage(`Deleted ${name}!`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
    }
  }

  useEffect(() => {
    personService.getAll()
      .then(r => {
        setPersons(r.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message ={successMessage} />
      <Filter filter={filter} change={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )

}

export default App