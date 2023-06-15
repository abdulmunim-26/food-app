import { useState } from "react";
import Search from "../../components/search";
import "./styles.css";
import RecipeItem from "../../components/recipe-item";

const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);
  //saving state
  const [recipes, setRecipes] = useState([]);

  const getDataFromSearchComponent = (getData) => {
    setLoadingState(true);
    console.log(getData, "getting data");

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
      }
      console.log(result);
    }
    getRecipes();
  };
  console.log(loadingState, recipes, "loading state, recipes");

  return (
    <div className="homepage">
      <Search getDataFromSearchComponent={getDataFromSearchComponent} />

      {/* show loading state */}

      {loadingState && (
        <div className="loading">Loading recipes please wait!</div>
      )}

      {/* show loading state */}
      {/* map recipes */}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => <RecipeItem id={item.id} image={item.image} title={item.title} />)
          : null}
      </div>

      {/* map recipes */}
    </div>
  );
};

export default Homepage;
