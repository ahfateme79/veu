// import helper from '../../common/helper';
//
// const state = {
//     token: null,
//     user: null
// }
// const getters = {
//     user(state) {
//         return state.user
//     }
// }
// const mutations = {
//     authUser(state, userData) {
//         state.token = userData.token,
//             state.user = userData.user
//     },
// }
// const actions = {
//     confirmCode({commit}, payload) {
//         payload.self.$axios.post('confirm-code', {
//             cellphone: payload.cellphone,
//             code: payload.code
//         }).then(response => {
//             if (response.status === 200) {
//                 let data = response.data;
//                 payload.self.loading = false;
//                 payload.self.toastMessageDisplay = true;
//                 payload.self.status = true;
//                 localStorage.setItem('token', `Bearer ${data.access_token}`)
//                 localStorage.setItem('user', JSON.stringify(data.user));
//                 payload.self.$axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
//                 commit('authUser', {
//                     token: `Bearer ${data.access_token}`,
//                     user: data.user,
//                 });
//                 if (data.user.is_registered === 1) {
//                     payload.self.$router.push({
//                         name: 'home'
//                     });
//                 } else if (data.user.is_registered === 0) {
//                     payload.self.$router.push({
//                         name: 'signup'
//                     });
//                 }
//             }
//         }).catch(error => {
//             payload.self.loading = false;
//             payload.self.status = false;
//             payload.self.toastMessageDisplay = true;
//             payload.self.toastMessage = helper.getErrorMessage(error, payload.self)
//             alert(helper.getErrorMessage(error, payload.self))
//         })
//     },
//     logout({commit}, payload) {
//         payload.self.$axios.post('logout').then(response => {
//             if (response.status === 200) {
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//                 commit('authUser', {
//                     token: null,
//                     user: null,
//                 });
//                 payload.self.$router.push({
//                     name: 'login',
//                 });
//             }
//         }).catch(error => {
//             alert(helper.getErrorMessage(error, payload.self))
//         })
//     }
// }
// export default {
//     state,
//     getters,
//     mutations,
//     actions
// }