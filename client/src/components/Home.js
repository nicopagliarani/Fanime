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

  const [isMouseOver, setIsMouseOver] = useState(false);
  const onMouseHover = () => {
    setIsMouseOver(true);
  };
  const onMouseOut = () => {
    setIsMouseOver(false);
  };
  return user ? (
    <div>
      <div className="HomePage">
        <Search setSearchResult={setSearchResult} searchResult={searchResult} />

        {/* {setSearchResult.filter((el) => {
        return el.attributes.canonicalTitle.include(filterSearch);
      })} */}
        <h1>Most popular anime</h1>
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
        <h1>Seinen Anime</h1>
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
        <h1>Sports Anime</h1>
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

        <h1>Shoujo Anime</h1>
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
        <h1>Shounen Anime</h1>
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
      </div>
      <div className="footerWrapper">
        <div
          onMouseOver={onMouseHover}
          onMouseOut={onMouseOut}
          className="SocialMediaBtn"
        >
          <img src={youtube} />
          {isMouseOver && <p>Youtube</p>}
        </div>

        <div
          onMouseOver={onMouseHover}
          onMouseOut={onMouseOut}
          className="SocialMediaBtn"
        >
          <img src={facebook} />
          {isMouseOver && <p>facebook</p>}
        </div>

        <div
          onMouseOver={onMouseHover}
          onMouseOut={onMouseOut}
          className="SocialMediaBtn"
        >
          <img src={twitter} />
          {isMouseOver && <p>twitter</p>}
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
