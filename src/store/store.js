import {createStore} from 'vuex';
import auth from './modules/auth';
import home from './modules/home';

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        auth,
        home
    }
});

export default store;