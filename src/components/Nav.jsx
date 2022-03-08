import { useCartData, useNavRoute } from "./CreateContext";

const Nav = () => {
  const { setRoute } = useNavRoute();
  const { cartData } = useCartData();

  return (
    <nav className="navbar">
      <ul className="nav-right">
        <li>
          <div className="badge-container">
            <div className="badge-icon">
              <span
                onClick={() => {
                  setRoute("product");
                }}
                style={{ cursor: "pointer" }}
                className="material-icons-outlined"
              >
                shop_2
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="badge-container">
            <div
              className="badge-icon"
              style={{ cursor: "pointer" }}
              onClick={() => setRoute("cart")}
            >
              <span className="material-icons">shopping_cart</span>
            </div>
            <div className="badge-number background-online">
              {cartData.length}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
