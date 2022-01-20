import React, { useState, useEffect } from "react";
import axios from 'axios';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Person from "./components/Person";
import Notification from "./components/Notification";
import "./index.css";


const App = () => {
 const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('effect: persons loaded from DB');
    personService
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons);
    });
  },[]);

  console.log('render', persons.length, 'persons');
 
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: number,
    };

    const people = persons.map(p => p.name);
    const current = persons.find(p => p.name === newName);
    const updatedContact = {...personObject, number:number};
    console.log(current);
    if (people.includes(newName) && number) {
      window.confirm(
        "This number already exists in the phonebook, do you want to update it?"
      )
        ? personService.update(current.id, updatedContact).then((updatedPerson) => {
            setPersons(persons.map((p) => (p.id !== current.id ? p : updatedPerson)));
            setPersons("");
          })
        : alert("name not added");
    } else if (people.includes(newName)) {
      alert("This person is already in the phonebook");
    } else {
      personService.create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    /* for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} alredy exists in phonebook`);
        setPersons(persons);
        setNumber(number);
      } else if (person.number === number) {
        alert(`${number} already exists in phonebook`);
        setPersons("");
        setNumber("");
      } else if (person.name === newName && person.number !== number) {
          window.confirm(`${newName} is already added to phonebook,
          replace the old number with a new one?`) ? personService.update(personObject)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setPersons("");
          }) : setNumber("");
      }
       else {
        setPersons(persons.concat(person));
        setPersons("");
      }
    } */
  };

  const handleNewPerson = (event) => {
    console.log(event.target.value);
  
      setNewName(event.target.value);
      
  };

  const handleNewNum = (event) => {
    console.log(event.target.value);
    setNumber(event.target.value);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
    
  };

  const handleDeleteOf = (id) => {
    const user = persons.find(p => p.id === id);
    window.confirm(`Delete? ${user.name}`)
      ? personService
          .remove(id)
          .then((id) => alert(`${user.name} deleted`))
      : alert(`operation cancelled ${id} not deleted`);
  };
  
  const filteredPerson = persons.filter((person) => {
    return person.name.includes(searchValue.toLowerCase());
  });

  const personToShow = filteredPerson
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchValue)
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={searchValue} search={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        submit={addPerson}
        value={newName}
        nameChange={handleNewPerson}
        numChange={handleNewNum}
        name="name"
        label="name"
      />

   {/*    <Persons
        person={personToShow}
        handleDelete={() => handleDeleteOf()}
      /> */}
      <ul>{
        personToShow.map((p) => (
          <Person
          person={p.name}
          number={p.number}
          key={p.id}
          handleDelete={() => handleDeleteOf(p.id)}
       /> ))
      }</ul>
    </div>
  );
};

export default App;
