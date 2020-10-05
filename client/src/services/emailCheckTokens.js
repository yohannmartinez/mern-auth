import axios from "axios"

export const checkToken = async (token) => {
    const resp = await axios.post('/api/emailCheckTokens/checkToken', { token: token });
    return resp
}


