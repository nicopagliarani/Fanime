import { createContext, useState } from "react";

export const AnimeDetail = createContext();

export function ListAnimeWrapper(props) {
  const [popAnime, setPopAnime] = useState([]);
  const [shounen, setShounen] = useState([]);
  const [seinen, setSeinen] = useState([]);
  const [shoujo, setShoujo] = useState([]);
  const [sports, setSports] = useState([]);
  const allAnimes = [...popAnime, ...shounen, ...seinen, ...shoujo, ...sports];
  return (
    <AnimeDetail.Provider
      value={{
        popAnime,
        setPopAnime,
        shounen,
        setShounen,
        seinen,
        setSeinen,
        shoujo,
        setShoujo,
        sports,
        setSports,
        allAnimes,
      }}
    >
      {props.children}
    </AnimeDetail.Provider>
  );
}
