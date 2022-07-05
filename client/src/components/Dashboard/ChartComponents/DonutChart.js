import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
//   labels: ['E', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [55, 25, 15, 5],
      backgroundColor: [
        'rgba(31, 120, 180, 1)',
        'rgba(166, 206, 227, 1)',
        'rgba(178, 223, 138, 1)',
        'rgba(51, 160, 44, 1)',
      ],
      borderColor: [
        'rgba(31, 120, 180, 1)',
        'rgba(166, 206, 227, 1)',
        'rgba(178, 223, 138, 1)',
        'rgba(51, 160, 44, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => ( 
    <Doughnut data={data} />
);

export default DoughnutChart;