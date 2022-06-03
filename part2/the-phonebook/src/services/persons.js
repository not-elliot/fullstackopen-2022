import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl).then(response => response.data);
};

const createPerson = (person) => {
    return axios.post(baseUrl, person).then(response => response.data);
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response.status;
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllPersons, createPerson, updatePerson, deletePerson };