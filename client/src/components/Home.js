import axios from "axios";
import { API_BASE_URL } from "../consts";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [anime, setAnime] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/home`);
        const data = response.data;
        setAnime(data.animesData);
      } catch (err) {
        console.log(err.response.data);
        if (err.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <>
      {anime.map((element) => {
        return <h1>{element.attributes.canonicalTitle}</h1>;
      })}
      {console.log(anime)}
    </>
  );
}
