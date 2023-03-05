import React from "react";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/request";
import "./Banner.css";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화정보
    const response = await axios.get(requests.fetchNowPlaying);
    console.log("response", response);
    // 영화 하나 select
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    console.log("id", movieId);
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    console.log("movieDetail", movieDetail);
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  if (isClicked) {
    return (
      <>
        <ButtonContainer>
          <button onClick={() => setIsClicked(false)}>
            Go back to main page
          </button>
        </ButtonContainer>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
      </>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_title}
          </h1>
          <div className="banner__buttons">
            {movie?.videos?.results[0]?.key && (
              <button
                className="banner__button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            )}
          </div>
          <h1 className="banner__description">
            <p>{truncate(movie.overview, 100)}</p>
          </h1>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  }
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 90%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
