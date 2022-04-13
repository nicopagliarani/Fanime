import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import "../Css/Favorites.css";
import { AuthContext } from "../context/AuthProviderWrapper";
import { Link} from "react-router-dom";

export function Favorites() {
  const navigate = useNavigate();
  const { user,addUserToContext } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      
      const stayLogin = async()=>{ 
        const userFromSession = await axios.get(`${API_BASE_URL}/api/verify`); 
      if(!userFromSession.data) {console.log(userFromSession.data);
        navigate("/login");
      }else{
        addUserToContext(userFromSession.data.user)
      }
      }
      stayLogin();
    }
  }, []); 
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  useEffect(() => {
    const getFavoriteAnime = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/showfavoriteAnimes`
        );
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

  function deleteAnime(id) {
    fetch(`${API_BASE_URL}/api/deleteAnime/${id}`, {
      method: "DELETE",
    }).then((result) => {
      const filterAnimes = favoriteAnime.filter((a) => a._id !== id);
      setFavoriteAnime(filterAnimes);
      result.json().then((resp) => {
        console.warn(resp);
      });
    });
  }

  return ( user ? (
    <>
      {favoriteAnime.map((element) => {
        return (
          <div className="favorite">
          <h1>{element.canonicalTitle}</h1>
            <div className="flex-favorite">
        <img className="imgFavorite"src={element.coverImage} alt="Anime img"></img>
            <button className="bn31" onClick={()=>deleteAnime(element._id)}><span className="bn31span">Delete</span></button>
            </div>
            </div>
        );
      })}
      {console.log(favoriteAnime)}
    </>): <p>Loading</p>
  );
}
