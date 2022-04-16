<template>
  <LoginLayout :withRightImg="true">
    <div v-if="showLogin">
      <div class="login-page login-form text-center">
        <div class="login-form-title">ورود به حساب کاربری</div>
        <Form @submit="loginSubmit">
          <div class="d-flex flex-column">
            <label class="label-input" for="cellphone">
              {{ $t("message.loingEnterPhone") }}
            </label>
            <Field
                class="login-form-text-input"
                name="cellphone"
                type="text"
                :rules="validateCellphone"
                v-model="cellphone"
                autocomplete=off
            />
            <ErrorMessage
                class="text-danger text-right fw-bold"
                name="cellphone"
            />
          </div>
          <div>
            <button
                class="w-100 btn text-white login-form-submit-button"
                v-if="!loading"
            >
              ورود به جالیزان
            </button>
            <Loading v-if="loading"/>
          </div>
          <div class=" justify-content-center">
            <div class=" privacy text-center">
              با ورود و یا ثبت نام در جالیزان شما
              <span class="privacy-text" @click="showPrivacy = true">شرایط و قوانین</span>
              استفاده از آن را می پذیرید
            </div>
          </div>
        </Form>
        <BaseDialog :show="showPrivacy" title="شرایط و قوانین استفاده از جالیزان" @close="showPrivacy = false">
          <p class="text-right">{{ $t("message.textPrivacy") }}</p>
        </BaseDialog>
      </div>
    </div>
    <div v-else>
      <confirm-code :cellphone="cellphone"/>
    </div>
  </LoginLayout>
</template>

<script>
import {loginValidation} from "../mixins/loginValidation";
import {globalMixin} from "../mixins/globalMixin";
import Api from "../common/api";
import BaseDialog from "../components/UI/BaseDialog";
import LoginLayout from "../layout/LoginLayout";
import ConfirmCode from './ConfirmCode'

export default {
  name: "Login",
  mixins: [loginValidation, globalMixin],
  inject: ["$axios"],
  components: {LoginLayout, BaseDialog, ConfirmCode},
  data() {
    return {
      cellphone: "",
      showPrivacy: false,
      showLogin: true,

    };
  },
  methods: {
    loginSubmit() {
      this.loading = true;
      let self = this;
      Api.loginApi({
        cellphone: this.cellphone,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.loading = false;
              this.showLogin = false
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/Login/Login";
@import "../styles/modules/Login/LoginForm";
</style>