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
    <div className="searchWrapper">
      <div className="searchBox">
        <form
          onSubmit={(even) => {
            handleSubmit(even);
          }}
        >
          <div className="flex-icon">
          <input
            className="searchText"
            value={filterSearch}
            type="text"
            onChange={handleFilterInput}
            placeholder="Search for any anime"
          />
          <button style={{ width: "50px" }} className="searchBtn" type="submit">
            <img style={{ width: "20px" }} src={loop} alt="Loop" />
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
