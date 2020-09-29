import { SPOT_ERROR, SET_SELECTED_SPOT } from "../actions/types";

const initialState = {
  error: null,
  selectedSpot: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SPOT_ERROR:
      return {
        ...state,
        error : action.payload
      };
      case SET_SELECTED_SPOT:
      return {
        ...state,
        selectedSpot : action.payload
      };
    default:
      return state;
  }
}
