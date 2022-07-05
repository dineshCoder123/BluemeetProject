import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    showCanvasBorder: "1",
    bgColor: "#FFFFFF",
    showBorder: 0,
    palette: 3,
    showAlternateHGridColor: 0,
    divLineColor: "#E3EEF6",
    paletteColors: ["#FFFFFF"],
    showcanvasborder: 0,
    canvasBgColor: "ffffff",
    color: "#ffffff",
    patternBgColor: "#ffffff",
    divLineThickness: 1,
    anchorradius: "5",
    plottooltext: "Average Revenue in $label is <b>$dataValue</b>",
    showhovereffect: "1",
    showvalues: "0",
    numbersuffix: "$",
    theme: "fusion",
    anchorbgcolor: "#538BF7",
    palettecolors: "#538BF7",
    showToolTip: 1,
    toolTipBgColor: "#223345",
    toolTipColor: "#ffffff",
    toolTipSepChar: 1,
    tooltipborderradius: 4,
    toolTipPadding: 15,
    tooltipPosition: "top",
    baseFont: 'Inter',
    baseFontSize: 15,
    baseFontColor: "#223345",
    labelFont: 'Inter',
    labelFontSize: 13,
    labelFontBold: 0,
    chartLeftMargin: 30,
    chartTopMargin: 30,
    canvasPadding: 40,
    canvasTopMargin: 30,
    drawAnchors: 1,
  },
  data: [
    {
      label: "Jan",
      value: "8000"
    },
    {
      label: "Feb",
      value: "26289"
    },
    {
      label: "Mar",
      value: "820282"
    },
    {
      label: "Apr",
      value: "282829"
    },
    {
      label: "May",
      value: "997622"
    },
    {
      label: "Jun",
      value: "172929"
    },
    {
      label: "Jul",
      value: "222213"
    },
    {
      label: "Aug",
      value: "382909"
    },
    {
      label: "Sep",
      value: "2028292"
    },
    {
      label: "Oct",
      value: "16202"
    },
    {
      label: "Nov",
      value: "723244"
    },
    {
      label: "Dec",
      value: "2321233"
    }
  ]
};

class SplineChart extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="spline"
        width="98%"
        height="37%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}

export default SplineChart;