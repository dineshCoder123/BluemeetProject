/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AnalyticsChart = ({titletext}) => {
  const [series, setSeries] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 1,
        opacity: 0.2
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: titletext,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#E6E3E3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.8,
          gradientToColors: ["#538BF7", "#538AF7AD", "#105AEE70"], // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.7,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
        }
      },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </>
  );
};

export default AnalyticsChart;

// class ApexChart extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {

//         series: [{
//             name: "Desktops",
//             data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//         }],
//         options: {
//           chart: {
//             height: 350,
//             type: 'line',
//             zoom: {
//               enabled: false
//             }
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             curve: 'straight'
//           },
//           title: {
//             text: 'Product Trends by Month',
//             align: 'left'
//           },
//           grid: {
//             row: {
//               colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//               opacity: 0.5
//             },
//           },
//           xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//           }
//         },

//       };
//     }

//     render() {
//       return (

//   <div id="chart">
// <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
// </div>

//       );
//     }
//   }

// export default ApexChart;
