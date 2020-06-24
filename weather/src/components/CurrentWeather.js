import React, { useState } from 'react'
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import day from '../images/day.svg';
import cloudy from '../images/cloudy.svg';
import rainy6 from '../images/rainy-6.svg';
import rainy5 from '../images/rainy-5.svg';
import thunder from '../images/thunder.svg';
import snowy from '../images/snowy-6.svg';



const CurrentWeather = (props) => {
    const [tempType, setTempType] = useState('F')
    const [showForecast, setShowForecast] = useState(false)
    const { data, isLoading, city, state, getForecast, weatherForecast } = props;
    const { main, weather, name } = data;
    const { description, icon} = weather[0];
    const { temp, temp_max, temp_min} = main;
    
    const toggleTempType = () => {
        setTempType(prevState => (prevState === 'F' ? 'C' : 'F'))
    }

    const convertCelcius = (temp) => {
        return (temp - 273.15).toFixed(0);
    }

    const convertFahr = (temp) => {
        return (temp * (9/5) - 459.67).toFixed(0);
    }

    const getTheForecast = () => {
        if (showForecast) {
            setShowForecast(false)
        } else {
            getForecast();
            setShowForecast(true)

        }
        
    }

    const getWeatherIcon = (icon) => {
        switch(icon) {
            case "01d": 
            case "01n":
              return day
              break;
            case "02d":
            case "02n":
            case "03d":
            case "03n":
            case "04d":
            case "04n":
              return cloudy
              break;
            case "09d":
            case "09n":
              return rainy6
              break;
            case "10d":
            case "10n":
              return rainy5
              break;
            case "11d":
            case "11n":
              return thunder
              break;
            case "13d":
            case "13n":
              return snowy
              break;
            default:
                return cloudy
            }
    }

    return (
        <div>
            { showForecast ? 
            <MainContainer>
                <Toggle><p className={tempType === "C" ? "selected" : ""} onClick={toggleTempType}>C°</p><p>/</p><p className={tempType === "F" ? "selected" : ""} onClick={toggleTempType}>F°</p></Toggle>
                <h2>Weather Forecast for {name}</h2>
                <ForecastContainer>
                    {weatherForecast.filter(day => day.dt_txt.includes("12:00:00")).map(item => {
                        const { main, weather } = item;
                        const { description, icon } = weather[0];
                        const { temp, temp_max, temp_min } = main;
                        return (
                            <div className="item">
                                <img src={getWeatherIcon(icon)} alt={description}/>
                                <p className="description">{description}</p>
                                <p>Temp: {tempType === "F" ? convertFahr(temp) : convertCelcius(temp)}°{tempType}</p>
                            </div>
                        )
                    })}
                </ForecastContainer>
                <p className="small">View Current Weather Conditions</p>
                <KeyboardArrowDownIcon style={{marginBottom: "0.5rem", cursor: "pointer"}} onClick={getTheForecast}/>
            </MainContainer>
            :
            <CurrentWeatherContainer>
                <Toggle><p className={tempType === "C" ? "selected" : ""} onClick={toggleTempType}>C°</p><p>/</p><p className={tempType === "F" ? "selected" : ""} onClick={toggleTempType}>F°</p></Toggle>
                <h2>Current Weather in {name}</h2>
                <Grid>
                    <img src={getWeatherIcon(icon)} alt={description}/>
                    <div className="details">
                        <p className="description">{description}</p>
                        <p>Current Temp: {tempType === "F" ? convertFahr(temp) : convertCelcius(temp)}°{tempType}</p>
                        <p>Max: {tempType === "F" ? convertFahr(temp_max) : convertCelcius(temp_max)}°{tempType}</p>
                        <p>Min: {tempType === "F" ? convertFahr(temp_min) : convertCelcius(temp_min)}°{tempType}</p>
                    </div>
                </Grid>
                <p className="small">View Five Day Forecast</p>
                <KeyboardArrowDownIcon style={{marginBottom: "0.5rem", cursor: "pointer"}} onClick={getTheForecast}/>
            </CurrentWeatherContainer>
            }
        </div>
    )
}

export default CurrentWeather

const CurrentWeatherContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    color: #444;
    img {
        margin: 0 auto;
        height: 250px;
        padding: 0;
    }
    h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 300;
    }
    .small {
        font-size: 0.8rem;
        color: lightgray;
        margin: 0;
        padding:0;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.25rem;
    justify-content: center;
    align-items: center;
    max-height: 200px;
    .details {
        align-self: flex-start;
        margin: 2rem 0rem;
    }
    p {
        text-align: left;
        margin: 0.5rem 1rem;
    }
    .description {
        text-transform: uppercase;
        font-size: 1.1rem;
        font-weight: 300;
    }
    .small {
        font-size: 0.8rem;
        color: lightgray;
        margin: 0;
        padding:0;
    }
`;

const Toggle = styled.div`
    position: absolute;
    top: 0;
    right: 1rem;
    display: flex;
    cursor: pointer;
    p {
        color: lightgray;
        font-size: 1.1rem;
        padding: 0rem 0.25rem;
        margin: 0;
    }
    .selected {
        color: black;
    }
`;

const ForecastContainer = styled.div`
    width: 100%;
    
    height: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    color: #444;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.25rem;
    padding: 1rem;
    max-width: 750px;
    margin: 0 auto;
    img {
        height: 100px;
    }
    .item {
        border: solid 1px black;
        border-radius: 10px;
    }
`;

const MainContainer = styled.div`
    text-align: center;
    color: #444;

    h2 {
        color: #444;
        margin: 0;
        font-size: 1.5rem;
        font-weight: 300;
    }
    .description {
        text-transform: uppercase;
        font-size: 1.1rem;
        font-weight: 300;
    }
    .small {
        font-size: 0.8rem;
        color: lightgray;
        margin: 0;
        padding:0;
    }
`;