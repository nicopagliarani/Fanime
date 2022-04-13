import { useEffect, useState } from "react";
import loop from "../images/searchLoop.png";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { useNavigate } from "react-router-dom";
import "../Css/Search.css";

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
    setSearchResult(response.data);
    navigate("/home/SearchResult");
  };
  useEffect(() => {});
  return (
    <div className="search-box">
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
        <button className="button-search" type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
