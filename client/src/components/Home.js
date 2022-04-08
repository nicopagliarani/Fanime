import axios from "axios";
import { API_BASE_URL } from "../consts";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Home() {
  const [anime, setAnime] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/home`);
        const data = response.data;
        setAnime(data.animesData);
      } catch (err) {
        console.log("We got an error");
        console.error(err);
        console.log(err.response.data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {anime.map((element) => {
        return (
          <>
            <h3>{element.attributes.canonicalTitle}</h3>
            <img src={element.attributes.posterImage.tiny} alt="anime img" />
          </>
        );
      })}
      {console.log(anime)}
    </>
  );
}
