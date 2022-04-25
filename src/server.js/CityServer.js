import useHttp from "../hooks/http.hook";

const CityServer = () => {
    const {request, loading, error, onErrorFalse} = useHttp();

    const _geo = 'http://api.openweathermap.org/geo/1.0/direct?';
    const _openWeatherMap = 'https://api.openweathermap.org/data/2.5/weather?lat=';
    const _apiKey = 'f5380ebdec55111ab3633d9509a44d74';

    const oneCityServer =  async (city) => {
        const res = await request(`${_geo}q=${city}&limit=1&appid=${_apiKey}`);

        if(res.length === 0 ){
            return;
        }

        return _transform(res);
    }// Запрос на один город

    const _transform = (сoordinates) =>{
        return {
            lat: сoordinates[0].lat,
            lon: сoordinates[0].lon
        }
    }

    const weatherData = async (lat, lon) => {
        const res = await request(`${_openWeatherMap}${lat}&lon=${lon}&appid=${_apiKey}`);
        return _transformWeather(res);
    }// Запрос на погоду

    const _transformWeather = (res) => {
        return{
            temp: (res.main.temp - 273).toFixed(0),
            description: res.weather[0].description,
            wind: res.wind.speed,
            hum: res.main.humidity
        }
    }

    return {oneCityServer, loading, error, weatherData, onErrorFalse};
}

export default CityServer;