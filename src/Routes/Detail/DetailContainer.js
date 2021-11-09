import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

class DetailContainer extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: { pathname }
        } = props;
        this.state = {
            result: null,
            companys: null,
            countrys: null,
            ytVideos: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push },
        } = this.props;
        const { isMovie } = this.state;
        //parseInt()는 string을 int로 변환한다. 
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        let ytVideos = null;
        let companys = null;
        let countrys = null;
        try {
            if (isMovie) {
                ({
                    data: result,
                    data: { videos: { results: ytVideos } },
                    data: { production_companies: companys },
                    data: { production_countries: countrys }

                } = await moviesApi.movieDetail(parsedId));

            } else {
                ({
                    data: result,
                    data: { videos: { results: ytVideos } },
                    data: { production_companies: companys },
                    data: { production_countries: countrys }

                } = await tvApi.tvDetail(parsedId));

            }

        } catch {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({ loading: false, result, ytVideos, companys, countrys });
        }
    }

    render() {
        const { result, error, loading, ytVideos, companys, countrys } = this.state;
        console.log(result)
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
                companys={companys}
                countrys={countrys}
                ytVideos={ytVideos}
            />
        )
    }
}
export default DetailContainer;