import axios from 'axios'

export const v1_add_user = async (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user-management`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
}


export const v1_edit_user = async (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user-management`;
    return axios.put(url, model).then((res) => {
        return res.data;
    })
}

export const v1_get_users = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user-management`;
    return axios.get(url).then((res) => {
        return res.data;
    })
}