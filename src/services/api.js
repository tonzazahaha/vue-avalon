import axios from 'axios'

export const $api = ({ path, method, ...args }) => {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('access_token') || ''
        let baseUrl = process.env.VUE_APP_BASE_URL_API
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
        }

        try {
            axios({
                method: method || 'get',
                url: `${baseUrl}/${path}`,
                ...args,
            })
            .then(resp => {
                resolve(resp)
            })
            .catch(error => {
                reject(error)
            })
        } catch (err) {
            reject(new Error(err ))
        }
    })
}