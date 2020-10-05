import Axios from "axios"
import { createNotification } from "./notifications"

// add spot
export const addSpot = async (spot_data, history, userAuth) => {
        console.log(userAuth)
        let addSpotResponse = await Axios.post("/api/spots/add", spot_data)
        let notificationsResponse = await userAuth.followers.map(follower => {
                let notification = {
                        targeted_user_id: follower,
                        transmitter_user_id: userAuth._id,
                        attachment: {
                                spot_id: addSpotResponse.data.spot._id,
                                spot_name: addSpotResponse.data.spot.name
                        },
                        libelle: "add_spot",
                        content: "à créé un spot",
                };
                createNotification(notification);
        })
        history.push("/addSpotSuccess/?spot_id=" + addSpotResponse.data.spot._id + "&spot_name=" + addSpotResponse.data.spot.name);
        return notificationsResponse;
};

export const getAddedSpotsByUserId = async (user_id) => {
        const resp = await Axios.get('/api/spots/getAddedSpotsByUserId', { params: { user_id: user_id } });
        return resp
}

export const getSpotById = async (spot_id) => {
        const resp = await Axios.get('/api/spots/getSpotById', { params: { spot_id: spot_id } });
        return resp
}

export const updateSpot = async (spot, spot_id) => {
        const resp = await Axios.post('/api/spots/updateSpot', { spot: spot, spot_id: spot_id });
        return resp
}

