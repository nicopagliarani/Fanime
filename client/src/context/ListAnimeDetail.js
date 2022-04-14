import { createContext, useState, useEffect } from "react";

export const AnimeDetail = createContext();

export function ListAnimeWrapper(props) {
  const [popAnime, setPopAnime] = useState([]);
  const [shounen, setShounen] = useState([]);
  const [seinen, setSeinen] = useState([]);
  const [shoujo, setShoujo] = useState([]);
  const [sports, setSports] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [allAnimes, setAllAnimes] = useState([]);
  let alltheAnimes = [
    ...popAnime,
    ...shounen,
    ...seinen,
    ...shoujo,
    ...sports,
    ...searchResult,
  ];
  useEffect(()=> {
    alltheAnimes = [
      ...popAnime,
      ...shounen,
      ...seinen,
      ...shoujo,
      ...sports,
      ...searchResult,
    ];
    setAllAnimes(alltheAnimes)
  },[popAnime])
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
        setSearchResult,
        searchResult,
      }}
    >
      {props.children}
    </AnimeDetail.Provider>
  );
}
