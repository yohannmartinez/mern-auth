
import axios from "axios";
import { SET_SELECTED_SPOT, SPOT_ERROR } from "./types";

// add spot
export const addSpot = (spot_data, history) => dispatch => {
  axios
    .post("/api/spots/add", spot_data)
    .then(res => {history.push("/addSpotSuccess/?spot_id=" + res.data.spot._id + "&spot_name=" + res.data.spot.name)})
    .catch(err =>
      dispatch({
        type: SPOT_ERROR,
        payload: "Un problème est survenu lors de l'ajout du spot, veuillez réessayer ultèrieurement !"
      })
    );
};

export const setSelectedSpot = spot => {
  return {
    type: SET_SELECTED_SPOT,
    payload: spot
  };
};
