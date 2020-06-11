
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { MDBContainer, MDBCard, MDBCardTitle } from "mdbreact";

class StackedBarChart extends Component {
    constructor(props) {
      super(props);

      this.state = {

        series: [{
          name: 'Total Contributions',
          data: [1121, 774, 506, 393, 250, 209, 182, 174, 173, 171]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            type: 'string',
            categories: ['dangra', 'kmike', 'redapple', 'elacuesta', 'void', 'curita', 'Gallaecio', 'pablohoffman', 'eliasdorneles', 'wRAR'],
          },
          legend: {
            position: 'right',
            offsetY: 40,
            markers: {
                fillColors:["#98DE91", "#FDB45C", "#46BFBD"],

            }
          },
          fill: {
            colors:["#98DE91", "#FDB45C", "#46BFBD"],
            opacity: 1
          }
        },


      };
    }

  render() {
    return (
        <MDBContainer>
            <MDBCard className="card-body" style={{ width: "35rem", marginTop: "1rem" }}>
              <MDBCardTitle>PR Contributors</MDBCardTitle>
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      width="500"
                    />
                  </div>
                </div>
              </div>
            </MDBCard>
        </MDBContainer>
    );
  }
}

export default StackedBarChart;
