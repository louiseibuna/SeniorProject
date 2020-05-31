import React from "react";
import { Polar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class PolarAreaChart extends React.Component {
    var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
    });

  state = {
    dataPolar: {
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
          backgroundColor: [
            "rgba(247, 70, 74, 0.5)",
            "rgba(70, 191, 189, 0.5)",
            "rgba(253, 180, 92, 0.5)",
            "rgba(148, 159, 177, 0.5)",
            "rgba(77, 83, 96, 0.5)"
          ],
          label: "My dataset" // for legend
        }
      ],
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"]
    }
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Polar area chart</h3>
        <Polar data={this.state.dataPolar} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default PolarAreaChart;
