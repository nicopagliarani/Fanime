import { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimeDetail } from "../context/ListAnimeDetail";
import { Search } from "./Search";

export function SearchResultPage() {
  const { searchResult, setSearchResult } = useContext(AnimeDetail);
  return (
    <div className="SearchResultPage">
      <Search setSearchResult={setSearchResult} searchResult={searchResult} />
      {searchResult.length > 0 ? (
        searchResult.map((element) => {
          return (
            <div className="SearchResult">
              <Link to={`/home/${element.id}`}>
                <img
                  src={element.attributes.posterImage.small}
                  alt={element.attributes.canonicalTitle}
                />
                <h1>{element.attributes.canonicalTitle}</h1>
                <p>
                  <br />
                  <br />
                  <br />

                  {element.attributes.synopsis}
                </p>
              </Link>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
