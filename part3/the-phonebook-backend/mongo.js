/* eslint-disable no-undef */
const mongoose = require('mongoose');

if(process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstackopenuser:${password}@fullstackopen-cluster.ah27z.mongodb.net/the-phonebook-db-2022?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Person = mongoose.model('Person', personSchema);

mongoose
	.connect(url)
	.then(result => {
		console.log('connected to', result.connections[0].name);
	})
	.catch(error => console.log(error));

if(process.argv.length > 3) {
	const name = process.argv[3];
	const number = process.argv[4];

	const newPerson = new Person({
		name,
		number,
	});

	newPerson
		.save()
		.then(() => {
			console.log('Person saved to DB! Goodbye!');
			return mongoose.connection.close();
		})
		.catch(error => console.log(error));
} else {
	Person
		.find({})
		.then(persons => {
			console.log('phonebook:');
			persons.forEach(person => {
				console.log(person.name, person.number);
			});
		})
		.then(() => {
			console.log('Persons fetched! Goodbye!');
			return mongoose.connection.close();
		})
		.catch(error => console.log(error));
}