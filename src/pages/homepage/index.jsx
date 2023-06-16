import { useEffect, useReducer, useState } from "react";
import Search from "../../components/search";
import "./styles.css";
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite-item";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      console.log(action);
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);
  //saving state
  const [recipes, setRecipes] = useState([]);
  //favorites data state
  const [favorites, setFavorites] = useState([]);
  //state for api is successful or not
  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const getDataFromSearchComponent = (getData) => {
    setLoadingState(true);
    //console.log(getData, "getting data");

    //calling api
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=ffea49e9d8d0466eb5d8e83206832d5c&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;
      if (results && results.length > 0) {
        //set the loading state as false again
        //set the recipes state
        setLoadingState(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }
      console.log(result);
    }
    getRecipes();
  };
  //console.log(loadingState, recipes, "loading state, recipes");

  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];

    const index = copyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    console.log(index);
    if (index === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      //save the favorites in local storage
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    } else {
      alert("Item is already present in favorites.");
    }
  };

  const removeFromFavorites = (getCurrentId) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  useEffect(() => {
    console.log("runs only once on page load");
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    console.log(extractFavoritesFromLocalStorageOnPageLoad);
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  //console.log(filteredState, 'filtered States');

  //filter the favorites

  const filteredFavoritesItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />

      {/* show loading state */}

      {/* show favorites item */}
      <div className="favorites-wrapper">
        <h1 className="favorites-title">Favorites</h1>
        <div className="search-favorites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavorites", value: event.target.value })
            }
            value={filteredState.filteredValue}
            name="searchfavorites"
            placeholder="Search Favorites"
          />
        </div>
        <div className="favorites">
          {filteredFavoritesItems && filteredFavoritesItems.length > 0
            ? filteredFavoritesItems.map((item) => (
                <FavoriteItem
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>

      {loadingState && (
        <div className="loading">Loading recipes please wait!</div>
      )}
      {/* show loading state */}
      {/* map recipes */}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
      {/* map recipes */}
    </div>
  );
};

export default Homepage;
