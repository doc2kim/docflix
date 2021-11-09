import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display:flex;
  justify-content: center;
`;

const Text = styled.span`
  color:${function (props) { return props.color }};
`;

const Message = function ({ text, color }) {
  return (
    <Container>
      <Text color={color}>{text}</Text>
    </Container>
  )
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Message;
