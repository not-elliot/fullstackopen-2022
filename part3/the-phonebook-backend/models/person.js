const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const dbUrl = process.env.MONGODB_URI;

console.log('connecting to DB...');
mongoose.connect(dbUrl)
	.then(() => console.log('connected to MongoDB!'))
	.catch(error => console.log(error.message));



const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true
	},
	number: {
		type: String,
		minlength: 8,
		required: true,
		validate: {
			validator: (val) => {
				console.log('val:', val);
				console.log('RegEx Test:', /^[0-9]{2,3}-[0-9]{1,}$/.test(val));
				return /^[0-9]{2,3}-[0-9]{1,}$/.test(val);
			},
			message: 'Number doesnt match required format'
		}
	}
});


personSchema.set('toJSON', {
	transform: (document, returnedObject)  => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);