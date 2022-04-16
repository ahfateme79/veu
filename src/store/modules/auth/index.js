import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state() {
        return {
            token: null,
            user: {
                id: null,
                name: null,
                cellphone: null,
                city: null,
                is_registered: 0,
                is_registered_complete: 0,
                is_verified: 0,
                avatar: null,
                state: null,
                wallet: 0
            }
        };
    },
    mutations,
    actions,
    getters
};