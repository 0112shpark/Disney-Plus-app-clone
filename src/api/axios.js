import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.themoviedb.org/3",
  params: {
    api_key: "ba91f010a505f42cd9a49d5fa2678ba7",
    language: "ko-KR",
  },
});

export default instance;
