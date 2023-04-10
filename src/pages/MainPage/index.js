import React, { useEffect, useState } from "react";
import requests from "../../api/request";
import Banner from "../../components/Banner";
import Category from "../../components/Category";
import Nav from "../../components/Nav";
import Row from "../../components/Row";
import styled from "styled-components";
import axios from "axios";

const MainPage = () => {
  // useEffect(
  //   () =>
  //     async function () {
  //       const response = await fetch(
  //         "http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=VWVz5AVsiy%2F0nCNOXrxaxJy5b7pzOz3GyOBxO3T8av6rb9xuOhTZpv50%2BbrWeqaaok0Nk77O%2B%2F8wCWW4MPJLNA%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json"
  //       );
  //       const val = await JSON.parse(response);
  //       console.log("response: ", val);
  //     },
  //   []
  // );
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);
  // const [item, setitem] = useState([]);

  // useEffect(() => {
  //   window
  //     .fetch(
  //       "http://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=VWVz5AVsiy%2F0nCNOXrxaxJy5b7pzOz3GyOBxO3T8av6rb9xuOhTZpv50%2BbrWeqaaok0Nk77O%2B%2F8wCWW4MPJLNA%3D%3D&listYN=Y&arrange=A&areaCode=&sigunguCode=&cat1=&cat2=&cat3=&keyword=궁&_type=json"
  //     )
  //     .then((res) => res.json())
  //     .then((user) => {
  //       setUser(user);
  //       setLoading(false);
  //       const { response } = user;
  //       const { body } = response;
  //       const { items } = body;
  //       const { item } = items;
  //       setitem(item);
  //       console.log("item", item);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //       console.error(error);
  //     });
  // }, []);
  // useEffect(() => {
  //   window
  //     .fetch(
  //       "http://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=VWVz5AVsiy%2F0nCNOXrxaxJy5b7pzOz3GyOBxO3T8av6rb9xuOhTZpv50%2BbrWeqaaok0Nk77O%2B%2F8wCWW4MPJLNA%3D%3D&contentTypeId=39&contentId=2868904&MobileOS=ETC&MobileApp=AppTest&_type=json"
  //     )
  //     .then((res) => res.json())
  //     .then((loading) => {
  //       setUser(loading);
  //       setLoading(false);
  //       // const { response } = loading;
  //       // const { body } = response;
  //       console.log(loading);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div className="App">
      <Container>
        <Nav />
        <Banner />
        <Category />
        <Row
          title="Trending Now"
          id="TN"
          fetchUrl={requests.fetchTrending}
          index="0"
        ></Row>
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
        <Row
          title="Action Movies"
          id="AM"
          fetchUrl={requests.fetchActionMovies}
          index="1000"
        ></Row>
        <Row
          title="Comedy Movies"
          id="CM"
          fetchUrl={requests.fetchComedyMovies}
          index="2000"
        ></Row>
      </Container>
    </div>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &::after {
    background: url(/images/home-background.png) center center / cover no-repeat
      fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
