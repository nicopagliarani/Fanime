import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AnimeDetail } from "../context/ListAnimeDetail";
import { AuthContext } from "../context/AuthProviderWrapper";
import { ButtonFavorite } from "./ButtonFavorite";
import { Comment } from "./Comment";
import { API_BASE_URL } from "../consts";
import "../Css/DetailAnimePage.css";
import axios from "axios";


export function DetailAnimePage() {
  const navigate = useNavigate();
  const { user,addUserToContext } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      
      const stayLogin = async()=>{ 
        const userFromSession = await axios.get(`${API_BASE_URL}/api/verify`); 
      if(!userFromSession.data) {
        navigate("/login");
      }else{
        addUserToContext(userFromSession.data.user)
      }
      }
      stayLogin();
    }
  }, []);
  const { id } = useParams();

  const [singleAnime, setSingleAnime] = useState(null);
  const { allAnimes } = useContext(AnimeDetail);

  function choseAnime() {
    const choseTheSingleAnime = allAnimes.filter((el) => {
      console.log(el.id, id);
      return el.id == id;
    });
    setSingleAnime(choseTheSingleAnime[0]);
  }

  useEffect(() => {
    choseAnime();
  }, []);
  return ( user ? (
    <>
      {console.log(singleAnime)}
      {singleAnime ? (
        <div>
          <div className="center-detail-anime">
          <h1>{singleAnime.attributes.canonicalTitle}</h1>
          <h2>Popularity rank : {singleAnime.attributes.popularityRank}</h2>
          <div className="flex-detail-anime">
          <img className="imageDetailAnime "
            src={singleAnime.attributes.posterImage.medium}
            alt={singleAnime.attributes.canonicalTitle}
          />
          <ul>
          <li>AverageRating : {singleAnime.attributes.averageRating}/100</li>
          <li>First episode came out :{singleAnime.attributes.createdAt}</li>
          <li>last episode came out :{singleAnime.attributes.endDate} </li>
          </ul>
          <ButtonFavorite
            canonicalTitle={singleAnime.attributes.canonicalTitle}
            coverImage={singleAnime.attributes.posterImage.tiny}
            synopsis={singleAnime.attributes.synopsis}
            clickHandler={singleAnime}
          />
        </div>
          </div>
          
          <p>{singleAnime.attributes.synopsis}</p>
          
          <Comment animeName={singleAnime.attributes.canonicalTitle}></Comment>
          
        </div>
      ) : (
        "loading"
      )}
      {console.log("singleAnime =>", singleAnime)}
    </>) : <p>Loading</p>
  );
}
//add comment just for pushing
