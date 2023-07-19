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

// Negative Page
import Error from "../pages/Error";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<LayoutProducts />}>
        <Route path="/" element={<Products />} />
      </Route>

      <Route path="*" element={<Error />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Route>
  )
);
