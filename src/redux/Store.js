import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";

// Create the Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
