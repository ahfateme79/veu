<template>
  <LoginLayout :withRightImg="true">
    <div class="sign-up-form text-center">
      <span class="sign-up-form-title">ثبت نام</span>
      <Form class="form" @submit="SignUpSubmit" :validation-schema="schema">
        <div class="d-flex flex-column">
          <label class="label-text-input" for="name"
          >نام و نام خانوادگی </label
          >
          <Field
              id="name"
              class="sign-up-form-text-input"
              name="name"
              type="text"
              v-model="name"
              autocomplete=off
          />
          <ErrorMessage
              class="text-danger pt-1 mb-3 fw-bold text-end"
              name="name"
          />
        </div>
        <div class="d-flex flex-column">
          <label
              class="label-select-input mt-3"
              for="state_id"
          >استان</label
          >
          <Field v-model="state" name="state" v-slot="{ field }">
          <VueMultiselect
              v-bind="field"
              class="text-end"
              v-model="state"
              :options="states"
              placeholder="انتخاب کنید"
              track-by="id"
              label="name"
              dir="rtl"
              :close-on-select="true"
              :clear-on-select="false"
              :show-labels="false"
              :allow-empty="false"
          >
          </VueMultiselect>
          </Field>
          <ErrorMessage class="text-danger pt-1 mb-3 fw-bold text-end" name="state"/>
        </div>
        <div class="d-flex flex-column">
          <label
              class="label-select-input mt-3"
              for="city_id"
          >شهر</label
          >
          <Field v-model="city" name="city" v-slot="{ field }">
            <VueMultiselect
                v-bind="field"
                class="text-end"
                v-model="city"
                :options="cities"
                placeholder="انتخاب کنید"
                track-by="id"
                label="name"
                dir="rtl"
                :close-on-select="true"
                :clear-on-select="false"
                :show-labels="false"
                :allow-empty="false"
                @open="getCities"
            >
            </VueMultiselect>
          </Field>
          <ErrorMessage class="text-danger pt-1 mb-3 fw-bold text-end" name="city"/>
        </div>
        <div class="d-flex">
          <button
              class="btn w-100 text-white sign-up-form-submit-button"
              v-if="!loading"
          >
            ورود به جالیزان
          </button>
          <Loading v-if="loading"/>
        </div>
      </Form>
    </div>
  </LoginLayout>
</template>
<script>
import {loginValidation} from "../mixins/loginValidation";
import {globalMixin} from "../mixins/globalMixin";
import Api from "../common/api";
import LoginLayout from "../layout/LoginLayout";
import VueMultiselect from "vue-multiselect";
import * as yup from "yup";

export default {
  name: "SignUp",
  components: {LoginLayout, VueMultiselect},
  mixins: [loginValidation, globalMixin],
  inject: ["$axios"],
  data() {
    return {
      name: "",
      state: null,
      city: null,
      cities: [],
      states: [],
      schema: yup.object({
        name: yup.string().required().typeError( 'پر کردن فیلد الزامی است'),
        city: yup.object().required().typeError( 'پر کردن فیلد الزامی است'),
        state: yup.object().required().typeError( 'پر کردن فیلد الزامی است'),
      })
    };
  },
  watch: {
    state(newValue) {
      this.getCities(newValue);
    }
  },
  mounted() {
    let token = localStorage.getItem('token')

    if (token) {
      this.getStates();
    }
  },
  methods: {
    SignUpSubmit() {
      this.loading = true;
      let self = this;
      Api.signUpApi({
        name: this.name,
        city_id: this.city.id,
        state_id: this.state.id,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.loading = false;
              this.getProfile()
            }
          })
          .catch((error) => {
            self.loading = false;
            self.handleError(self, error);
          });
    },
    getStates() {
      let self = this;
      Api.getStates({self: this})
          .then((response) => {
            if (response.status === 200) {
              self.states = response.data.data;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getCities(value) {
      let self = this;
      Api.getCitiesApi({
        state_id: value.id,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.cities = response.data.data;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getProfile() {
      this.loading = true;
      let self = this;
      Api.getProfileApi({self: this})
          .then((response) => {
            if (response.status === 200) {
              this.loading = false;
              localStorage.setItem('user', JSON.stringify(response.data));
              localStorage.setItem('userName', response.data.name);
              localStorage.setItem('userAvatar', response.data.avatar)
              self.$router.push({name: "ServiceSelection"});

            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    }
  },
};
</script>

<style lang="scss">
@import "../styles/modules/SignUp/SignUpForm";
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>