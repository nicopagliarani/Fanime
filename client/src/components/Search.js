import { Input } from "antd";
import { useEffect, useState } from "react";
import loop from "../images/searchLoop.png";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useNavigate } from "react-router-dom";

export function Search({ setSearchResult, searchResult }) {
  const [filterSearch, setFilterSearch] = useState("");
  const navigate = useNavigate();
  // const { searchResult, setSearchResult } = useContext(AnimeDetail);
  const handleFilterInput = async (event) => {
    // const response = await axios.get(`${API_BASE_URL}/api/search`, {
    //   params: { search: event.target.value },
    // });
    setFilterSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `${API_BASE_URL}/api/search/${filterSearch}`
    );
    console.log("=> reponse :", response.data);
    setSearchResult(response.data);
    navigate("/home/SearchResult");
  };
  useEffect(() => {});
  return (
    <div className="searchBarDiv">
      {/* <label>
        <img src={loop} />
      </label> */}
      {console.log("search from search.js =>", searchResult)}
      <form
        onSubmit={(even) => {
          handleSubmit(even);
        }}
      >
        <Input
          className="searchBar"
          value={filterSearch}
          type="text"
          onChange={handleFilterInput}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
