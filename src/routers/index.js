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
// Layout Customer Profile
import LayoutProfileCust from "../Layouts/LayoutProfileCust";
//Customer page
import Products from "../pages/customer/Products";
import Login from "../pages/Login";
import Register from "../pages/customer/Register";
import Carts from "../pages/Carts";
import Invoices from "../pages/customer/Invoices";
import Profile from "../pages/customer/Profile";
import History from "../pages/customer/History";

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
          <LayoutAuth auth={auth} children={<LayoutProducts />}></LayoutAuth>
        }
      >
        <Route path="/" element={<Products />} />
      </Route>

      {/* Layout Cart, Invoice */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <LayoutCart />
          </LayoutAuth>
        }
      >
        <Route path="/Carts" element={<Carts />} />
        <Route path="/invoice/:code" element={<Invoices />} />
      </Route>

      {/* Layout Customer Profile */}
      <Route
        element={
          <LayoutAuth auth={auth} children={<LayoutProfileCust />}></LayoutAuth>
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* Login and register page */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <App />
          </LayoutAuth>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Route>
  )
);
