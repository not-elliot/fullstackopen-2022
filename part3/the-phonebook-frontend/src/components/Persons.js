/* eslint-disable react/prop-types */
import React from 'react';
import Person from './Person';

const Persons = ({ persons, deleteHandler }) => {
	return (
		<div>
			{persons.map(person =>
				<div key={person.id}>
					<button type='button' onClick={() => deleteHandler(person.id)}> X </button>
					<span> </span>
					<Person person={person} />
				</div>
			)}
		</div>
	);
};

export default Persons;