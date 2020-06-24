import React, { useState } from 'react';
import Form from './components/Form'
import CurrentWeather from './components/CurrentWeather'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components'
import './App.css';

function App() {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isSearched, setIsSearched] = useState(false)
  const [weatherForecast, setWeatherForecast] = useState([])
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  const handleCity = (e) => {
    setCity(e.target.value)
  }

  const handleState = (e) => {
    setState(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault();
    setIsSearched(false)
    setIsLoading(true);
    console.log(city, state)
    getCurrentWeather();
  }

  const getCurrentWeather = () => {
    setIsLoading(true);
    const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city},${state},usa&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    console.log(url)
    fetch(url,
      {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCurrentWeatherData(data)
      setIsLoading(false)
      setIsSearched(true)
    })
    .catch(err => console.log(err))
  }

  const getForecast = () => {
    setIsLoading(true);
    const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},usa&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    console.log(url)
    fetch(url,
      {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setWeatherForecast(data.list)
      setIsLoading(false)
      setIsSearched(true)
    })
    .catch(err => console.log(err))
  }

  return (
    <MainContainer>
      <h1>Check the Weather Near You</h1>
      <WeatherContainer>
        <Form
          city={city}
          state={state}
          submitForm={submitForm}
          handleState={handleState}
          handleCity={handleCity} />
        <hr/>
        {isLoading ? <Loader><CircularProgress/></Loader> : null}
        { isSearched ? 
        <CurrentWeather 
          city={city}
          state={state}
          isLoading={isLoading}
          data={currentWeatherData}
          getForecast={getForecast}
          weatherForecast={weatherForecast}
        />
        : null
        }
      </WeatherContainer>
    </MainContainer>
  );
}

export default App;

const WeatherContainer = styled.div`
  width: 90%;
  max-width: 800px;
  border: solid 1px black;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #f4f3ee;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.3);

`;

const MainContainer = styled.div`
  text-align: center;
  background-color: #ffffff;
  margin: 0;
  padding: 2rem;
  min-height: 100vh;
  background-color: #00a8e8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%2300a0db' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%230097ce' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23008fc1' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%230086b4' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23007ea7' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  color: #f4f3ee;
  h1 {
    font-size: 2.5rem;
    font-weight: 300;
  }
`;

const Loader = styled.div`
  width: 100%;
  text-align: center;
  margin: 2rem;
`;
