
import { SET_MENU_STATE } from "./types";

// set menu status to false or true
export const setMenuState = decoded => {
  return {
    type: SET_MENU_STATE,
    payload: decoded
  };
};
