import axios from "axios";
import { API_BASE_URL } from "../consts";

export function ButtonFavorite() {
    const clickHandler = async()=> {
        const response = await axios.post(`${API_BASE_URL}/api/saveFavoriteAnime`);
        const data = response.data;
        console.log(data);}
  return (
    <div>
        <button onClick={()=> clickHandler()}>Add to favorites</button></div>
  )
}







