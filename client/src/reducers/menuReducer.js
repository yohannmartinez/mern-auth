import { SET_MENU_STATE } from "../actions/types";

const initialState = {
  isMenuOpened: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MENU_STATE:
      return {
        ...state,
        isMenuOpened : !state.isMenuOpened
      }
    default:
      return state;
  }
}
