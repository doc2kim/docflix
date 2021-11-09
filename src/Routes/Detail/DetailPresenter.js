import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components"
import Helmet from "react-helmet"
import Loader from "Components/Loader";

const Container = styled.div`
    height:calc(100vh - 50px);
    width: 100%;
    position:relative;
    padding:50px;
`;

const Backdrop = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${function (props) { return props.bgImage }});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index:0;
`;

const Content = styled.div`
    display:flex;
    width:100%;
    position:relative;
    z-index: 1;
    height:100%;
`;

const Cover = styled.div`
    width:30%;
    background-image: url(${function (props) { return props.bgImage }});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
width:66%;
margin-left:75px;
`;

const Title = styled.h3`
font-size:35px;

`;

const ItemContainer = styled.div`
line-height:1.7;
margin:20px 0;
height: 27%;
overflow: auto;
text-overflow: ellipsis;

`;

const Item = styled.span`
`;

const Divider = styled.span`
margin: 0 10px;
`;

const Overview = styled.p`
font-size:12px;
opacity: 0.7;
line-height: 1.5;
margin-top: 10px;
`;

const Imdb = styled.a`
background-color:rgb(245, 197, 25);
padding: 3px;
color: black;
font-weight: bold;
border-radius: 3px;
`;

const TitleText = styled.h4`
font-size: 22px;
padding: 20px 0;
`;

const Average = styled.div`
font-size: 20px;
margin-top: 5px;
`;

const Videos = styled.div`
display: flex;
overflow: auto;
height: 27%;
`;

const Block = styled.div`
display: flex;
width: 100%;
height: 26%;
`;

const List = styled.li`
font-size: 13px;
opacity: 0.7;
`;

const Producer = styled.div`
width: 50%;
overflow: hidden;
text-overflow: ellipsis;
`;

const Country = styled.div`
width: 50%;
`;

const Genre = styled.span`
`;


const DetailPresenter = function ({ result, error, loading, ytVideos, countrys, companys }) {
    return loading ? (
        <>
            <Helmet>
                <title>Loading | Docflix</title>
            </Helmet>
            <Loader />
        </>
    ) : <Container>
        <Helmet>
            <title>{result.title
                ? result.title
                : result.original_name} | Docflix</title>
        </Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
        <Content>
            <Cover bgImage={result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")}
            />
            <Data>
                <Title>{result.title
                    ? result.title
                    : result.original_name}
                </Title>
                <ItemContainer>
                    <Item>{result.release_date
                        ? result.release_date.substring(0, 4)
                        : result.first_air_date.substring(0, 4)}
                    </Item>
                    <Divider>•</Divider>
                    <Item>{result.runtime
                        ? result.runtime
                        : result.episode_run_time} min
                    </Item>
                    <Divider>•</Divider>
                    <Item>
                        {result.genres && result.genres.map(function (genre, index) {
                            return index === result.genres.length - 1 ? genre.name : <Genre key={genre.id} >{`${genre.name} / `}</Genre>;
                        })}
                    </Item>
                    <Item>
                        {result.imdb_id ? <>
                            <Divider>•</Divider>
                            <Imdb href={`https://www.imdb.com/title/${result.imdb_id}/`}>IMDb</Imdb>
                        </> : ""}
                    </Item>
                    <Average>{result.vote_average && `⭐️ ${result.vote_average}`}</Average>
                    <Overview>
                        {result.overview}
                    </Overview>
                </ItemContainer>
                <hr />
                <Block>
                    <Producer>
                        <TitleText>제작사</TitleText>
                        {companys && companys.map(function (company) {
                            return (
                                <List key={company.id}>{company.name}</List>
                            );
                        })}
                    </Producer>
                    <Country>
                        <TitleText>제작국</TitleText>
                        {countrys && countrys.map(function (country) {
                            return (
                                <List key={country.id}>{country.name}</List>
                            );
                        })}
                    </Country>
                </Block>
                <hr />
                <TitleText>트레일러</TitleText>
                <Videos>
                    {ytVideos && ytVideos.map(function (video) {
                        return (
                            <iframe
                                key={video.id}
                                title={video.name}
                                width="330"
                                height="155"
                                scrolling="yes"
                                allowFullScreen={true}
                                src={`https://www.youtube.com/embed/${video.key}`}>
                            </iframe>
                        )
                    })}
                </Videos>
            </Data>
        </Content>
    </Container >;
}

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailPresenter;