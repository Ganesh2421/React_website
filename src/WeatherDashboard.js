// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';

// IMPORT PROJECT REFERENCES
import { HourlyWeatherForecastCard } from './HourlyWeatherForecastCard';

// IMPORT PROJECT SERVICES
import { Weather } from './weather';
function getMyLocation() {
    var loc = [];
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            loc = displayLocation, 
            displayError);
    }
    else {
        alert("Oops, no geolocation support");
    }
    return loc;
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var loc = [];
    loc.push(latitude);
    loc.push(longitude);
    return loc;

}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied",
        2: "Position is not available",
        3: "Request timeout"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}




// INITIALIZE SERVICES
const weatherService = new Weather();
const position =  getMyLocation();


class WeatherDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //showCurrentWeather: false,
            //showDailyWeather: false,
            showHourlyWeather: false
        };

        //this.handleOnRefresh = this.handleOnRefresh.bind(this);
    }


    componentDidMount() {
        //this.loadCurrentWeatherByPosition(position);
        //this.loadDailyWeatherByPosition(position);
        this.loadHourlyWeatherByPosition(position);
            
                 
    }


    /*loadCurrentWeatherByPosition(position) {
        
        if (position == []) {
            throw Error('A valid position must be specified');
        }

        weatherService
            .getCurrentWeatherByPosition(position)
            .then(weather => {
                this.setState(() => ({ weather: weather, showCurrentWeather: true }));
            })
            .catch(error => console.log(error));
    }


    loadDailyWeatherByPosition(position) {
        
        if (position == []) {
            throw Error('A valid position must be specified');
        }

        weatherService
            .getDailyWeatherByPosition(position)
            .then(dailyForecasts => {
                this.setState(() => ({ dailyForecasts: dailyForecasts, showDailyWeather: true }));
            })
            .catch(error => console.log(error));
    }*/


    loadHourlyWeatherByPosition(position) {
        
        if (position == []) {
            throw Error('A valid position must be specified');
        }

        weatherService
            .getHourlyWeatherByPosition(position)
            .then(hourlyForecasts => {
                this.setState(() => ({ hourlyForecasts: hourlyForecasts, showHourlyWeather: true }));
            })
            .catch(error => console.log(error));
       console.log(this.state.hourlyForecasts);

    }


    /*handleOnRefresh() {
        this.setState(() => ({
            showCurrentWeather: false,
            showDailyWeather: false,            
            showHourlyWeather: false
        }));

        geolocationService
            .getCurrentPosition()
            .then(position => {
                this.loadCurrentWeatherByPosition(position);
                this.loadDailyWeatherByPosition(position);
                this.loadHourlyWeatherByPosition(position);
            })
            .catch(error => console.log(error));
    }


    showWeather() {
        return this.state.showCurrentWeather 
            && this.state.showDailyWeather 
            && this.state.showHourlyWeather;
    }


    showSpinner() {
        return !this.state.showCurrentWeather 
            || !this.state.showDailyWeather 
            || !this.state.showHourlyWeather;
    }*/


    render() {
    	        	console.log(this.state.hourlyForecasts);

        return (
            <div>
                                   
             <HourlyWeatherForecastCard hourlyForecasts={this.state.hourlyForecasts} />
                    
          
            </div>
        );
    }
}


export { WeatherDashboard };