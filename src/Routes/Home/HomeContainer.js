import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

// 컨테이너 프리젠터 패턴이란?

// 컨테이너(Container) : data와 state(상태값)를 가지고, api를 호출하고, 기타 모든 로직들을 처리한다.
// (데이터를 받아와서 처리하는 것을 담당함)

// 프리젠터(Presenter) : 컨테이너가 처리한 데이터들을 화면에 뿌려주는 역할을 하는 함수형 컴포넌트
// 프리젠터는 state(상태값), api, 클래스 등을 다루지 않는다.
// (데이터를 화면에 뿌려주고 스타일을 담당함)

class HomeContainer extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true,
    };

    // 자바스크립트는 api response 처리가 될때 까지 기다려주지 않는다. 기다리라고 말해 줘야함. async/await
    // try를 작동하고 그렇지 않다면 catch 처리 해줌, try든 catch든 실행 후 finally(loading:false)가 실행됨
    async componentDidMount() {

        try {

            const { data: { results: nowPlaying } } = await moviesApi.nowPlaying();
            const { data: { results: upcoming } } = await moviesApi.upcoming();
            const { data: { results: popular } } = await moviesApi.popular();
            this.setState({
                nowPlaying,
                upcoming,
                popular
            })
        } catch {
            this.setState({
                error: "Can't find movies information"
            })
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        )
    }
}
export default HomeContainer;