import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        "api_key": '483c908ded990efd74755312dd6c1015',
        "language": "ko",
    }
});

const enApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        "api_key": '483c908ded990efd74755312dd6c1015',
        "language": "en-US",
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) =>
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos"
            }

        }),
    search: term =>
        api.get("search/movie", {
            params: {
                query: decodeURIComponent(term)
            }
        })

}

export const tvApi = {
    topRated: () => enApi.get("tv/top_rated"),
    popular: () => enApi.get("tv/popular"),
    airingToday: () => enApi.get("tv/airing_today"),
    tvDetail: (id) =>
        enApi.get(`tv/${id}`, {
            params: {
                append_to_response: "videos"
            }
        }),
    search: term =>
        enApi.get("search/tv", {
            params: {
                query: decodeURIComponent(term)
            }
        })
}