import React from 'react';
import { Link, BrowserRouter, Switch,  Route } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Dashboard } from './Dashboard'
import { About } from './About';


const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

export const NavBar = () => (
    <Styles>
        <BrowserRouter>
            <Navbar expand="lg">
                <Navbar.Brand href="/">PM Pro</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nax" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/">Dashboard</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/about">About</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route exact path='/about' component={About}/>
            </Switch>
        </BrowserRouter>
        
    </Styles>
)