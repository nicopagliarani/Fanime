import axios from "axios";

export function DetailAnimeForSearch() {
  const [id, setId] = useState([]);
  const FetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/apiSearchResult/${id}`);
  };
}
