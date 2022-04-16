<template>
  <div class="row">
    <div class="login-form text-center">
      <span class="login-form-title">ورود به حساب کاربری</span>
      <Form>
        <div class="row">
          <label class="col-12 text-end label-input" :for="cellphone">
            شماره موبایل خود را وارد کنید
          </label>
          <Field class="col-12 login-form-text-input" name="cellphone" type="text" rules="required"
                 v-model.trim="cellphone"/>
          <ErrorMessage class="text-danger pt-1 fw-bold text-end" name="cellphone"/>
        </div>

        <div class="row">
          <button class="btn text-white login-form-submit-button" type="button" @click="LoginSubmit">ورود به جالیزان
          </button>
        </div>
      </Form>
    </div>
    <div class="row px-0">
      <div class="col-12 px-0 text-end">
        <BackButton/>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "../UI/BackButton";

export default {
  name: "LoginForm",
  components: {BackButton},
  data() {
    return {
      cellphone: ''
    };
  },
  methods: {
    LoginSubmit() {
      let data = {
        cellphone: this.cellphone
      }
      this.$store.dispatch('login', data);
    }
  },
}
</script>

<style lang="scss">
@import "../../styles/modules/Login/LoginForm";
</style>