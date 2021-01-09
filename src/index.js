//import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import './index.css';
import {Link} from 'react-scroll';
import React, {Component, useRef ,useState} from 'react';
import Chart from "chart.js";
import "./App.css";
import Line from 'react-chartjs-2';
import { Container, Row, Col} from 'react-grid-system';
import Weather from './weather';
 var data,response1,weather,v,v1;
 weather = new Weather();
function post_data(){
    var name = document.forms["RegForm"]["name"];
      var phonenumber = document.forms["RegForm"]["num"];

  var obj = {name: name.value, phoneNumber: phonenumber.value};
  var myJSON = JSON.stringify(obj);
  console.log(myJSON);
  fetch('https://myappyt.herokuapp.com/api/data/auth/register', {
    method: 'post',
    body: myJSON
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log('post request data', data);
  })
};
const Modal =({show,close_modal}) =>{
  console.log(show);
  return(
        <div  class="modal" id = "id02" style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}>
        

        <form class="modal-content" id="RegForm1" name="RegForm" action=""  onSubmit={post_data}>
            <div class="imgcontainer">
                <p  >Register Yourself</p>
                <span onClick={close_modal} class="close" title="Close Modal">×</span>

                
            </div>
            <div class="container">
                <label><b>Name </b></label>
                <input type="text" placeholder="Enter Name" name="name" required />

                <label><b>Email</b></label>
                <input type="phonenumber" placeholder="Enter Number" name="num" required />

                
                

                <div class="clearfix">
                    <button  class="signupbtn" value="submit" type="submit">Sign Up</button>
                </div>
            </div>
        </form>
    </div>
    )
};
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

v1 = [51.5109865, -0.118092];


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
    this.myChart.data.labels = this.props.data.map(d => d.TimeAndDate);
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
              text:this.props.main,
              fontSize:25
            }, 
       scales: {
          xAxes: [
            {

              type: 'time',
              time: {
                unit: this.props.seg
              },
              intervalType: this.props.seg,
              interval: 2,

              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
                          }
          ],
          yAxes:[
          {scaleLabel: {
                display: true,
                labelString: 'Water-level in mm'
              }


          }]},
            legend:{
              display: 'waterlevel',
              position:'bottom'
            }
          },
        data: {labels:this.props.data.map(d => d.TimeAndDate),
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
function Display(){
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  

    return(
      <>
        <p class = 'link' style = {{textAlign: "center"}} onClick={() => setShow(true)}>Click here to Register</p>
      <Modal show={show} close_modal={closeModalHandler} />
      </>       );

  
  
  
}

class App extends Component {
  constructor(props) {
    super(props);
    this.hrs_sec = React.createRef();
    this.week_sec = React.createRef();
    this.state = {
      data_curr: [],
      data_hrs: [],
      data_week:[],
      load_curr: false,
      load_hrs: false,
      load_week: false,
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
        load_week:true

      })});

      fetch('https://sensoryt.herokuapp.com/api/data/past/1-day')
        .then(res => res.json())
        .then(json => {this.setState({
        data_hrs: json,
        load_hrs: true
      })});

      fetch('https://sensoryt.herokuapp.com/api/data/alldata')
        .then(res => res.json())
        .then(json => {this.setState({
        data_curr: json,
        load_curr:true

      })});
      weather.getHourlyWeatherByPosition(v)
        .then(json => {this.setState({
        weather_fore: json
      })});
      weather.getCurrentWeatherByPosition(v)
        .then(json => {this.setState({
        weather_curr: json
      })});

    }, 5000);

  }

  render(){
    //var {loaded, data}
    const goto_hrs=()=>{
      this.hrs_sec.current.scrollIntoView();
    };
    const goto_week=()=>{
      this.week_sec.current.scrollIntoView();

    };
    

    if(!(this.state.load_week && this.state.load_hrs && this.state.load_curr)){
      console.log("Loading");
      return(
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
);
    }
    else{
      var t = this.state.data_curr.data.slice(0,1).waterlevel;
      console.log(t);
      return (
      <div className="App">
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
            <Display />

      <Container style={{height:"300px" , padding:'0'}}>
      <Row>

      <Col style = {{textAlign:"center", borderRight:"1px solid #2d2d2d"}} xs={3}>
            <h3 style={{ textAlign: "center" }}>Water-level Report</h3>

      <p class='name' style={{ textAlign: "center"}}> {this.state.data_curr.data.slice(0,1).map(d=>d.TimeAndDate)} </p>
      <p class='value' style={{ textAlign: "center"}}> {this.state.data_curr.data.slice(0,1).map(d=>d.waterlevel)} </p>
      <p style={{ textAlign: "center"}}>Current Value</p>
      </Col>

      <Col xs={9}>
            <h3 style={{ textAlign: "center" }}>Weather Report</h3>
                  <p class='name' style={{ textAlign: "center"}}> {this.state.weather_fore[0].location.name} </p>

      <Row>
      <Col style = {{textAlign:"center"}} xs={4}>      
      
      <img src ={this.state.weather_curr.icon} />
      <p>{this.state.weather_curr.temperature.current}<span>&#8451;</span></p>
      <p>{this.state.weather_curr.date.toLocaleDateString()} {this.state.weather_curr.date.toLocaleTimeString()}</p>

      
      </Col>
      <Col style = {{textAlign:"center"}} xs={4}>
      <img src ={this.state.weather_fore[0].icon} />
            <p>{this.state.weather_fore[0].temperature.current}<span>&#8451;</span></p>
            <p>{this.state.weather_fore[0].date.toLocaleDateString()} {this.state.weather_fore[0].date.toLocaleTimeString()}</p>
    </Col>
        <Col style = {{textAlign:"center"}}  sm={4}>
            <img src ={this.state.weather_fore[1].icon} />
            <p>{this.state.weather_fore[1].temperature.current}<span>&#8451;</span></p>
            <p>{this.state.weather_fore[1].date.toLocaleDateString()} {this.state.weather_fore[1].date.toLocaleTimeString()}</p>
        </Col>      
        </Row>
      </Col>
      </Row>

      </Container>
      <hr />
      <Container>
      <h3 style={{ textAlign: "center" }}>Analysis of Water-level</h3>
      <Row>
      <Col style = {{textAlign:"right",borderRight:"1px solid #2d2d2d"}}    sm={6}>
      
      <p class = 'link' onClick={goto_hrs}>24-hrs</p>
      </Col>
      <Col sm={5}>
      <p class = 'link' onClick={goto_week}>1-week</p>
      </Col>
      </Row>
      <Row> 
      <Col  style = {{borderBottom:"2px solid #2d2d2d"}}>
      <Item id ="hours" ref={this.hrs_sec}><LineChart data = {this.state.data_hrs.data} seg = 'hours' main="Water-level(hours)"/></Item>
      </Col>
      <Col >
          <Item id = "week" ref={this.week_sec}><LineChart data = {this.state.data_week.data} seg = 'day' main="Water-level(day)"/></Item>
      </Col>

      </Row>


      </Container>
            </div>
       );
    }
      
 
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


