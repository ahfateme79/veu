import router from "./routes/router";

export default {
    signup(context, payload) {
        let data = {
            name: payload.name,
            city_id: payload.city_id,
            state_id: payload.state_id
        }
        axios.post('https://app.jalizan.com/api/v1/register/compeletion', data, {
            Accept: 'application/json'
        }).then(response => {
            if (response.status === 200) {
                router.push({
                    name: 'home',
                });
            }
        }).catch(error => {
            console.log(error)
        })
    },
    // logout(context, _) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     context.commit('logOut');
    //     router.push({
    //         name: 'login',
    //     });
    // }
};