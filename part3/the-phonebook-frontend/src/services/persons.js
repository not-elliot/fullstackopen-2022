import axios from 'axios';

const baseUrl = '/api/persons';

const getAllPersons = () => {
	return axios.get(baseUrl).then(response => response.data);
};

const createPerson = (person) => {
	return axios.post(baseUrl, person).then(response => response.data);
};

const updatePerson = (id, updatedPerson) => {
	return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
};

const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/${id}`).then(response => {
		console.log(response.data);
		console.log(response.status);
		console.log(response.statusText);
		console.log(response.headers);
		console.log(response.config);
		return response.status;
	});
};

export default { getAllPersons, createPerson, updatePerson, deletePerson };