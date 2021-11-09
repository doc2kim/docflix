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

export default function () {
    return <Container><span role="img" aria-label="Loading" ></span>Loading...</Container>
}

