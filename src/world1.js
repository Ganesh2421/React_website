/*import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import Appm from './graph';
import "./App.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
];

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          <Item><h2 textAlign="center">One</h2></Item>
          <Item><Appm/></Item>
          <Item>Three</Item>
         
        </Carousel>
      </div>
    </>
  );
}*/import ReactDOM from "react-dom";
import React, { Component } from 'react';
import Chart from './chart';
function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}
class Appm extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{},
      d : getRandomDateArray(17)
      
    }
  }

  componentWillMount(){
   // this.getchartData(); // this should be this.getChartData();

   window.setInterval(() => {
      console.log("done");
    this.setState({

      chartData:{
        labels: this.state.d.map(d => d.time),
        datasets:[
          {
            label:'Water Level',
            backgroundColor: 'rgba(75,192,192,1)',
            fill: false,
            data:this.state.d.map(d => d.value)
          }
        ]
      },
      d : getRandomDateArray(17)
    });      
  
    }, 5000)
  }

  getChartData(){
    // Ajax calls here
    
    this.setState({

      chartData:{
        labels: this.state.d.map(d => d.time),
        datasets:[
          {
            label:'Water Level',
            backgroundColor: 'rgba(75,192,192,1)',
            fill: false,
            data:this.state.d.map(d => d.value)
          }
        ]
      },
      d : getRandomDateArray(17)
    });
  }

  render() {
    return (
        <Chart chartData={this.state.chartData} location="Ganga" legendPosition="bottom"/>

    );
  }
}

//export default Appm;
const rootElement = document.getElementById("root");
ReactDOM.render(<Appm />, rootElement);





