import axios from "axios"

export const createToken = async (email) => {
    console.log('creating token')
    const resp = await axios.post('/api/forgotPasswordTokens/newToken', { email: email });
    return resp
}

export const checkToken = async (token_id, code) => {
    console.log('creating token')
    const resp = await axios.get('/api/forgotPasswordTokens/checkToken', { params: { token_id: token_id, code: code } });
    return resp
}

