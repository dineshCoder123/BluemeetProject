import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);

const chartConfigs = {
  type: 'world',
  width: "100%",
  height: "42%",
  dataFormat: 'json',
  dataSource: {
    "chart": {
    //   "caption": "Average Annual Population Growth",
    //   "subcaption": " 1955-2015",
      "numbersuffix": "%",
      "includevalueinlabels": "1",
      "labelsepchar": ": ",
      "entityFillHoverColor": "#7BA1EE",
      "theme": "fusion"
    },
    "colorrange": {
      "minvalue": "0",
      "code": "#E8E9EB",
      "gradient": "0",
      "color": [
        {
          "minvalue": "0.5",
          "maxvalue": "1.0",
          "color": "#85adf9"
        },
        {
          "minvalue": "1.0",
          "maxvalue": "2.0",
          "color": "#548cf7"
        },
        {
          "minvalue": "2.0",
          "maxvalue": "3.0",
          "color": "#246bf5"
        }
      ]
    },
    "data": [
      {
        "id": "NA",
        "value": ".82",
        "showLabel": "1"
      },
      {
        "id": "SA",
        "value": "2.04",
        "showLabel": "1"
      },
      {
        "id": "AS",
        "value": "1.78",
        "showLabel": "1"
      },
      {
        "id": "EU",
        "value": ".40",
        "showLabel": "1"
      },
      {
        "id": "AF",
        "value": "2.58",
        "showLabel": "1"
      },
      {
        "id": "AU",
        "value": "1.30",
        "showLabel": "1"
      }
    ]
  }
  ,
};

class WorldMapChart extends Component {
  render () {
    return <ReactFC {...chartConfigs} />;
  }
}

export default WorldMapChart;