import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
// import errorReducer from "./errorReducer";
import postReducer from "./postReducer";

export default combineReducers({
    security: securityReducer,
    // post: postReducer,
    // errors: errorReducer,
});
