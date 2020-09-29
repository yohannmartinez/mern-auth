import Axios from "axios"

export const uploadImage = async (imageData) => {
    console.log(imageData)
    const resp = await Axios.post(`/api/s3/upload`, imageData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(resp)
    return resp
}

