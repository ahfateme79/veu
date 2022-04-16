<template>
  <div>
    <div class="confirm-code-page text-center container login-form">
      <span class="login-form-title">ورود به حساب کاربری</span>
      <Form @submit="submitConfirmCode" :validation-schema="schema">
        <div class="row">
          <label class="col-12 text-end label-input" for="cellphone">
            کد تایید را وارد کنید
          </label>
          <span class="sendingCodeNumber">
            کد تایید برای شماره موبایل
            {{ cellphone }} ارسال گردید
          </span>
          <Field
              class="col-12 login-form-text-input"
              name="code"
              type="text"
              autocomplete=off
              :rules="validateConfirmCode"
              v-model="code"
          />
          <ErrorMessage
              class="text-danger pt-1 fw-bold text-end"
              name="code"
          />
          <span class="sendingCodeNumberTimer">
            <span>ارسال کد تا </span>
            <span>{{ resetCodeTimerMin }}:</span>
            <span> {{ resetCodeTimerSec }}</span>
            <span> دیگر </span>
          </span>
          <span
              @click="resendCode"
              class="pointer sendingCodeNumberTimer"
              v-if="resetCodeTimerMin === 0 && resetCodeTimerSec === 0"
          >در خواست مجدد کد</span
          >
        </div>
        <div class="row pb-3">
          <button
              :disabled="resetCodeTimerMin === 0 && resetCodeTimerSec === 0"
              v-if="!loading"
              class="btn text-white login-form-submit-button"
          >
            ورود به جالیزان
          </button>
          <Loading v-if="loading"/>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
// import BackButton from "../components/UI/BackButton";
import {loginValidation} from "../mixins/loginValidation";
import {globalMixin} from "../mixins/globalMixin";
import Api from "../common/api";
import * as yup from "yup";

export default {
  name: "ConfirmCode",
  // components: {BackButton},
  mixins: [loginValidation, globalMixin],
  inject: ["$axios"],
  data() {
    return {
      code: null,
      resetCodeTimerMin: 5,
      resetCodeTimerSec: 0,
      showResendCodeText: false,
      show: true,
      schema: yup.object({
        code: yup.number().required().typeError('مقدار باید عدد باشد'),
      })
    };
  },
  props: ["cellphone"],
  mounted() {
    this.resetCodeIntervalMutate(120);
  },
  methods: {
    submitConfirmCode() {
      this.loading = true;
      let self = this;
      Api.confirmCodeApi({
        cellphone: this.cellphone,
        code: this.code,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.loading = false;
              localStorage.setItem(
                  "token",
                  `Bearer ${response.data.access_token}`
              );
              localStorage.setItem("user", JSON.stringify(response.data.user));
              localStorage.setItem('userName', response.data.user.name);
              localStorage.setItem('userAvatar', response.data.user.avatar !== null? response.data.user.avatar : '')
              window.location.replace('/home')
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
            self.loading = false;
          });
    },
    resendCode() {
      this.loading = true;
      let self = this;
      Api.loginApi({
        cellphone: this.cellphone,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.loading = false;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
      this.resetCodeTimerMin = 5;
      this.resetCodeTimerSec = 0;
      this.resetCodeIntervalMutate(120);
    },
    resetCodeIntervalMutate(i) {
      const int = setInterval(() => {
        const divisorForMinutes = i % (60 * 60);
        this.resetCodeTimerMin = Math.floor(divisorForMinutes / 60);
        const divisorForSeconds = divisorForMinutes % 60;
        this.resetCodeTimerSec = Math.ceil(divisorForSeconds);
        i-- || clearInterval(int);
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/Login/ConfirmCode";
@import "../styles/modules/Login/LoginForm";
</style>