import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AnimeDetail } from "../context/ListAnimeDetail";

export function DetailAnimePage() {
  const [singleAnime, setSingleAnime] = useState([]);
  const { id } = useParams();
  const { allAnimes } = useContext(AnimeDetail);
  console.log("allanimes =>", allAnimes);

  useEffect(() => {
    const choseTheSingleAnime = allAnimes.filter((el) => {
      console.log(el.id, id);
      return el.id === id;
    });
    setSingleAnime(choseTheSingleAnime[0]);
    // console.log("whats inside anime ==>", singleAnime);
  }, []);

  return (
    <>
      <h1>{singleAnime.attributes.canonicalTitle}</h1>
      <img src={singleAnime.attributes.posterImage.tiny} />
      <p>{singleAnime.attributes.synopsis}</p>
      <p>AverageRating : {singleAnime.attributes.averageRating}/100</p>
      <p>Popularity rank : {singleAnime.attributes.popularityRank}</p>
      <p>First episode came out :{singleAnime.attributes.createdAt}</p>
      <p>last episode came out :{singleAnime.attributes.endDate} </p>
      {console.log("anime =>", singleAnime)}
    </>
  );
}
