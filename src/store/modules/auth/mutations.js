export default {
    logOut(state) {
        state.token = null;
        state.user = null;
    },
    authUser(state, payload) {
        if (payload.token !== null) {
            state.token = payload.token;
            state.user = payload.user;
        } else {
            state.token = null
        }
    },
};