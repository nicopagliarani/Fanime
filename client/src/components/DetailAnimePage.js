import { API_BASE_URL } from "../consts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AnimeDetail } from "../context/ListAnimeDetail";

export function DetailAnimePage() {
  const [anime, setAnime] = useState();
  const { id } = useParams();
  const { allAnimes } = useContext(AnimeDetail);

  useEffect(() => {
    const choseTheSingleAnime = allAnimes.filter((el) => {
      console.log(el.id, id);
      return el.id == id;
    });
    setAnime(choseTheSingleAnime[0]);
  }, []);

  return (
    <>
      <img src={anime.attributes.posterImage.tiny} />
      {console.log(anime, "anime")}
    </>
  );
}
