import "./styles.css";

const FavoriteItem = (props) => {
  const { id, image, title, removeFromFavorites } = props;

  console.log(props, "favorite-item");
  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>
      <p>{title}</p>
      <button type="button" onClick={removeFromFavorites}>Remove from Favorites</button>
    </div>
  );
};
export default FavoriteItem;
