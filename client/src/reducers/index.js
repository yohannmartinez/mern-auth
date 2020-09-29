import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import menuReducer from "./menuReducer";
import spotReducer from "./spotReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  menu: menuReducer,
  spot: spotReducer,
});
