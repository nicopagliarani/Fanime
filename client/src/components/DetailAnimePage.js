import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AnimeDetail } from "../context/ListAnimeDetail";
import { AuthContext } from "../context/AuthProviderWrapper";
import { ButtonFavorite } from "./ButtonFavorite";
import { Comment } from "./Comment";
import "../Css/DetailAnimePage.css";

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
  return (
    <>
      {console.log(singleAnime)}
      {singleAnime ? (
        <div>
          <div className="center-detail-anime">
          <h1>{singleAnime.attributes.canonicalTitle}</h1>
          
          <p>AverageRating : {singleAnime.attributes.averageRating}/100</p>
          <p>Popularity rank : {singleAnime.attributes.popularityRank}</p>
          <p>First episode came out :{singleAnime.attributes.createdAt}</p>
          <p>last episode came out :{singleAnime.attributes.endDate} </p>
          <div className="flex-detail-anime">
          <img className="imageDetailAnime "
            src={singleAnime.attributes.posterImage.medium}
            alt={singleAnime.attributes.canonicalTitle}
          />
          <ButtonFavorite
            canonicalTitle={singleAnime.attributes.canonicalTitle}
            coverImage={singleAnime.attributes.posterImage.tiny}
            synopsis={singleAnime.attributes.synopsis}
            clickHandler={singleAnime}
          />
          </div>
          
          <p>{singleAnime.attributes.synopsis}</p>
          <Comment animeName={singleAnime.attributes.canonicalTitle}></Comment>
          </div>
        </div>
      ) : (
        "loading"
      )}
      {console.log("singleAnime =>", singleAnime)}
    </>
  );
}
//add comment just for pushing
