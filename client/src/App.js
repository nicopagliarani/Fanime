import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Custom404Page } from "./components/Custom404Page";
import { Favorites } from "./components/Favorites";
import { DetailAnimePage } from "./components/DetailAnimePage";
import { FirstPage } from "./components/FirstPage";
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

function App() {
  const {
    searchResult,
    setPopAnime,
    setShounen,
    setSeinen,
    setShoujo,
    setSports,
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
  };
  const navigate = useNavigate();
  const checkUser = "";
  return (
    <>
      {/* {user != undefined ? ( */}
      <div className="App">
        <Routes>
          <Route element={<LayoutComponent />}>
            <Route path="/" element={<FirstPage />} />
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
      {/*  ) : (
        (checkUser = verify()(checkUser.data.user)
          ? (getAllAnimes(), addUserToContext(checkUser.data.user))
          : navigate("/login"))
      )} */}
    </>
  );
}

export default App;
