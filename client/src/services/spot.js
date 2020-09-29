import Axios from "axios"

export const getAddedSpotsByUserId = async (user_id) => {
        const resp = await Axios.get('/api/spots/getAddedSpotsByUserId',{params:{user_id : user_id}});
        return resp
}

export const getSpotById = async (spot_id) => {
        const resp = await Axios.get('/api/spots/getSpotById',{params:{spot_id : spot_id}});
        return resp
}

export const updateSpot = async (spot, spot_id) => {
    const resp = await Axios.post('/api/spots/updateSpot',{spot:spot,spot_id : spot_id});
    return resp
}

