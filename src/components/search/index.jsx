import { useState } from "react";
import "./styles.css";

const Search = (props) => {
  const { getDataFromSearchComponent } = props;

  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        name="search"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="Search recipes"
        id="search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
