import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

//Import component, page, layout, and auth
import App from "../App";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
