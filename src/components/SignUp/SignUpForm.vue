<template>
  <div class="row">
    <div class="sign-up-form text-center">
      <span class="sign-up-form-title">ثبت نام</span>
      <Form>
        <div class="row">
          <label class="col-12 text-end label-text-input" :for="name">نام و نام خانوادگی</label>
          <Field dir="rtl" id="name" class="col-12 sign-up-form-text-input" name="name" type="text"
                 label="نام و نام خانوادگی"
                 rules="required" v-model.trim="name"/>
          <ErrorMessage class="text-danger pt-1 fw-bold text-end" name="name"/>
        </div>
        <div class="row">
          <label class="col-12 text-end label-select-input" :for="state_id">استان</label>
          <Field @click="getStates" class="col-12 sign-up-form-select-input" dir="rtl" label="استان" name="state_id"
                 as="select" v-model="state_id"
                 rules="required">
            <option class="text-end" value="" disabled>انتخاب کنید</option>
            <option v-for="item in states.data" :key="item.id" :value="item.id"
                    :selected="item.id">{{ item.name }}
            </option>
          </Field>
          <ErrorMessage class="text-danger pt-1 fw-bold text-end" name="provience"/>
        </div>
        <div class="row">
          <label class="col-12 text-end label-select-input" :for="city_id">شهر</label>
          <Field @click="getCities" dir="rtl" class="col-12 sign-up-form-select-input" label="شهر" name="city_id"
                 as="select" v-model="city_id"
                 rules="required">
            <option class="text-end" value="" disabled>انتخاب کنید</option>
            <option v-for="item in cities.data" :key="item.id" :value="item.id"
                    :selected="item.id">{{ item.name }}
            </option>
          </Field>
          <ErrorMessage class="text-danger pt-1 fw-bold text-end" name="city"/>
        </div>
        <div class="row">
          <button @click="SignUpSubmit" class="btn text-white sign-up-form-submit-button" type="submit">ورود به
            جالیزان
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
import axios from "axios";

export default {
  name: "SignUpForm",
  components: {BackButton},
  data() {
    return {
      name: '',
      state_id: null,
      city_id: null,
      cities: [],
      states: []
    }
  },
  methods: {
    SignUpSubmit() {
      let data = {
        name: this.name,
        city_id: this.city_id,
        state_id: this.state_id
      }
      this.$store.dispatch('signup', data);
    },
    getStates() {
      axios.post('states', {}).then(response => {
        if (response.status === 200) {
          this.states = response.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getCities() {
      let data = {
        state_id: this.state_id
      };
      axios.post('cities', data,).then(response => {
        if (response.status === 200) {
          this.cities = response.data
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
}
</script>

<style lang="scss">
@import "../../styles/modules/SignUp/SignUpForm";
</style>