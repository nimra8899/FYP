import { combineReducers } from "redux";

import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";
import commentReducer from "./commentReducer.js"; // Assuming you have a commentReducer

export const reducers = combineReducers({ authReducer, postReducer, commentReducer });