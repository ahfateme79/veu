import helper from "../common/helper";
import {useToast} from "vue-toastification";
import Api from "../common/api";

export const globalMixin = {
    data() {
        return {
            loading: false,
            totalUnReadMessages:null,
            loading2: false,
            messagesLoading: false,
            status: false,
            toastOptions: {
                position: 'top-right',
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: 'button',
                icon: true,
                rtl: true,
            },
            toast: useToast(),
        }
    },
    methods: {
        handleError(self, error) {
            this.loading = false;
            this.status = false;
            this.toastMessageDisplay = true;
            this.toastMessage = helper.getErrorMessage(error, self);
            // alert(helper.getErrorMessage(error, self));
        },
        shortener(text, num) {
            return text.length > num
                ? `${text.slice(0, num)}...`
                : text;
        },
        shortenerPlus(numm) {
            let text = numm.toString()
            return text.length > 4
                ? `+${text.slice(0, 4)}`
                : text;
        },
        toastReturnTxt(msgObj) {
            let status = msgObj !== undefined ? msgObj.status : undefined;
            switch (status) {
                case 200:
                    this.toast.success(msgObj.data.success, this.toastOptions)
                    break
                case 201:
                    this.toast.success(msgObj.data.success, this.toastOptions)
                    break
                case 500:
                    this.toast.error('خطای سرور', this.toastOptions)
                    break
                case 422:
                    for (const property in msgObj.data.errors) {
                        this.toast.error(msgObj.data.errors[property][0], this.toastOptions)
                    }
                    break
                case 403:
                    this.toast.error('خطای احراز هویت', this.toastOptions)
                    break
                case 429:
                    this.toast.error('تعداد درخواست بیش از حد مجاز', this.toastOptions)
                    break
                case undefined: 
                    this.toast.error('خطای سرور', this.toastOptions)
                    break
            }
        },
        backToHome() {
            this.$router.push('/home')
        },
        goAnotherPage(url) {
            this.$router.push(url)
        },
        backToPrevPage() {
            this.$router.back()
        },
        getTotalUnReadMessages() {
            let self = this;
            Api.getNotificationHeaderApi({self: this})
                .then((response) => {
                    if (response.status === 200) {
                        this.totalUnReadMessages = response.data;
                    }
                })
                .catch((error) => {
                    self.handleError(self, error);
                });
        },
    }
}
