import axios from "axios";
import { API_BASE_URL } from "../consts";
import React, { useEffect, useState } from "react";

export function Home() {
  const [anime, setAnime] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/home`);
    const data = response.data;
    setAnime(data.animesData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {anime.map((element) => {
        return <h1>{element.attributes.canonicalTitle}</h1>;
      })}
      {console.log(anime)}
    </>
  );
}
