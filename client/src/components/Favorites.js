import axios from 'axios'
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../consts";

export function Favorites() {
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  useEffect(() => {
    const getFavoriteAnime = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/showfavoriteAnimes`);
        const data = response.data;
        // console.log(data);
        setFavoriteAnime(data.showFavorites);
        // console.log(data.showFavorites)
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
            <h3>{element.data}</h3>
            {/* <button onClick={()=> clickHandler(element)}>Add to favorites</button> */}
            </>
        );
      })}
      {console.log(favoriteAnime)} 
      
    </>
  );
}
