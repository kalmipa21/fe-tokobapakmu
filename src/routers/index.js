import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

//Import component, page, layout, and auth
import App from "../App";
//Customer page
import Home from "../pages/Home";
import Login from "../pages/customer/Login";
import Register from "../pages/customer/Register";

// Negative Page
import Error from "../pages/Error";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Route>
  )
);
