import { Divider, Input } from "antd";
import loop from "../images/searchLoop.png";

export function Search() {
  return (
    <div className="searchBarDiv">
      <label>
        <img src={loop} />
      </label>
      <Input
        className="searchBar"
        value={undefined}
        type="text"
        onChange={() => {}}
      />
    </div>
  );
}
