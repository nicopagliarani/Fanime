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
      return el.id === id;
    });
    setSingleAnime(choseTheSingleAnime[0]);
    // console.log("whats inside anime ==>", singleAnime);
  }, []);

  return (
    <>
      <img src={singleAnime.attributes.posterImage.tiny} />
      {console.log("anime =>", singleAnime)}
    </>
  );
}
