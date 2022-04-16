const Api = {
    loginApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('login', { cellphone: payload.cellphone })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    confirmCodeApi(payload) {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('confirm-code', {
                cellphone: payload.cellphone,
                code: payload.code
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    signUpApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('register/compeletion', {
                name: payload.name,
                city_id: payload.city_id,
                state_id: payload.state_id
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getStatesApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('states', {
                name: payload.name,
                city_id: payload.city_id,
                state_id: payload.state_id
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getStates: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('states')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getCitiesApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('cities', {
                state_id: payload.state_id
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    editProfileApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios({
                method: 'post',
                url: 'users/update',
                headers: { "Content-Type": "multipart/form-data" },
                data: payload.user
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getHomeApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('home')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getProfileDataApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('users/profile/app')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getServicesApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('services')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    editFarmInfoApi: (payload) => {
        console.log('payload', payload)
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`farms/${payload.id}`, {
                method: 'patch',
                body: payload.farm
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteFarmApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`services/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deletePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`plants/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteHousePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`house-plants/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteHousePlantImgApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`house-plants/delete/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteGreenHouseApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`greenhouses/plants/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    submitSoilExamination: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('examination/soil/request', {
                service_id: payload.service_id,
                service_type: payload.service_type,
                description: payload.description
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getWeatherDaily: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`/weather/forecast/daily?lat=${payload.data.lat}&lon=${payload.data.lon}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getWeatherHourly: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`weather/forecast/hourly?lat=${payload.data.lat}&lon=${payload.data.lon}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getVarieties: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`varieties`, {
                crop_id: payload.crop_id
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getCrops: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`crops`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getIrrigationType: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`irrigation-types`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    createFarmApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.data.self.$axios.post('farms/create', {
                name: payload.data.name,
                shape: payload.data.shape,
                center: payload.data.center
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    createGardenApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.data.self.$axios.post('gardens', {
                name: payload.data.name,
                shape: payload.data.shape,
                center: payload.data.center
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    editGardenApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`gardens/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    createPlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('plants/create', {
                farm_id: payload.farm_id,
                variety_id: payload.variety_id,
                irrigation_type_id: payload.irrigation_type_id,
                planting_date: payload.planting_date,
                shape: payload.shape,
                center: payload.center
            })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    createBlockApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`garden-blocks`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    editBlockApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`garden-blocks/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })

    },
    deleteBlockApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`garden-blocks/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    editPlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.patch(`plants/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    jalizbanAPi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`jalizban/${payload.data.uuid}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    submitHerbalAdvice: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('examination/plant/request',
                payload.formData
            )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    submitEditHerbalAdvice: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('examination/plant/request',
                payload.formData
            )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    soilConsultingRequest: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('examination/consulting/request', payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getDaneshbanApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('daneshban')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getDaneshbanPostsApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`daneshban/posts/${payload.page}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getDaneshbanCategoriesApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`daneshban/categories/${payload.page}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getWishlistApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('favorites')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteWishlistApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`products/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getNotificationApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`notifications?page=${payload.page.page}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getMessagesUsersApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('messages/users')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getMessagesApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`messages/${payload.currentRoomId}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteMessageApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`messages/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    sendMessageApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`messages`, payload.formData)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getSubscriptionApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('plans/myplan')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getMyPlansListSubscriptionApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('plans')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getBuySubscriptionApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`plans/purchase/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getPlantCounselingApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`${payload.reqUrl}/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getNotificationHeaderApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('notifications/unread')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    MessageMarkAsReadApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('notifications/mark-as-read', { id: payload.id })
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getUserProfileApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get('users/profile')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getMyFarmsDataApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post('farms')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getMyFarmsInformationDataApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`farms/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getPlantInformationDataApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`plants/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getFlowerTypesDataApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`flower-types${payload.page}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getFlowerTypeApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`flower-types/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    AddHousePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`house-plants`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))


        })
    },
    editHousePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`house-plants/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))


        })
    },
    AddGreenHouseApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`greenhouses`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    EditGreenHouseApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`greenhouses/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    AddGreenHousePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`greenhouses/plants`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getServiceInformationApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`services/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getLightings: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`lightings`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getProfileApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`users/profile`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getHousePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`house-plants/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getGreenHousePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`greenhouses/plants/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    editGreenHousePlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`greenhouses/plants/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    editGardenBlockApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`garden-blocks/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    editFarmApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`farms/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getFarmPlantApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`plants/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getGardenBlockApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`garden-blocks/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getDirectionsApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`garden-lines/directions`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    createLine: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`garden-lines`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    editLine: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`garden-lines/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteLineApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`garden-lines/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getCategoriesApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`categories`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getCategoryApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`categories/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getProductsApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`products${payload.page}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    editProductApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`products/${payload.id}`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    DeleteMyAdvertisementImgApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`images/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getServiceApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`products/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    submitAdvCreate: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`products`, payload.formData)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getProductApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`products/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    DeleteMyAdvertisementApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`products/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    addFavoriteApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.post(`favorites`, payload.data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    DeleteFavoriteApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.delete(`favorites/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getMyAdvertisementsApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`products/my-products`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getTrees: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`trees`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    getTreeCultivars: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`tree-cultivars?tree_id=${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    singleGardenBlock: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`garden-blocks/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    singleConsultApi: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`examination/consultings/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    singleSoilResult: (payload) => {
        return new Promise((resolve, reject) => {
            payload.self.$axios.get(`examination/soil/${payload.id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

}
export default Api;