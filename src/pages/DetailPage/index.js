import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./DetailPage.css";
import styled from "styled-components";

const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`movie/${movieId}`);

        setMovie(response.data);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, [movieId]);

  if (!movie || error)
    return (
      <section>
        <ButtonContainer>
          <button
            className="list_back"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back to List
          </button>
        </ButtonContainer>
        <span className="error">
          <p>Movie Detail Not found.</p>
        </span>
      </section>
    );
  return (
    <section>
      <ButtonContainer>
        <button
          className="list_back"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back to List
        </button>
      </ButtonContainer>
      <div className="wrapper">
        <img
          className="modal__poster-img"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="img"
        />
        <div className="modal__contents">
          <p className="modal__details">
            <span className="release_date">
              Release Date:{" "}
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </span>
          </p>
          <h2 className="modal__title">
            {movie.title ? movie.title : movie.name}
          </h2>
          <p className="modal__overview">평점: {movie.vote_average}</p>
          <p className="modal__overview">{movie.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
`;
