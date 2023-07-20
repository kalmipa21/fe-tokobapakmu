import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

//Import component, page, and auth
import App from "../App";
//Layout Products
import LayoutProducts from "../Layouts/LayoutProducts";
//Customer page
import Products from "../pages/Products";
import Login from "../pages/customer/Login";
import Register from "../pages/customer/Register";

//Layout Auth
import LayoutAuth from "../Layouts/LayoutAuth";

// Negative Page
import Error from "../pages/Error";

import stores from "../stores";
const { auth } = stores.getState();

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
        element={
          <LayoutAuth auth={auth}>
            <LayoutProducts />
          </LayoutAuth>
        }
      >
        <Route path="/" element={<Products />} />
      </Route>

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
