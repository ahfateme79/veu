const state = {
    weather_city_id: null,
    service: null,
}
const getters = {
    weatherCityId(state) {
        return state.weather_city_id
    },
    service(state) {
        return state.service
    }
}
const mutations = {
    weatherCity(state, payload) {
        state.weather_city_id = payload.weather_city_id
    },
    service(state, payload) {
        state.service = payload.service
    }
}
const actions = {
    setWeatherCity({commit}, payload) {
        commit('weatherCity', {
            weather_city_id: payload.weather_city_id
        });
    },
    service({commit}, payload) {
        commit('service', {
            service: payload.service
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}