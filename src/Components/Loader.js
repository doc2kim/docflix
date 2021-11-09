import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height:100vh;
    width: 100vw;
    display:flex;
    justify-content: center;
    font-size:30px;
    margin-top:300px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <Container>
        <span role="img" aria-label="Loading" ></span>
        Loading...
    </Container>
);


