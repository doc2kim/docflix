import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components"
import Helmet from "react-helmet"
import Section from "Components/Section"
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";


const Container = styled.div`
    padding:20px;
    
`;
// substring(0, 4)은 argument인 두 index 사이의 string 만 반환한다.(0~4 사이의 문자열만 반환)
const HomePresenter = function ({ nowPlaying, upcoming, popular, error, loading }) {
    return <>
        <Helmet>
            <title>Movies | Docflix</title>
        </Helmet>
        {loading ? (
            <Loader />
        ) : (
            <Container>

                {nowPlaying && nowPlaying.length > 0 && (
                    <Section title="현재 상영중">
                        {nowPlaying.map(function (movie) {
                            return <Poster
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.title}
                                rating={movie.vote_average}
                                year={movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie={true}
                            />
                        })}
                    </Section>
                )}
                {upcoming && upcoming.length > 0 && (
                    <Section title="개봉 예정">
                        {upcoming.map(function (movie) {
                            return <Poster
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.title}
                                rating={movie.vote_average}
                                year={movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie={true}
                            />
                        })}
                    </Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="인기 작품">
                        {popular.map(function (movie) {
                            return <Poster
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.title}
                                rating={movie.vote_average}
                                year={movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie={true}
                            />
                        })}
                    </Section>
                )}
                {error && <Message color="#e74c3c" text={error} />}
            </Container>
        )}
    </>
}


HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
}

export default HomePresenter;