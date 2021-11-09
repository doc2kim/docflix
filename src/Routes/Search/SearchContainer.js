import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

class SearchContainer extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        loading: false,
        error: null,
    }
    //input 값으로 검색하여 리턴 값을 받을 때 작동하는 로직
    handleSubmit = event => {
        event.preventDefault();

        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
    }

    updateTerm = event => {
        const { target: { value } } = event;

        this.setState({ searchTerm: value });
    }

    searchByTerm = async function () {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try {
            const { data: { results: movieResults } } = await moviesApi.search(searchTerm);
            const { data: { results: tvResults } } = await tvApi.search(searchTerm);
            this.setState({ movieResults, tvResults });
        } catch {
            this.setState({ error: "Can't find results." });
            this.setState({ loading: false });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { movieResults, tvResults, searchTerm, loading, error, } = this.state;
        console.log(movieResults)
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        )
    }
}

export default SearchContainer;