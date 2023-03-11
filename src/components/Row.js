import axios from "../api/axios";
import React from "react";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import "./Row.css";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  // usecallback 을 사용해 fetchUrl의 값이 변하지 않았으면
  // 함수 재 생성X
  const fetchMovieDate = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieDate();
  }, [fetchMovieDate]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>

        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name}
            ></img>
          ))}
          <div className="slider__arrow-right">
            <span
              className="arrow"
              onClick={() => {
                document.getElementById(id).scrollLeft +=
                  window.innerWidth - 80;
              }}
            >
              {">"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
