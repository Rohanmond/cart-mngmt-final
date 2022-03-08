import { useLayoutEffect, useState } from "react";
import { useCartData } from "./CreateContext";

const Product = ({ el, addToCartHandler }) => {
  const { name, image, price, rating, size, category } = el;
  const [showAdd, setShowAdd] = useState(true);
  const { cartData } = useCartData();

  useLayoutEffect(() => {
    cartData.find((it) => it.product_id === el.id)
      ? setShowAdd(false)
      : setShowAdd(true);
  }, []);
  return (
    <div className="card-container card-container-shadow productlist-card brd-rd-semi-sq">
      <div className="card-img-container">
        <img
          className="card-img productlist-card-img"
          src={image}
          alt="card "
        />
        <button className="card-img-tag-btn productlist-card-img-tag-btn">
          <span className="material-icons">favorite_border</span>
        </button>
      </div>
      <div className="card-content">
        <div className="card-sub-text">
          <div>{rating}</div>
          <div>{category}</div>
          <div>{size}</div>
        </div>
        <div className="card-text">
          <div>{name}</div>
          <div className="card-subtitle">{price}</div>
        </div>

        <div className="card-footer-elements">
          <button
            onClick={() => addToCartHandler(el, showAdd) && setShowAdd(false)}
            className={`btn btn-primary brd-rd-semi-sq ${
              showAdd ? "background-primary" : "background-success"
            }`}
          >
            {showAdd ? "Add to cart" : "Go to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
