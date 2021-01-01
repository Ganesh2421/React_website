//import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import './index.css';

import React, {Component} from 'react';
import Chart from "chart.js";
import "./App.css";
import Line from 'react-chartjs-2';
import { Container, Row, Col} from 'react-grid-system';
import Weather from './weather';
 var data,response1,weather,v;
 weather = new Weather();



function getMyLocation() {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
      displayLocation, 
      displayError);
  }
  else {
    alert("Oops, no geolocation support");
  }
}

function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var v2 = [];
  v2.push(latitude);
  v2.push(longitude);
  localStorage.setItem('result',JSON.stringify(v2));


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
  throw Error(errorMessage);
}

//v = [19.415803399999998, 72.8297686];

const breakPoints = [
  { width: 1, itemsToShow: 1 },
];
 
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }
  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.timestamp);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.waterlevel);
    this.myChart.update();
  }

  componentDidMount() {
    console.log(this.props.data);
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
    options : {
      maintainAspectRatio: false,

      title:{
              display:this.props.displayTitle,
              text:'Water Level of Ganga',
              fontSize:25
            }, 
       scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: this.props.seg
              }
            }
          ]},
            legend:{
              display: 'waterlevel',
              position:'bottom'
            }
          },
        data: {labels:this.props.data.map(d => d.timestamp),
        datasets:[
          {
            label:'Water Level',
            backgroundColor: 'rgba(75,192,192,1)',
            fill: false,
            data: this.props.data.map(d => d.waterlevel)
          }
        ]}
   });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data_curr: [],
      data_hrs: [],
      data_week:[],
      loaded: false,
      weather_fore: [],
      weather_curr: [],
    };
  }

  componentDidMount() {
    console.log(this.state.data);
    window.setInterval(() => {
      getMyLocation();
      v = JSON.parse(localStorage.getItem('result'));

      fetch('https://sensoryt.herokuapp.com/api/data/past/7-day')
        .then(res => res.json())
        .then(json => {this.setState({
        data_week: json,
      })});

      fetch('https://sensoryt.herokuapp.com/api/data/past/1-day')
        .then(res => res.json())
        .then(json => {this.setState({
        data_hrs: json
      })});

      fetch('https://sensoryt.herokuapp.com/api/data/alldata')
        .then(res => res.json())
        .then(json => {this.setState({
        data_curr: json,
        loaded:true

      })});
      weather.getHourlyWeatherByPosition(v)
        .then(json => {this.setState({
        weather_fore: json,
      })});
      weather.getCurrentWeatherByPosition(v)
        .then(json => {this.setState({
        weather_curr: json,
      })});

    }, 5000);

  }

  render(){
    //var {loaded, data}
    if(!(this.state.loaded)){
      console.log("Loading");
      return(
              <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1>
);
    }
    else{
      var t = this.state.data_curr.data.slice(0,1).map(d=>d.timestamp);
      console.log(t);
      return (
      <div className="App">
      <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1>
      
        <Carousel breakPoints={breakPoints}>
       

          <Item> <p class='name' style={{ textAlign: "center"}}> {this.state.data_curr.data.slice(0,1).map(d=>d.timestamp)} </p>
                <p class='value' style={{ textAlign: "center"}}> {this.state.data_curr.data.slice(0,1).map(d=>d.waterlevel)} </p>
                <p style={{ textAlign: "center"}}>Current Value</p>
          </Item>
          <Item><LineChart data = {this.state.data_week.data} seg = 'day'/></Item>
          
          <Item><LineChart data = {this.state.data_hrs.data} seg = 'hours'/></Item>

          <Item>
            <Container style={{border:"1px solid #2d2d2d"}}>
      <p class='name' style={{ textAlign: "center"}}> {this.state.weather_fore[0].location.name} </p>

      <div class='image-container'>
      <img src ={this.state.weather_curr.icon} />
      <p>{this.state.weather_curr.temperature.current}<span>&#8451;</span></p>
      <p>{this.state.weather_curr.date.toLocaleDateString()} {this.state.weather_curr.date.toLocaleTimeString()}</p>

      </div>
      <Row>
        <Col style = {{textAlign:"center"}} sm={6}>
            <img src ={this.state.weather_fore[0].icon} />
            <p>{this.state.weather_fore[0].temperature.current}<span>&#8451;</span></p>
            <p>{this.state.weather_fore[0].date.toLocaleDateString()} {this.state.weather_fore[0].date.toLocaleTimeString()}</p>
    
        </Col>
        <Col style = {{textAlign:"center"}}  sm={5}>
            <img src ={this.state.weather_fore[1].icon} />
            <p>{this.state.weather_fore[1].temperature.current}<span>&#8451;</span></p>
            <p>{this.state.weather_fore[1].date.toLocaleDateString()} {this.state.weather_fore[1].date.toLocaleTimeString()}</p>
        </Col>

      </Row>
      </Container>
      </Item>
          

        </Carousel>
            </div>
       );
    }
      
 
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


