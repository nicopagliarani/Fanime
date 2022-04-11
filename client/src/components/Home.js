import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { ButtonFavorite } from "./ButtonFavorite";


import { AnimeDetail } from "../context/ListAnimeDetail";
import { Search } from "../components/Search";

export function Home() {
  // const [popAnime, setPopAnime] = useState([]);
  // const [shounen, setShounen] = useState([]);
  // const [seinen, setSeinen] = useState([]);
  // const [shoujo, setShoujo] = useState([]);
  // const [sports, setSports] = useState([]);
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
  } = useContext(AnimeDetail);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
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
      } catch (err) {
        console.log("We got an error");
        console.error(err);
        console.log(err.response.data);
      }
    };
    fetchData();
  }, []);

//   const clickHandler = async(element)=> {
//     const response = await axios.post(`${API_BASE_URL}/api/saveFavoriteAnime`, element);
//     const data = response.data;
//     console.log(data);
// }

  return (
    <div className="HomePage">
      <Search></Search>
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
    </div>
  );
}
