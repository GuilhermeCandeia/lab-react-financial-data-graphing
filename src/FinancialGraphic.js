import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import FinancialGraphic from "./FinancialGraphic";

class FinancialGraphic extends React.Component {
  state = {
    GraphicInfo: [],
  };
  componentDidMount = () => {
    axios
      .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
      .then((response) => {
        this.setState({ GraphicInfo: { ...response.data.bpi } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidUpdate = () => {
    console.log(this.state.GraphicInfo);
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: Object.keys(this.state.GraphicInfo),
        datasets: [
          {
            label: "Preço de fechamento $MSFT",
            backgroundColor: "rgba(235, 99, 132, 0.3)",
            borderColor: "rgb(255, 99, 132)",
            data: Object.values(this.state.GraphicInfo),
            fill: true,
          },
        ],
      },
    });
  };
  render() {
    return (
      <div>
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}
export default FinancialGraphic;
