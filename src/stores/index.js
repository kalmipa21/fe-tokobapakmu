import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";

const rootReducer = combineReducers({
  auth: useReducerAuth,
});

export default createStore(rootReducer);
