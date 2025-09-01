import { useState } from 'react'
import './App.css'
import axios from 'axios'

const Countries = (props) => {
  const allFiltered = props.countries.filter(c => c.name.common.toLowerCase().includes(props.filter.toLowerCase()))
  if (allFiltered.length === 1) {
    const c = allFiltered[0]
    const languages = Object.values(c.languages)
    return (
       <div>
        <h1>{c.name.common}</h1>
        <p>Capital {c.capital}</p>
        <p>Area {c.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map((l) => {
            return (
              <li key={l}>{l}</li>
            )
          })}
        </ul>
        <img src={c.flags.svg}></img>
      </div>
    )
  }
  console.log(allFiltered.length)
  if (allFiltered.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  return (
    <div>
      {allFiltered.map((c) => {
        return (
          <p key={c.name.common}>{c.name.common} <button onClick={() => props.handleButton(c.name.common)}>show</button> </p> 
        )
      })}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.filter} onChange={props.change} />
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(r => {
        const all = r.data
        setCountries(all)
      })
  }

  const handleButton = (props) => {
    event.preventDefault()
    setFilter(props)
  }

  return (
    <>
      <div>
        <Filter change={handleFilter} filter={filter}/>
        <Countries handleButton={handleButton} countries={countries} filter={filter} />
      </div>
    </>
  )
}

export default App
