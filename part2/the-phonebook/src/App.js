import { useState } from 'react';
import { useEffect } from 'react';

import personsService from './services/persons';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {

  // state
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [message, setMessage] = useState(null);

  // effects
  const fetchPersonsHook = () => {
    const fakePerson = {
        name: "Mr Fake Ficker", 
        number: "040-1312322456",
        id: 666
    };
    personsService
      .getAllPersons()
      .then(initialPersons => setPersons(initialPersons.concat(fakePerson)));
  };
  useEffect(fetchPersonsHook, []);

  // event handler
  const addPerson = (event) => {
    console.log(event);
    event.preventDefault();

    const isExistingPerson = persons.find(person => person.name === newName);
    if(isExistingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...isExistingPerson, number: newNumber};
        updatePerson(updatedPerson);
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    personsService
      .createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage({
          msg: `Added ${returnedPerson.name}`,
          type: 'success'
        });
        setTimeout(() => {
          setMessage(null);
        },3000);
      });
  }

  const updatePerson = (updatedPerson) => {
    const personToUpdate = persons.find(person => person.id === updatedPerson.id);
    console.log("personToUpdate", personToUpdate);
    console.log("updatedPerson", updatedPerson);

    personsService
      .updatePerson(updatedPerson.id, updatedPerson)
      .then(returnedPerson => {
        const newPersons = persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson);
        setPersons(newPersons);
        setMessage({
          msg: `Updated ${returnedPerson.name}`,
          type: 'success'
        });
        setTimeout(() => {
          setMessage(null);
        },3000);
      })
      .catch(error => {
        console.log("error", error);
        setMessage({
          msg: `${personToUpdate.name} was not found on server`,
          type: 'error'
        });
        setTimeout(() => {
          setMessage(null);
        },3000);
        setPersons(persons.filter(person => person.id !== personToUpdate.id));
      });
  }

  const deletePerson = (id) => {
    const personToBeDeleted = persons.find(person => person.id === id);
    console.log("personToBeDeleted", personToBeDeleted);
    if(window.confirm(`Do you really want to delete the entry for ${personToBeDeleted.name.toUpperCase()}?`)) {
      
      personsService
      .deletePerson(id)
      .then(responseStatus => {
        if(responseStatus === 200) {
          setPersons(persons.filter(person => person.id !== personToBeDeleted.id));
          setMessage({
            msg: `Deleted ${personToBeDeleted.name}`,
            type: 'success'
          });
          setTimeout(() => {
            setMessage(null);
          },3000);
        }
      })
      .catch(error => {
        console.log(error);
        if(error.response.status === 404) {
          setMessage({
            msg: `the person ${personToBeDeleted.name} was already deleted from server`,
            type: 'error'
          });
          setTimeout(() => {
            setMessage(null);
          },3000);
          setPersons(persons.filter(person => person.id !== personToBeDeleted.id));
        }
      });
      
    }
  }

  // additonal logic
  const personsToShow = persons
    .filter(person => {
      if(person.name) {
        return person.name.toLowerCase().includes(filterValue.toLowerCase());
      }
      return false;
    });

    return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setter={setFilterValue} value={filterValue} />

      <h3>Add a new</h3>
      <PersonForm
        submitHandler={addPerson}
        nameSetter={setNewName}
        numberSetter={setNewNumber}
        nameValue={newName}
        numberValue={newNumber}  
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteHandler={deletePerson} /*updateHandler={}*/ />

    </div>
    
  );
  }

export default App;
