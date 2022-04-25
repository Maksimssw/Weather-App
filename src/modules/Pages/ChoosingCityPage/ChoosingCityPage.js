import './choosingCityPage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ChoosingCityPage = (props) => {

    const [city, setCity] = useState();
    const [textError, setTextError] = useState(false);

    const enteredCity = (e) => {
        const res = e.target.value;
        setCity(res);
        setTextError(false);
    }
    
    const preventDef = (e) => {
        e.preventDefault();
    }

    const switchingToForecast = () => {
        if(city === undefined || city === ''){
            setTextError(true)
        } 
    }

    return(
        <div className='wrapper'>
            <form action="#" onChange={preventDef}>
                <h1>Weather App</h1>
                <h2>Write the city</h2>
                <h3>{textError ? 'You havent written anything' : null}</h3>
                <input onChange={enteredCity} placeholder='City...' value={city}/>
                <button onClick={switchingToForecast}>
                    <Link to={city ? `/${city}` : '/'}>Search</Link>
                    <span>→</span>
                </button>
            </form>
        </div>
    )
}

export default ChoosingCityPage;