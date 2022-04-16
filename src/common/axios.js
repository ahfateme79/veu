import axios from 'axios'

const axiosIns = axios.create({baseURL: 'https://app.jalizan.com/api/v1/'})
axiosIns.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axiosIns.defaults.headers.post['Accept'] = 'application/json';
if (localStorage.getItem('token')) {
    axiosIns.defaults.headers.common['Authorization'] = localStorage.getItem('token')
}
export default axiosIns
