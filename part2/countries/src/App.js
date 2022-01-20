import React, {useState, useEffect} from 'react';
import axios from "axios";
import Filter from "./Filter";
import Countries from "./Countries";
import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;
  const url = "http://openweathermap.org/data/2.5/weather";
  const city = countries.capital;
  const unit = "farenheit";

/* for (const [key, value] of Object.entries(countries)) {
  console.log(`${key} ${value}`);
}
 */

const capital = countries.filter((country) => country.languages.length > 1);
console.log(capital);

  

  useEffect(() => {
    getCountries();
    getWeather();
  },[]);

  const getCountries = () => {
    console.log("effect");
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        console.log("promise fulfilled");
        setCountries(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getWeather = () => {
    console.log('effect2');
    axios
      .get(`${url}q=kingston&appid=${api_key}`)
      .then((res) => {
        console.log("promise fulfilled2");
        setWeather(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  console.log("render", countries.length, "countries");
  console.log("weather for ", weather, "capital");

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(search.toLowerCase());
  });

  const countriesToShow = filteredCountries ?
  countries.filter((country) => 
  country.name.toLowerCase().includes(search)) :
  countries;
 console.log(filteredCountries.name);
 console.log(filteredCountries);

  const handleShow = () => {
    setShow(currentShow => !currentShow);
  };
 const showView = show ? (
   <div>
     {countriesToShow.map((el, i) => {
       return (
         <>
           <h1 key={i}>{el.name}</h1>
           <p>capital: {el.capital}</p>
           <p>population: {el.population}</p>
           <h3>Languages</h3>
           <ul>
             {el.languages.map((lang, i) => {
               return <li key={i}>{lang.name}</li>;
             })}
           </ul>
           <img src={el.flag} alt="flag" />
           
         </>
       );
     })}
   </div>
 ) : (
   <ul>
     {countriesToShow.map((country, i) => (
       <>
         <Country key={i} name={country.name} />
         <button onClick={() => setShow(!show)}>show</button>
       </>
     ))}
   </ul>
 );

  const renderedCountries =
    countriesToShow.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : countriesToShow.length === 1 ? (
      <div>
        {countriesToShow.map((el, i) => {
          return (
            <>
              <h1 key={i}>{el.name}</h1>
              <p>capital: {el.capital}</p>
              <p>population: {el.population}</p>
              <h3>Languages</h3>
              <ul>
                {el.languages.map((lang, i) => {
                  return <li key={i}>{lang.name}</li>;
                })}
              </ul>
              <img src={el.flag} alt="flag" />
             <h3>Weather in {el.capital}</h3>
             {weather}
            </>
          );
        })}
      </div>
    ) : 
      <ul>
        {showView}
        </ul>
 

 

  const handleFilter = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };


  console.log(countries);
  return (
    <>
    <Filter value={search} search={handleFilter} />
    {/* <ul>
      {countriesToShow.map((country, i) => (
        <Country key={i} name={country.name} />
      ))}
    </ul> */}
    
    {renderedCountries}
    
    </>
  )
}

export default App;
