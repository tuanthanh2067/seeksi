// this file combines all reducer and create a STORE

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";

import userReducer from "./reducers/User";

const initialState = {};

const middleware = [thunk];

const allReducers = combineReducers({
  user: userReducer,
});

const store = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
