
import axios from "axios";
import { SET_SELECTED_SPOT } from "./types";

export const setSelectedSpot = spot => {
  return {
    type: SET_SELECTED_SPOT,
    payload: spot
  };
};
