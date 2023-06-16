import "./styles.css";

const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;

  console.log(props, "recipe-item");
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>
      <button type="button" onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};
export default RecipeItem;
