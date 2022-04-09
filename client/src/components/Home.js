import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { AnimeDetail } from "../context/ListAnimeDetail";

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
  return (
    <>
      <h1>Most popular anime</h1>
      {popAnime.map((element) => {
        return (
          <>
            <h3>
              <Link to={`/home/${element.id}`}>
                {element.attributes.canonicalTitle}
              </Link>
            </h3>
            <img src={element.attributes.posterImage.tiny} alt="anime img" />
          </>
        );
      })}
      <h1>Seinen Anime</h1>
      {seinen.map((element) => {
        return (
          <>
            <h3>{element.attributes.canonicalTitle}</h3>
            <img src={element.attributes.posterImage.tiny} alt="anime img" />
          </>
        );
      })}
      <h1>Sports Anime</h1>
      {sports.map((element) => {
        return (
          <>
            <h3>{element.attributes.canonicalTitle}</h3>
            <img src={element.attributes.posterImage.tiny} alt="anime img" />
          </>
        );
      })}
      <h1>Shoujo Anime</h1>
      {shoujo.map((element) => {
        return (
          <>
            <h3>{element.attributes.canonicalTitle}</h3>
            <img src={element.attributes.posterImage.tiny} alt="anime img" />
          </>
        );
      })}
      <h1>Shounen Anime</h1>
      {shounen.map((element) => {
        return (
          <>
            <h3>{element.attributes.canonicalTitle}</h3>
            <img src={element.attributes.posterImage.tiny} alt="anime img" />
          </>
        );
      })}
    </>
  );
}
