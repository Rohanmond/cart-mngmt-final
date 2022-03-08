import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {
  CartDataProvider,
  NavRouteProvider,
  ProductDataProvider
} from "./components/CreateContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductDataProvider>
      <CartDataProvider>
        <NavRouteProvider>
          <App />
        </NavRouteProvider>
      </CartDataProvider>
    </ProductDataProvider>
  </StrictMode>,
  rootElement
);
