import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios
            .post(baseUrl, newObject)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const modify = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(resp => resp.data)
}

export default { getAll, create, deletePerson, modify }