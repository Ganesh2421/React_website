import React, { Component } from 'react';
import Chart from './chart';

class Appm extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
      
    }
  }

  componentDidUpdate() {
    this.chartData.labels = this.props.d.map(d => d.time);
    this.chartData.datasets[0].data = this.props.d.map(d => d.value);
        <Chart chartData={this.state.chartData} location="Ganga" legendPosition="bottom"/>
  }

  componentWillMount(){
   // this.getchartData(); // this should be this.getChartData();
   console.log(this.state.data);
    this.setState({

      chartData:{
        labels:['2018-05-01T00:00:00','2018-05-08T00:00:00'] ,//this.props.d.map(d => d.time),
        datasets:[
          {
            label:'Water Level',
            backgroundColor: 'rgba(75,192,192,1)',
            fill: false,
            data: [555,4444]//this.props.d.map(d => d.value)
          }
        ]
      }
    });   
  }

  /*getChartData(){
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
      }
    });
  }*/

  render() {
    return (
        <Chart chartData={this.state.chartData} location="Ganga" legendPosition="bottom"/>

    );
  }
}

export default Appm;