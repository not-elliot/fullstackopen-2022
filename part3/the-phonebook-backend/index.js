// imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors  = require('cors');

const Person = require('./models/person');

//variables
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

// functions
const errorHandler = (error, req, res, next) => {
	console.log(error.message);
	if(error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	}
	if(error.name === 'NotFound') {
		return res.status(404).send({ error: 'resource not found' });
	}
	next(error);
};

// ---
morgan.token('http-body', (req) => JSON.stringify(req.body));

// middleware
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :http-body'));

// other routes
app.get('/info', (req, res, next) => {
	Person
		.find({})
		.then(persons => {
			res.send(
				`<p>Phonebook has info for ${persons.length} people</p>`
                +
                `${new Date()}`
			);
		})
		.catch(error => next(error));
});

// api routes
app.get('/api/persons', (req, res) => {
	Person.find({}).then(returnedPersons => {
		console.log('returnedPersons:', returnedPersons);

		if(returnedPersons.length > 0) return res.json(returnedPersons);
		res.status(404).json({ error: 'no person found' });
	});
});

app.get('/api/persons/:id', (req, res) => {
	Person.findById(req.params.id).then(person => {
		if(person) return res.json(person);
		res.status(404).json({ error: 'person not found' });
	});
});

app.post('/api/persons', (req, res, next) => {
	const { name, number } = req.body;

	console.log('name',name,'number', number);

	if(!(name && number)) {
		return res.status(400).json({ error: 'name or number attribute missing' });
	}

	Person.findOne({ name: name }).then(person => {
		console.log('person', person);
		if(person) {
			return res.status(400).json({ error: 'name must be unique' });
		} else {
			const newPerson = new Person({
				name,
				number,
			});

			newPerson
				.save()
				.then(returnedPerson => res.json(returnedPerson))
				.catch(error => next(error));
		}
	});
});

app.put('/api/persons/:id', (req, res, next) => {
	const { name, number } = req.body;

	const person = {
		name,
		number
	};

	Person
		.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
		.then(updatedPerson => res.json(updatedPerson))
		.catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person
		.findByIdAndDelete(req.params.id)
		.then(() => {
			console.log('person deleted');
			res.status(204).end();
		})
		.catch(error => next(error));
});

// middleware at the end
app.use(errorHandler);

// start server
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});