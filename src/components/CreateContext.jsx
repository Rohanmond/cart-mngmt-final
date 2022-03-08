import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
} from "react";
import axios from "axios";
import GetAdditionalData from "./data";

const NavRouteContext = createContext({ route: "product" });
const ProductDataContext = createContext({ data: [] });
const CartDataContext = createContext({ cartData: [] });

export const NavRouteProvider = ({ children }) => {
  const [route, setRoute] = useState("product");
  return (
    <NavRouteContext.Provider value={{ route, setRoute }}>
      {children}
    </NavRouteContext.Provider>
  );
};
export const ProductDataProvider = ({ children }) => {
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "filter": {
        const newFilter = {
          ...state.filter,
          [action.payload[0]]: action.payload[1]
        };
        console.log("newFi", newFilter);
        return { ...state, filter: newFilter };
      }
      case "clearFilter":
        return { ...state, filter: initialFilter };
      default:
        return state;
    }
  };
  const initialFilter = {
    category: { men: false, women: false, kids: false },
    size: { s: false, m: false, l: false, xl: false, xxl: false },
    rating: "",
    sortByPrice: "",
    maxPrice: 1000
  };
  const [data, setData] = useState([]);
  const additionalData = GetAdditionalData();
  const productAPI = "https://62188b391a1ba20cbaa3c9ce.mockapi.io/api/products";
  const [state, dispatch] = useReducer(reducerFunc, {
    filter: initialFilter
  });
  useEffect(() => {
    (async () => {
      try {
        const productRes = await axios.get(productAPI);

        if (productRes.status === 200 || productRes === 201) {
          const productData = productRes.data.map((el, index) => ({
            ...el,
            rating: additionalData[index].rating,
            category: additionalData[index].category,
            size: additionalData[index].size
          }));
          setData(productData);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <ProductDataContext.Provider
      value={{ data, setData, state, dispatch, productAPI }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};
export const CartDataProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const cartAPI = "https://62188b391a1ba20cbaa3c9ce.mockapi.io/api/carts";

  useEffect(() => {
    (async () => {
      try {
        const cartRes = await axios.get(cartAPI);

        if (cartRes.status === 200 || cartRes.status === 201) {
          setCartData(cartRes.data);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <CartDataContext.Provider value={{ cartData, setCartData, cartAPI }}>
      {children}
    </CartDataContext.Provider>
  );
};

export const useNavRoute = () => useContext(NavRouteContext);
export const useProductData = () => useContext(ProductDataContext);
export const useCartData = () => useContext(CartDataContext);
