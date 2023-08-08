import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

//Import component, page, and auth
import App from "../App";
//Layout Products
import LayoutProducts from "../Layouts/LayoutProducts";
// Layout Cart
import LayoutCart from "../Layouts/LayoutCart";
//Customer page
import Products from "../pages/customer/Products";
import Login from "../pages/Login";
import Register from "../pages/customer/Register";
import Carts from "../pages/Carts";

//Layout Auth
import LayoutAuth from "../Layouts/LayoutAuth";

// Negative Page
import Error from "../pages/Error";

import stores from "../stores";
const { auth } = stores.getState();

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* Layout Product */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <LayoutProducts />
          </LayoutAuth>
        }
      >
        <Route path="/" element={<Products />} />
      </Route>

      {/* Layout Cart */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <LayoutCart />
          </LayoutAuth>
        }
      >
        <Route path="/Carts" element={<Carts />} />
      </Route>

      {/* Login and register page */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <App />
          </LayoutAuth>
        }
      >
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Route>
  )
);
