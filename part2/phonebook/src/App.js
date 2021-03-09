import React, { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
 const [persons, setPersons] = useState([
   { name: "Arto Hellas", number: "040-123456" },
   { name: "Ada Lovelace", number: "39-44-5323523" },
   { name: "Dan Abramov", number: "12-43-234345" },
   { name: "Mary Poppendieck", number: "39-23-6423122" },
 ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
 
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: number
      
    };

    for( const person of persons) {
     if(person.name === newName) {
       alert(`${newName} alredy exists in phonebook`);
       setPersons(persons);
       setNumber(number);
     } else if(person.number === number) {
       alert(`${number} already exists in phonebook`);
       setPersons(persons);
       setNumber(number);
     }
     else {
         setPersons(persons.concat(personObject));
         setNewName("");
         setNumber("");
         
     }
     
    }
  };

const filteredPerson = persons.filter((person) => {
  return person.name.toLowerCase().includes(searchValue.toLowerCase());
});

const personToShow = filteredPerson
  ? persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue)
    )
  : persons;

console.log(personToShow);

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} search={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm
      submit={addPerson}
      value={newName}
      nameChange={handleNewPerson}
      numChange={handleNewNum}
      name="name"
      label="name" />

      <Persons person={personToShow} />
    </div>
  );
};

export default App;
