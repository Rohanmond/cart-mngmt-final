import axios from "axios";
import CartList from "./components/CartList";
import { useCartData, useNavRoute } from "./components/CreateContext";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import "./styles.css";
export default function App() {
  const { route, setRoute } = useNavRoute();
  const { cartData, setCartData, cartAPI } = useCartData();

  const addToCartHandler = async (el, showAdd) => {
    try {
      if (!showAdd) {
        setRoute("cart");
      } else {
        const res = await axios.post(cartAPI, {
          ...el,
          quantity: 1,
          product_id: el.id
        });
        if (res.status === 201 || res.status === 200) {
          setCartData(cartData.concat(res.data));
          return true;
        }
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const removeCartHandler = async (id) => {
    try {
      const res = await axios.delete(`${cartAPI}/${id}`);
      if (res.status === 200 || res.status === 201) {
        setCartData(cartData.filter((it) => it.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const quantityIncreaseHandler = async (cartEle) => {
    try {
      const res = await axios.put(`${cartAPI}/${cartEle.id}`, {
        ...cartEle,
        quantity: cartEle.quantity + 1
      });
      if (res.status === 201 || res.status === 200)
        setCartData(
          cartData.map((it) => {
            if (it.id === cartEle.id) return res.data;
            return it;
          })
        );
    } catch (err) {
      console.error(err);
    }
  };
  const quantityDecreaseHandler = async (cartEle) => {
    if (cartEle.quantity === 1) {
      removeCartHandler(cartEle.id);
      return;
    }
    try {
      const res = await axios.put(`${cartAPI}/${cartEle.id}`, {
        ...cartEle,
        quantity: cartEle.quantity - 1
      });
      if (res.status === 201 || res.status === 200)
        setCartData(
          cartData.map((it) => {
            if (it.id === cartEle.id) return res.data;
            return it;
          })
        );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <Nav />
      {route === "product" && (
        <ProductList addToCartHandler={addToCartHandler} />
      )}
      {route === "cart" && (
        <CartList
          removeCartHandler={removeCartHandler}
          quantityIncreaseHandler={quantityIncreaseHandler}
          quantityDecreaseHandler={quantityDecreaseHandler}
        />
      )}
    </div>
  );
}
