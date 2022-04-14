import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Css/App.css";
import { Custom404Page } from "./components/Custom404Page";
import { Favorites } from "./components/Favorites";
import { DetailAnimePage } from "./components/DetailAnimePage";
import { Home } from "./components/Home";
import { LayoutComponent } from "./components/LayoutComponent";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { SearchResultPage } from "./components/SearchResultPage";
import { SignUp } from "./components/SignUp";
import { AnimeDetail } from "./context/ListAnimeDetail";
import { AuthContext } from "./context/AuthProviderWrapper";
import { API_BASE_URL } from "./consts";
import axios from "axios";
import { Comment } from "./components/Comment";

function App() {
  const {
    searchResult,
    setPopAnime,
    setShounen,
    setSeinen,
    setShoujo,
    setSports,
    setIsekai,
    setHorror,
    setCrime,

  } = useContext(AnimeDetail);
  const { user, addUserToContext } = useContext(AuthContext);
  const verify = async () => {
    const stayLogin = await axios.get(`${API_BASE_URL}/api/verify`);
    return stayLogin;
  };
  const getAllAnimes = async () => {
    const data = verify.data;
    setPopAnime(data.popularityAnime);
    setShounen(data.shounenAnime);
    setSeinen(data.seinenAnime);
    setShoujo(data.shoujoAnime);
    setSports(data.sportsAnime);
    setIsekai(data.setIseaki);
    setHorror(data.setHorror);
    setCrime(data.setCrime);
  };
  const navigate = useNavigate();
  const checkUser = "";
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Login />} />
          <Route path="/home">
            <Route index element={<Home />} />
            <Route path=":id" element={<DetailAnimePage />} />
            <Route
              path="SearchResult"
              element={<SearchResultPage searchResult={searchResult} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/showfavoriteAnimes" element={<Favorites />} />
          <Route path="*" element={<Custom404Page />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
