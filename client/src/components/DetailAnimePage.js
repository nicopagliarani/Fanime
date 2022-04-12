import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AnimeDetail } from "../context/ListAnimeDetail";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import { ButtonFavorite } from "./ButtonFavorite";

export function DetailAnimePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, []);
  const { id } = useParams();

  const [singleAnime, setSingleAnime] = useState(null);
  // const { id } = useParams();
  const { allAnimes } = useContext(AnimeDetail);

  function choseAnime() {
    const choseTheSingleAnime = allAnimes.filter((el) => {
      console.log(el.id, id);
      return el.id == id;
    });
    setSingleAnime(choseTheSingleAnime[0]);
  }

  // useEffect(() => {
  //   allAnimes.length > 0 && user ? choseAnime() : getAllAnimes();
  // }, [allAnimes]);
  useEffect(() => {
    choseAnime();
  }, []);
  return (
    <>
      {console.log(singleAnime)}
      {singleAnime ? (
        <div>
          <h1>{singleAnime.attributes.canonicalTitle}</h1>
          <img src={singleAnime.attributes.posterImage.medium} />

          <p>{singleAnime.attributes.synopsis}</p>
          <p>AverageRating : {singleAnime.attributes.averageRating}/100</p>
          <p>Popularity rank : {singleAnime.attributes.popularityRank}</p>
          <p>First episode came out :{singleAnime.attributes.createdAt}</p>
          <p>last episode came out :{singleAnime.attributes.endDate} </p>
          <ButtonFavorite
            canonicalTitle={singleAnime.attributes.canonicalTitle}
            coverImage={singleAnime.attributes.posterImage.tiny}
            synopsis={singleAnime.attributes.synopsis}
            clickHandler={singleAnime}
          />
        </div>
      ) : (
        "loading"
      )}
      {console.log("singleAnime =>", singleAnime)}
    </>
  );
}
//add comment just for pushing 1
