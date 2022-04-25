import { useState, useEffect, useCallback } from "react";
import CityServer from "../../../server.js/CityServer";
import './weatherPage.scss'
import windSvg from '../../img/windy.png';
import humSvg from '../../img/hum.png';
import { useParams } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import { Link } from "react-router-dom";

const WeatherPage = () => {
    const {idCity} = useParams();

    const [city, setCity] = useState(idCity); 
    const [weather, setWeather] = useState();
    const [error, setError] = useState(false);
    const {oneCityServer, loading, weatherData, onErrorFalse} = CityServer();

    useEffect(() => {
        requestCity();
    }, [])

    const requestCity = useCallback(() => {
        onErrorFalse();
        if(city === undefined) {
            return;
        }else {
            oneCityServer(city)
                .then(data => gettingData(data.lat, data.lon))
                .catch(() => setError(true));
        }
    }, [city])

    const gettingData = useCallback((lat, lon) => {

        weatherData(lat, lon)
            .then(data => setWeather(data));
    
    }, [])

    const SpinnerWeather = loading ? <Spinner/> : null;
    const errorWeather = error ? <Error/> : null
    const content = !loading && !error && weather && city ? <Wiev weather={weather} city={city}/> : null;

    return(
       <>
        {SpinnerWeather}
        {errorWeather}
        {content}
       </>
    )
}

const Wiev = ({weather, city}) => {

    const {temp, description, wind, hum} = weather;

    return(
        <div className="weather_wrapper">
            <h1 className="weather_wrapper_city">{city}</h1>
            <h2 className="weather_wrapper_time"></h2>
            <span className="weather_wrapper_temperature">{temp}°</span>
            <span className="weather_wrapper_cloud">{description}</span>
            <div className="info">
                <img src={windSvg} alt="wind"/>
                <h2 className="info_text">Wind</h2>
                <h2 className="info_data">{wind} м/с</h2>
            </div>
            <div className="info">
                <img src={humSvg} alt="wind"/>
                <h2 className="info_text">Hum</h2>
                <h2 className="info_data">{hum} %</h2>
            </div>
            <Link to='/'>go Back</Link>
        </div>
    )
}

export default WeatherPage;