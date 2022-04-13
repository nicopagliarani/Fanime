import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AnimeDetail } from "../context/ListAnimeDetail";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import { ButtonFavorite } from "./ButtonFavorite";
import { Comment } from "./Comment"; 
import '../DetailAnimePage.css'

export function DetailAnimePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, []);

  const { setPopAnime, setShounen, setSeinen, setShoujo, setSports } =
    useContext(AnimeDetail);

  const [singleAnime, setSingleAnime] = useState(null);
  const { id } = useParams();
  const { allAnimes } = useContext(AnimeDetail);

  function choseAnime() {
    const choseTheSingleAnime = allAnimes.filter((el) => {
      console.log(el.id, id);
      return el.id == id;
    });
    setSingleAnime(choseTheSingleAnime[0]);
  }

  const getAllAnimes = async () => {
    const verify = await axios.get(`${API_BASE_URL}/api/verify`);
    const data = verify.data;
    setPopAnime(data.popularityAnime);
    setShounen(data.shounenAnime);
    setSeinen(data.seinenAnime);
    setShoujo(data.shoujoAnime);
    setSports(data.sportsAnime);
  };

  useEffect(() => {
    allAnimes.length > 0 && user ? choseAnime() : getAllAnimes();
  }, [allAnimes]);

  return (
    <>
      {singleAnime ? (
        <div>
          <h1>{singleAnime.attributes.canonicalTitle}</h1>
          <img className="imageDetailAnime"src={singleAnime.attributes.posterImage.large} />
          <p>{singleAnime.attributes.synopsis}</p>
          <p>AverageRating : {singleAnime.attributes.averageRating}/100</p>
          <p>Popularity rank : {singleAnime.attributes.popularityRank}</p>
          <p>First episode came out :{singleAnime.attributes.createdAt}</p>
          <p>last episode came out :{singleAnime.attributes.endDate} </p>
          <ButtonFavorite canonicalTitle={singleAnime.attributes.canonicalTitle} coverImage= {singleAnime.attributes.posterImage.tiny} synopsis={singleAnime.attributes.synopsis} clickHandler={singleAnime}/>
          <Comment animeName={singleAnime.attributes.canonicalTitle}></Comment>
          </div>
      ) : (
        "loading"
      )}
      {console.log("singleAnime =>", singleAnime)}
    </>
  );
}
//add comment just for pushing 1
