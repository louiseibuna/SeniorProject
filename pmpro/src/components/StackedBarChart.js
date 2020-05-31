
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { MDBContainer, MDBCard, MDBCardTitle } from "mdbreact";

class StackedBarChart extends Component {
    constructor(props) {
      super(props);

      this.state = {

        series: [{
          name: 'Open',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'Closed',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'Merged & Closed',
          data: [11, 17, 15, 15, 21, 14]
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
            categories: ['betty', 'archie', 'jughead', 'veronica'],
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
              <MDBCardTitle>PR Participation</MDBCardTitle>
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
