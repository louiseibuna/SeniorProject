import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from
"mdbreact";

class TabsMaterial extends Component {
state = {
  activeItem: "1"
}

toggle = tab => () => {
  if (this.state.activeItem !== tab) {
  this.setState({
    activeItem: tab
  });
  }
}

render() {
    return (
      <MDBContainer>
          <MDBNav tabs>
          <MDBNavItem>
            <MDBNavLink
              link
              to="#"
              active={this.state.activeItem === "1"}
              onClick={this.toggle("1")}
              role="tab"
            >
              <MDBIcon icon="user" /> Profile
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to="#"
              active={this.state.activeItem === "2"}
              onClick={this.toggle("2")}
              role="tab"
            >
              <MDBIcon icon="heart" /> Follow
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to="#"
              active={this.state.activeItem === "3"}
              onClick={this.toggle("3")}
              role="tab"
            >
              <MDBIcon icon="envelope" /> Contact
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent
          className="card"
          activeItem={this.state.activeItem}
        >
          <MDBTabPane tabId="1" role="tabpanel">
            <p className="mt-2">
              Raw denim you probably haven't heard of them jean shorts
              Austin. Nesciunt tofu stumptown aliqua, retro synth master
              cleanse. Mustache cliche tempor, williamsburg carles vegan
              helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
              synth. Cosby sweater eu banh mi, qui irure terry richardson
              ex squid. Aliquip placeat salvia cillum iphone. Seitan
              aliquip quis cardigan american apparel, butcher voluptate
              nisi qui.
            </p>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <p className="mt-2">
              Food truck fixie locavore, accusamus mcsweeney's marfa nulla
              single-origin coffee squid. Exercitation +1 labore velit,
              blog sartorial PBR leggings next level wes anderson artisan
              four loko farm-to-table craft beer twee. Qui photo booth
              letterpress, commodo enim craft beer mlkshk aliquip jean
              shorts ullamco ad vinyl cillum PBR. Homo nostrud organic,
              assumenda labore aesthetic magna delectus mollit. Keytar
              helvetica VHS salvia yr, vero magna velit sapiente labore
              stumptown. Vegan fanny pack odio cillum wes anderson 8-bit,
              sustainable jean shorts beard ut DIY ethical culpa terry
              richardson biodiesel. Art party scenester stumptown, tumblr
              butcher vero sint qui sapiente accusamus tattooed echo park.
            </p>
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            Hello
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

export default TabsMaterial;
