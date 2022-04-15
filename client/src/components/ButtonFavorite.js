import axios from "axios";
import { API_BASE_URL } from "../consts";
import "../Css/DetailAnimePage.css";

export function ButtonFavorite({ canonicalTitle, coverImage, synopsis }) {
  const clickHandler = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/saveFavoriteAnime`, {
      canonicalTitle,
      coverImage,
      synopsis,
    });
    const data = response.data;
    console.log(data);
  };
  return (
    <div>
      <button className="BtnFav" onClick={() => clickHandler()}>
        <span className="BtnFavSpan">Favorites</span>
      </button>
    </div>
  );
}
