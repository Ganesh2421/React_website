import logo from './logo.svg';
import './App.css';
import axios from 'axios';



const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const OPEN_WEATHER_API_KEY = '4bbbbc9ea1b92e77ac3ee39a211eed20';
const OPEN_WEATHER_IMG_URL = 'http://openweathermap.org/img/w';


const getHourlyWeather = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                console.log(response.data.city.name);
                if (response && response.status === 200) {

                    const location = {
                        name: response.data.city.name,
                        latitude: response.data.city.coord.lat,
                        longitude: response.data.city.coord.lon
                    };                    

                    const hourlyForecasts = response.data.list.map(fc => {
                        return {
                            condition: fc.weather[0].description,
                            date: new Date(fc.dt * 1000),
                            icon: `${OPEN_WEATHER_IMG_URL}/${fc.weather[0].icon}.png`,
                            location: location,
                            temperature: {
                                current: fc.main.temp
                            }
                        };
                    });
                    console.log(hourlyForecasts);
                    resolve(hourlyForecasts);
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};

const getWeather = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    const { main, icon } = response.data.weather[0];
                    const { temp, temp_min, temp_max } = response.data.main;
                    const { lon, lat } = response.data.coord;
                    const { dt, name } = response.data;
                    resolve({
                        condition: main,
                        date: new Date(dt * 1000),
                        icon: `${OPEN_WEATHER_IMG_URL}/${icon}.png`,
                        location: {
                            name: name,
                            latitude: lat,
                            longitude: lon
                        },
                        temperature: {
                            current: temp,
                            minimum: temp_min,
                            maximum: temp_max
                        }
                    });
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};


class Weather {

  
    getHourlyWeatherByPosition(position) {
            if (!position[0]) {
            throw Error('Latitude is required');
            }

            if (!position[1]) {
            throw Error('Longitude is required');
            }

            const url = `${OPEN_WEATHER_BASE_URL}/forecast?appid=${OPEN_WEATHER_API_KEY}&lat=${position[0]}&lon=${position[1]}&units=metric&cnt=2`;
            console.log(url);
            return getHourlyWeather(url);
        }
    getCurrentWeatherByPosition(position) {
        if (!position[0]) {
            throw Error('Latitude is required');
        }

        if (!position[1]) {
            throw Error('Longitude is required');
        }

        const url = `${OPEN_WEATHER_BASE_URL}/weather?appid=${OPEN_WEATHER_API_KEY}&lat=${position[0]}&lon=${position[1]}&units=metric`;
        
        return getWeather(url);
    }
}

export default Weather;
