import axios from 'axios'
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../consts";

export function Favorites() {
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  useEffect(() => {
    const getFavoriteAnime = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/saveFavoriteAnime`);
        const data = response.data;
        setFavoriteAnime(data);
      } catch (err) {
        console.log("We got an error");
        console.error(err);
        console.log(err.response.data);
      }
    };
    getFavoriteAnime();
  }, []);

  return (
    <>
      {favoriteAnime.map((element) => {
        return (
          <>
            <h3>{element.attributes.canonicalTitle}</h3>
            <img src={element.attributes.coverImage} alt="anime img" />
            <p>{element.attributes.synopsis}</p>
            {/* <button onClick={()=> clickHandler(element)}>Add to favorites</button> */}
            </>
        );
      })}
      {console.log(favoriteAnime)}
    </>
  );
}
