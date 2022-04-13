import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { AnimeDetail } from "../context/ListAnimeDetail";
import { Search } from "../components/Search";

export function Home() {
  const {
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
    searchResult,
    setSearchResult,
    setIsekai,
    isekai,
    setHorror,
    horror,
    setCrime,
    crime,
  } = useContext(AnimeDetail);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/home`);
        const data = response.data;
        setPopAnime(data.popularityAnime);
        setShounen(data.shounenAnime);
        setSeinen(data.seinenAnime);
        setShoujo(data.shoujoAnime);
        setSports(data.sportsAnime);
        setIsekai(data.isekaiAnime);
        setHorror(data.horrorAnime);
        setCrime(data.crimeAnime);
      } catch (err) {
        console.log("We got an error");
        console.error(err);
        console.log(err.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <Search setSearchResult={setSearchResult} searchResult={searchResult} />

      <h1>Most popular animes</h1>
      <div className="HomeCategories">
        {popAnime.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>

      <h1>Seinen Animes</h1>
      <div className="HomeCategories">
        {seinen.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>

      <h1>Sports Animes</h1>
      <div className="HomeCategories">
        {sports.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>

      <h1>Shoujo Animes</h1>
      <div className="HomeCategories">
        {shoujo.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>

      <h1>Shounen Animes</h1>
      <div className="HomeCategories">
        {shounen.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>

      <h1>Crime</h1>
      <div className="HomeCategories">
        {crime.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>

      <h1>Isekai Animes</h1>
      <div className="HomeCategories">
        {isekai.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>

      <h1>Horror</h1>
      <div className="HomeCategories">
        {horror.map((element) => {
          return (
            <>
              <Link to={`/home/${element.id}`}>
                <img
                  className="singleImg"
                  src={element.attributes.posterImage.tiny}
                  alt="anime img"
                />
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
