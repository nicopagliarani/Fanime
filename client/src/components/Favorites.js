import axios from 'axios'
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../consts";
import '../Favorites.css'

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

  function deleteAnime(id){
    fetch (`${API_BASE_URL}/api/deleteAnime/${id}`,{
      method: 'DELETE'
    }).then((result)=>{
  const filterAnimes = favoriteAnime.filter((a)=>a._id !== id)
  setFavoriteAnime(filterAnimes)
        result.json().then((resp)=>{
          console.warn(resp)

        })

      })
    }

  return (
    <>
      {favoriteAnime.map((element) => {
        return (
          <>
          <div class="d-flex justify-content-center">
            <h3>{element.canonicalTitle}</h3>
            </div>
            <div class="d-flex justify-content-center">
            <img className="imgFavorite"src={element.coverImage} alt="Anime img"></img>
            {/* <p>{element.synopsis}</p> */}
            <button className="bn31" onClick={()=>deleteAnime(element._id)}><span className="bn31span">Delete</span></button>
            </div>
            </>
        );
      })}
      {console.log(favoriteAnime)} 
      
    </>
  );
}
