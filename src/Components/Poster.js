import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    font-size:12px;
`;


const Image = styled.div`
    background-image: url(${function (props) { return props.bgUrl }});
    width: 170px;
    height:270px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
`;

const Rating = styled.span`
    bottom:5px;
    right:-17px;
    position: absolute;
    opacity:0;
    transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
    margin-bottom:5px;
    position:relative;
    &:hover{
        ${Image}{
            opacity:0.3;
        }
        ${Rating}{
            opacity:1;
        }
    }
`;

const Title = styled.div`
    display: block;
    margin-bottom: 3px;
`;

const Year = styled.span`
    font-size: 10px;
    color: rgba(255,255,255,0.5);
`;

const Poster = function ({ id, imageUrl, title, rating, year, isMovie = false }) {
    return (
        <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
            <Container>
                <ImageContainer>
                    <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../assets/noPosterSmall.png").default} />
                    <Rating>
                        <span role="img" aria-label="rating">
                            ⭐️
                        </span>
                        {rating}/10
                    </Rating>
                </ImageContainer>
                <Title>
                    {title.length > 18 ? `${title.substring(0, 15)}...` : title}
                </Title>
                <Year>{year}</Year>
            </Container>
        </Link >)
}

Poster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMovie: PropTypes.bool
}


export default Poster;