import { useState } from 'react'

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
          return <p key={p.name}>{p.name} {p.number}</p>
        }
      })
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231244'
    },
    {
      name: 'Sanna',
      number: '040'
    },
    {
      name: 'Joku',
      number: '1231244'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = () => {
    event.preventDefault()
    const pObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(p => p.name)
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(pObject))
      setNewName('')
      setNewNumber('')
    }
  }

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
      <Filter filter={filter} change={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App