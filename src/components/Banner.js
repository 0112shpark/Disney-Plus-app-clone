import React from "react";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/request";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

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
            <button className="banner__button play">Play</button>
          )}
        </div>
        <h1 className="banner__description">
          <p>{movie.overview}</p>
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
