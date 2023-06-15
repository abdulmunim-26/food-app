import "./styles.css";

const RecipeItem = (props) => {
  const { id, image, title } = props;

  console.log(props, "recipe-item");
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>
      <button>Add to Favorites</button>
    </div>
  );
};
export default RecipeItem;
