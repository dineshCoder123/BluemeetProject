import React from "react";
import ReactApexChart from "react-apexcharts";

class RadialChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [this.props.value],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: 0,
              endAngle: 360,
               hollow: {
                margin: 0,
                size: '70%',
                background: 'transparent',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
                dropShadow: {
                  enabled: false,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: '#EBEBEB',
                strokeWidth: '70%',
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: false,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },
          
              dataLabels: {
                show: false,
                name: {
                  offsetY: -10,
                  show: true,
                  color: '#BBBBBB',
                  fontSize: '17px'
                },
                value: {
                  formatter: function(val) {
                    return parseInt(val);
                  },
                  color: '#111',
                  fontSize: '36px',
                  show: true,
                }
              }
            }
          },
          fill: {
            colors: ['#A0B9EB'],
          },
          stroke: {
            lineCap: 'round'
          },
          labels: ['Registrations']
        },
      };
    }

  

    render() {
      return (
        

  <div id="card">
<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={180} />
</div>
</div>


      );
    }
  }

  export default RadialChart;