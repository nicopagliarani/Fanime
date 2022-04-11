import axios from "axios";
import { API_BASE_URL } from "../consts";

export function ButtonFavorite({canonicalTitle,coverImage,synopsis}) {
    const clickHandler = async()=> {
        const response = await axios.post(`${API_BASE_URL}/api/saveFavoriteAnime`,{canonicalTitle,coverImage,synopsis});
        const data = response.data;
        console.log(data);}
  return (
    <div>
        <button onClick={()=> clickHandler()}>Add to favorites</button></div>
  )
}







