export function SearchResultPage({ searchResult }) {
  return (
    <div>
      {searchResult.length > 0 ? (
        searchResult.map((el) => {
          return <h1>{el.attributes.canonicalTitle}</h1>;
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
