import { createContext, useState, useEffect } from "react";

export const AnimeDetail = createContext();

export function ListAnimeWrapper(props) {
  const [popAnime, setPopAnime] = useState([]);
  const [shounen, setShounen] = useState([]);
  const [seinen, setSeinen] = useState([]);
  const [shoujo, setShoujo] = useState([]);
  const [sports, setSports] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isekai, setIsekai] = useState([]);
  const [horror, setHorror] = useState([]);
  const [crime, setCrime] = useState([]);
  const [allAnimes, setAllAnimes] = useState([]);

  useEffect(() => {
    const alltheAnimes = [
      ...popAnime,
      ...shounen,
      ...seinen,
      ...shoujo,
      ...sports,
      ...searchResult,
      ...isekai,
      ...horror,
      ...crime,
    ];
    setAllAnimes(alltheAnimes);
  }, [
    popAnime,
    shounen,
    seinen,
    shoujo,
    sports,
    searchResult,
    isekai,
    horror,
    crime,
  ]);
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
        setIsekai,
        isekai,
        setHorror,
        horror,
        setCrime,
        crime,
      }}
    >
      {props.children}
    </AnimeDetail.Provider>
  );
}
