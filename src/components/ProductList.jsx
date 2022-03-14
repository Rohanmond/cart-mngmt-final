import { useState } from "react";
import { useProductData } from "./CreateContext";
import {
  priceRange,
  categoryFilter,
  sortByPrice,
  sizeFilter,
  ratingFilter
} from "./utils";
import Product from "./Product";

const ProductList = ({ addToCartHandler }) => {
  const { data } = useProductData();
  const { state, dispatch } = useProductData();

  const filterFunc = () => {
    let newData = [...data];
    newData = priceRange(newData, state.filter.maxPrice);
    newData = categoryFilter(newData, state.filter.category);
    newData = sortByPrice(newData, state.filter.sortByPrice);
    newData = sizeFilter(newData, state.filter.size);
    newData = ratingFilter(newData, state.filter.rating);

    console.log("filter", newData);
    return newData;
  };
  const filteredData = filterFunc();
  return (
    <div className="productlist-content">
      <aside className="productlist-aside nav-desktop">
        <div className="productlist-aside-header">
          <p className="font-wt-bold">Filters</p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch({ type: "clearFilter" });
            }}
          >
            Clear
          </p>
        </div>
        <div className="productlist-aside-item">
          <p className="font-wt-bold">Price</p>
          <div className="productlist-slider-label">
            <p className="text-secondary-color">0</p>
            <p className="text-secondary-color">500</p>
            <p className="text-secondary-color">1000</p>
          </div>
          <div className="productlist-input-container">
            <input
              type="range"
              name="rangeInput"
              className="slider"
              min="0"
              max="999"
              value={state.filter.maxPrice}
              onChange={(e) => {
                dispatch({
                  type: "filter",
                  payload: ["maxPrice", e.target.value]
                });
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="productlist-aside-item">
          <p className="font-wt-bold">Category</p>
          <div className="productlist-input-container">
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="men-checkbox"
                checked={state.filter.category.men}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "category",
                      {
                        ...state.filter.category,
                        men: !state.filter.category.men
                      }
                    ]
                  })
                }
              />
              <label for="men-checkbox">Men</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="women-checkbox"
                value="women"
                checked={state.filter.category.women}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "category",
                      {
                        ...state.filter.category,
                        women: !state.filter.category.women
                      }
                    ]
                  })
                }
              />
              <label for="women-checkbox">Women</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="kids-checkbox"
                value="kids"
                checked={state.filter.category.kids}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "category",
                      {
                        ...state.filter.category,
                        kids: !state.filter.category.kids
                      }
                    ]
                  })
                }
              />
              <label for="kids-checkbox">Kids</label>
            </div>
          </div>
        </div>
        <div className="productlist-aside-item">
          <p className="font-wt-bold">Size</p>
          <div className="productlist-input-container">
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="s-checkbox"
                value="men"
                checked={state.filter.size.s}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "size",
                      {
                        ...state.filter.size,
                        s: !state.filter.size.s
                      }
                    ]
                  })
                }
              />
              <label for="s-checkbox">S</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="m-checkbox"
                value="women"
                checked={state.filter.size.m}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "size",
                      {
                        ...state.filter.size,
                        m: !state.filter.size.m
                      }
                    ]
                  })
                }
              />
              <label for="m-checkbox">M</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="l-checkbox"
                value="kids"
                checked={state.filter.size.l}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "size",
                      {
                        ...state.filter.size,
                        l: !state.filter.size.l
                      }
                    ]
                  })
                }
              />
              <label for="l-checkbox">L</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="xl-checkbox"
                value="kids"
                checked={state.filter.size.xl}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "size",
                      {
                        ...state.filter.size,
                        xl: !state.filter.size.xl
                      }
                    ]
                  })
                }
              />
              <label for="xl-checkbox">XL</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="checkbox"
                name="category-checkbox"
                id="xxl-checkbox"
                value="kids"
                checked={state.filter.size.xxl}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: [
                      "size",
                      {
                        ...state.filter.size,
                        xxl: !state.filter.size.xxl
                      }
                    ]
                  })
                }
              />
              <label for="xxl-checkbox">XXL</label>
            </div>
          </div>
        </div>
        <div className="productlist-aside-item">
          <p className="font-wt-bold">Rating</p>
          <div className="productlist-input-container">
            <div className="productlist-input-item-hz">
              <input
                type="radio"
                name="rating-radio"
                id="4star-radio"
                value="4star"
                checked={state.filter.rating === "4-star" ? true : false}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: ["rating", "4-star"]
                  })
                }
              />
              <label for="4star-radio">4 stars &#38; above</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="radio"
                name="rating-radio"
                id="3star-radio"
                value="3star"
                checked={state.filter.rating === "3-star" ? true : false}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: ["rating", "3-star"]
                  })
                }
              />
              <label for="3star-radio">3 stars &#38; above</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="radio"
                name="rating-radio"
                id="2star-radio"
                value="2star"
                checked={state.filter.rating === "2-star" ? true : false}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: ["rating", "2-star"]
                  })
                }
              />
              <label for="2star-radio">2 stars &#38; above</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="radio"
                name="rating-radio"
                id="1star-radio"
                value="1star"
                checked={state.filter.rating === "1-star" ? true : false}
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: ["rating", "1-star"]
                  })
                }
              />
              <label for="1star-radio">1 stars &#38; above</label>
            </div>
          </div>
        </div>
        <div className="productlist-aside-item">
          <p className="font-wt-bold">Sort by Price</p>
          <div className="productlist-input-container">
            <div className="productlist-input-item-hz">
              <input
                type="radio"
                name="sortby-radio"
                id="lowtohigh-radio"
                value="lowtohigh"
                checked={
                  state.filter.sortByPrice === "low-to-high" ? true : false
                }
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: ["sortByPrice", "low-to-high"]
                  })
                }
              />
              <label for="lowtohigh-radio">price - Low to High</label>
            </div>
            <div className="productlist-input-item-hz">
              <input
                type="radio"
                name="sortby-radio"
                id="hightolow-radio"
                value="hightolow"
                checked={
                  state.filter.sortByPrice === "high-to-low" ? true : false
                }
                onChange={() =>
                  dispatch({
                    type: "filter",
                    payload: ["sortByPrice", "high-to-low"]
                  })
                }
              />
              <label for="hightolow-radio">price - High to Low</label>
            </div>
          </div>
        </div>
      </aside>
      <main className="productlist-main">
        <div className="productlist-main-container">
          <div className="productlist-main-header">
            <p className="font-wt-bold">Showing All Products</p>
            <p>(Showing {filteredData.length} products)</p>
          </div>
          <div className="productlist-main-card-container">
            {filteredData.map((el) => {
              return (
                <Product
                  el={el}
                  key={el.id}
                  addToCartHandler={addToCartHandler}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProductList;
