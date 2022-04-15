import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { AnimeDetail } from "../context/ListAnimeDetail";
import { Search } from "../components/Search";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import youtube from "../images/youtube.png";
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
  const { user, addUserToContext } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      const stayLogin = async () => {
        const userFromSession = await axios.get(`${API_BASE_URL}/api/verify`);
        if (!userFromSession.data) {
          navigate("/login");
        } else {
          addUserToContext(userFromSession.data.user);
        }
      };
      stayLogin();
    }
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

  const toLink = (element) => {
    return (
      <Link key={element.id} to={`/home/${element.id}`}>
        <img
          className="singleImg"
          src={element.attributes.posterImage.tiny}
          alt="anime img"
        />
      </Link>
    );
  };

  return user ? (
    <div>
      <div className="HomePage">
        <Search setSearchResult={setSearchResult} searchResult={searchResult} />
        <h1>Most popular animes</h1>
        <div className="HomeCategories">{popAnime.map(toLink)}</div>
        <h1>Seinen</h1>
        <div className="HomeCategories">{seinen.map(toLink)}</div>
        <h1>Sports</h1>
        <div className="HomeCategories">{sports.map(toLink)}</div>

        <h1>Isekai</h1>
        <div className="HomeCategories">{isekai.map(toLink)}</div>

        <h1>Shoujo</h1>
        <div className="HomeCategories">{shoujo.map(toLink)}</div>
        <h1>Shounen</h1>
        <div className="HomeCategories">{shounen.map(toLink)}</div>

        <h1>Horror</h1>
        <div className="HomeCategories">{horror.map(toLink)}</div>

        <h1>Crime</h1>
        <div className="HomeCategories">{crime.map(toLink)}</div>
      </div>
      <div className="footerWrapper">
        <div className="SocialMediaBtn">
          <img src={youtube} />
          <p>Youtube</p>
        </div>

        <div className="SocialMediaBtn">
          <img src={facebook} />
          <p>facebook</p>
        </div>

        <div className="SocialMediaBtn">
          <img src={twitter} />
          <p>twitter</p>
        </div>
      </div>
      <p
        style={{
          paddingTop: "5px",
          paddingBottom: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Made by Adryan & Nicolò
      </p>
    </div>
  ) : (
    <p>Loading</p>
  );
}
