import React from 'react';
import styled from 'styled-components';

//Title Styling
const Title = styled.h1`
    font-size: 3.0em;
    text-align: center;
    color: grey;
`;

//Wrapper that renders the section
const Wrapper = styled.section`
    padding: 4em;
    background: white;
`;

export const About = () => (
    <Wrapper>
        <Title>
            Hello, we are PM Pro!
        </Title>
        <center>
            <p>
            Thank you for visiting our website! Our goal is to steamline the analyzation of pull requests via GitHub. This is a senior project from students at Cal Poly, San Luis Obispo 
            under the supervision of a faculty member of the Computer Science and Software Engineering Department.
            </p>

            <p>
            Here are the people a part of this project:
            </p>

            <h3>Carmina Cruz</h3>
            <p>Computer Science Student at Cal Poly San Luis Obispo</p>

            <h3>Louise Ibuna</h3>
            <p>Software Engineering Student at Cal Poly San Luis Obispo</p>

            <h3>Bruno daSilva</h3>
            <p>Software Engineering Professor at Cal Poly San Luis Obispo</p>
        </center>
    </Wrapper>
   
)