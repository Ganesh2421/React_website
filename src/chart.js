import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">
        

        <Line
          data={this.state.chartData}
          height={"80%"}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Water Level of '+this.props.location,
              fontSize:25
            },
            scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'weeks'
              }
            }
          ]},
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }
          }
        />

        
      </div>
    )
  }
}

export default Chart;