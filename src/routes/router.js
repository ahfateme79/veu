import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ServiceSelection from '../views/ServiceSelection'
import Home from "../views/Home";
import SoilConsulting from "../views/SoilConsulting";
import ShowSoilExamination from "../views/ShowSoilExamination";
import Meteorology from "../views/Meteorology";
import NotFound from "../views/NotFound";
import FarmInformation from "../views/FarmInformation";
import AddFarm from "../views/AddFarm";
import AddGarden from "../views/AddGarden";
import AddGardenBlock from "../views/AddGardenBlock";
import AddGardenBlockRow from "../views/AddGardenBlockRow";
import ShowBlockLines from "../views/ShowBlockLines";
import AddPlant from "../views/AddPlant";
import PlantInformation from "../views/PlantInformation";
import Subscription from "../views/Subscription";
import Conversation from "../views/Conversation";
import Articles from "../views/Articles";
import Questions from "../views/Questions";
import Store from "../views/Store";
import UsageTips from "../views/UsageTips";
import MyServices from "../views/MyServices";
import Services from "../views/Services";
import ShowService from "../views/ShowService";
import ShowConsulting from "../views/ShowConsulting";
import Profile from "../views/Profile";
import MyFavorites from "../views/MyFavorites";
import MyOrders from "../views/MyOrders";
import MyAdvertisements from "../views/MyAdvertisements";
import Messages from "../views/Messages";
import FlowerTypes from '../views/FlowerTypes'
import FlowerType from '../views/FlowerType'
import AddGreenHouse from '../views/AddGreenHouse'
import AddGreenHousePlant from '../views/AddGreenHousePlant'
import AdvCreateCategorySelection from '../views/AdvCreateCategorySelection'
import AdvCreate from '../views/AdvCreate'
import auth from "./middleware/auth";
import guest from "./middleware/guest";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: { name: 'login' }
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: {
                middleware: [
                    guest
                ]
            }
            // beforeEnter: (to, from, next) => {
            //     const token = localStorage.getItem('token')
            //     if (!token) {
            //         return next()
            //     } else {
            //         return next(from.fullPath);
            //     }
            // },
        },
        {
            path: '/sign-up',
            component: SignUp,
            name: 'signup',
            meta: {
                middleware: [
                    auth
                ]
            },
            // beforeEnter: (to, from, next) => {
            //     const user =JSON.parse(localStorage.getItem('user'))
            //     if (user.is_registered_complete === 0) {
            //         return next()
            //     }else{
            //         return  next(from.fullPath);
            //     }
            // },
        },
        {
            path: '/service-selection',
            component: ServiceSelection,
            name: 'ServiceSelection',
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/home',
            component: Home,
            name: 'home',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/meteorology',
            component: Meteorology,
            name: 'meteorology',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/farm/add',
            component: AddFarm,
            name: 'AddFarm',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/farm/:serviceId/information',
            component: FarmInformation,
            name: 'FarmInformation11',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/farm/:serviceId/edit',
            component: AddFarm,
            name: 'AddFarm2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/farm/:serviceId/plant/create',
            component: AddPlant,
            name: 'AddPlant',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/farm/:serviceId/plant/:id/information',
            component: PlantInformation,
            name: 'PlantInformation',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/farm/:serviceId/plant/:id/edit',
            component: AddPlant,
            name: 'AddPlant2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/add',
            component: AddGarden,
            name: 'AddGarden',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/:serviceId/information',
            component: FarmInformation,
            name: 'FarmInformation12',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/:serviceId/edit',
            component: AddGarden,
            name: 'AddGarden2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/:serviceId/block/create',
            component: AddGardenBlock,
            name: 'AddGardenBlock',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/:serviceId/block/:blockId/row/create',
            component: AddGardenBlockRow,
            name: 'AddGardenBlockRow',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/:serviceId/block/:blockId/row/:id/edit',
            component: AddGardenBlockRow,
            name: 'EditGardenBlockRow',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/:serviceId/block/:blockId/blockLines',
            component: ShowBlockLines,
            name: 'ShowBlockLines',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/garden/:serviceId/block/:id/edit',
            component: AddGardenBlock,
            name: 'AddGardenBlock2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/soil-consulting',
            component: SoilConsulting,
            name: 'soil-consulting',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/show-soil-examination/:id',
            component: ShowSoilExamination,
            name: 'show-soil-examination',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/show-consulting/:id',
            component: ShowConsulting,
            name: 'show-consulting',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/subscription',
            component: Subscription,
            name: 'Subscription',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/conversation',
            component: Conversation,
            name: 'Conversation',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/MyServices',
            component: MyServices,
            name: 'MyServices',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/Services',
            component: Services,
            name: 'Services',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/Services/:id',
            component: ShowService,
            name: 'ShowService',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/advertisement-create-category-selection',
            component: AdvCreateCategorySelection,
            name: 'AdvCreateCategorySelection',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/advertisement/:selectedCategoryId/create',
            component: AdvCreate,
            name: 'AdvCreate',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/advertisement/:id/edit',
            component: AdvCreate,
            name: 'AdvCreate2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/questions',
            component: Questions,
            name: 'Questions',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/store',
            component: Store,
            name: 'Store',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/usage-tips',
            component: UsageTips,
            name: 'UsageTips',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/articles',
            component: Articles,
            name: 'Articles',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/profile',
            component: Profile,
            name: 'Profile',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/my-favorites',
            component: MyFavorites,
            name: 'MyFavorites',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/my-orders',
            component: MyOrders,
            name: 'MyOrders',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/my-advertisements',
            component: MyAdvertisements,
            name: 'MyAdvertisements',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/flower-types',
            component: FlowerTypes,
            name: 'FlowerTypes',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/flower-type/:serviceId/information',
            component: FarmInformation,
            name: 'FarmInformation2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/flower-type/:flower_id?',
            component: FlowerType,
            name: 'FlowerType',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/flower-type/:id/edit',
            component: FlowerType,
            name: 'FlowerType2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/add-green-house',
            component: AddGreenHouse,
            name: 'AddGreenHouse',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/green-house/:serviceId/information',
            component: FarmInformation,
            name: 'FarmInformation3',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/green-house/:serviceId/edit',
            component: AddGreenHouse,
            name: 'AddGreenHouse2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/green-house/:serviceId/plant/create',
            component: AddGreenHousePlant,
            name: 'AddGreenHousePlant',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/green-house/:serviceId/plant/:id/edit',
            component: AddGreenHousePlant,
            name: 'AddGreenHousePlant2',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: '/messages',
            component: Messages,
            name: 'Messages',
            props: true,
            meta: {
                middleware: [
                    auth
                ]
            },
        },

        {
            path: '/:not-found(.*)', component: NotFound, name: 'Not-found',
            meta: {
                middleware: [
                    auth
                ]
            },
        }
    ],

});
router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        router
    }

    return middleware[0]({
        ...context
    })
})

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user'));
//     const isUserLoggedIn = token != null && user != null;
//     const isInLoginPage = to.fullPath === '/login';
//     let isUserRegistered
//     if (user != null) {
//         isUserRegistered = user.is_registered_compelete
//     }
//     if (!isUserLoggedIn && !isInLoginPage) return next('/login');
//     if (isUserLoggedIn && isUserRegistered === 0 && to.fullPath !== '/sign-up') {
//         return window.location.replace('/sign-up')
//     }
//     if (isUserLoggedIn && isUserRegistered === 1 && to.fullPath === '/sign-up') {
//         return window.location.replace('/home')
//     }
//     if (isUserLoggedIn && isUserRegistered === 1) {
//         return next()
//     }
//     next();
// })


export default router;



