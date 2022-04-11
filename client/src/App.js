import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Custom404Page } from "./components/Custom404Page";
import { DetailAnimePage } from "./components/DetailAnimePage";
import { FirstPage } from "./components/FirstPage";
import { Home } from "./components/Home";
import { LayoutComponent } from "./components/LayoutComponent";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { SearchResultPage } from "./components/SearchResultPage";
import { SignUp } from "./components/SignUp";
import { AnimeDetail } from "./context/ListAnimeDetail";

function App() {
  const { searchResult } = useContext(AnimeDetail);
  return (
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
          <Route path="*" element={<Custom404Page />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
