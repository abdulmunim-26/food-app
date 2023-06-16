import { useEffect, useState } from "react";
import "./styles.css";

const Search = (props) => {
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } = props;

  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(()=> {
    if(apiCalledSuccess){
      setInputValue('')
      setApiCalledSuccess(false)
    }
  },[apiCalledSuccess])

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
