import { createApp } from "vue";
import "./assets/font/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap";
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import App from './App.vue';
import router from "./routes/router";
// import * as Sentry from "@sentry/vue";
// import { Integrations } from "@sentry/tracing";
import store from "./store/store";
import {ErrorMessage, Field, Form} from 'vee-validate'
import { setLocale } from 'yup';
setLocale({
    mixed: {
        required: 'پر کردن فیلد الزامی است',
    },
    number: {
        integer: 'مقدار باید عدد صحیح باشد',
        positive:'مقدار باید عدد مثبت باشد'
    },
});
// import { setLocale } from '@vee-validate/i18n';
// setLocale('fa');
// import { configure } from 'vee-validate';
// import { localize } from '@vee-validate/i18n';
// import fa from '@vee-validate/i18n/dist/locale/fa.json';
// configure({
//     generateMessage: localize({
//         fa,
//     }),
// });
import '././assets/FontAwesomeIconFile';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { createI18n } from 'vue-i18n';
import Loading from './components/UI/Loading';
import VueMultiselect from 'vue-multiselect'
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.js";
import Pagination from 'v-pagination-3';
import Toast from "vue-toastification";
import Popper from "vue3-popper";
import moment from 'vue3-jalali-moment'
import "vue-toastification/dist/index.css";
import axiosIns from './common/axios.js'; //Definitaion of global axios
import messages from './assets/multilingualFile/multilingualFile'; //Defination of multilingual file (en & fa)
const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'fa', // set locale
    globalInjection: true,
    messages
})

//Define Root component
const app = createApp(App)
const html = document.documentElement // returns the html tag
html.setAttribute('lang', 'fa')
// Sentry.init({
//     app,
//     dsn: "https://b1277fea758b448bb3f2afc4b02a61be@sentry.hamravesh.com/201",
//     integrations: [
//         new Integrations.BrowserTracing({
//             routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//             tracingOrigins: ["localhost", "my-site-url.com", /^\//],
//         }),
//     ],
//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
//     logErrors: true,
//     trackComponents: true,
//     // or specify specific names
//     // trackComponents: ["App", "AppNavigation", "AppFooter"],
//     hooks: ["activate", "create", "destroy", "mount", "update"],
// });
app.use(router)
    .use(store)
    .use(i18n)
    .use(moment)
    .use(Toast, {
        transition: 'Vue-Toastification__bounce',
        maxToasts: 20,
        newestOnTop: true,
    })
app.component('DatePicker', Vue3PersianDatetimePicker)
    .component('VueMultiselect ', VueMultiselect)
    .component('Field', Field)
    .component('Form', Form)
    .component('Form', Form)
    .component('Popper', Popper)
    .component('ErrorMessage', ErrorMessage)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('font-awesome-layers', FontAwesomeLayers)
    .component('font-awesome-layers-text', FontAwesomeLayersText)
    .component('Loading', Loading)
    .component('Swiper', Swiper)
    .component('SwiperSlide', SwiperSlide)
    .component('pagination', Pagination)
app.provide('$axios', axiosIns);
app.mount('#app')
