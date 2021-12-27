import axios from "axios"
const url = "http://localhost:3001/persons/"

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addNew = (nameobject) => {
    const request = axios.post(url, nameobject)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(url+id)
    return request.then(response => response.data)
}

const changeNumber = (id, data) => {
    const request = axios.put(url+id, data)
    return request.then(response => response.data)
}

const numberService = {
    getAll: getAll,
    addNew: addNew,
    deleteNumber: deleteNumber,
    changeNumber:changeNumber
}
export default numberService