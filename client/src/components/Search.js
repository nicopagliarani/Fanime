import { useEffect, useState } from "react";
import loop from "../images/searchLoop.png";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useNavigate } from "react-router-dom";

export function Search({ setSearchResult, searchResult }) {
  const [filterSearch, setFilterSearch] = useState("");
  const navigate = useNavigate();
  const handleFilterInput = async (event) => {
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
    <div className="search-box">
      {console.log("search from search.js =>", searchResult)}
      <form
        className="searchBar"
        onSubmit={(even) => {
          handleSubmit(even);
        }}
      >
        <input
          value={filterSearch}
          type="text"
          onChange={handleFilterInput}
          placeholder="Search for any anime"
        />
        <button className="SearchBtn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
