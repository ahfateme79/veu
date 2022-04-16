<template>
  <HomeLayout>
    <div class="home" v-if="loading">
      <ProgressPage/>
    </div>
    <div class="add-green-house-box margin-at-mobile" v-if="!loading">
      <header class="header d-flex align-items-center">
        <span class="pointer ms-2" @click="backToPrevPage">
          <svg
              id="Iconly_Light_Arrow_-_Right"
              data-name="Iconly/Light/Arrow - Right"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
          >
            <g
                id="Arrow_-_Right"
                data-name="Arrow - Right"
                transform="translate(4.75 17.75) rotate(-90)"
            >
              <path
                  id="Stroke_1"
                  data-name="Stroke 1"
                  d="M0,15V0"
                  transform="translate(6.025)"
                  fill="none"
                  stroke="#919294"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
              />
              <path
                  id="Stroke_3"
                  data-name="Stroke 3"
                  d="M12.049,0,6.025,6.05,0,0"
                  transform="translate(0 8.95)"
                  fill="none"
                  stroke="#919294"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
              />
            </g>
          </svg>
        </span>
        <span class="txt">افزودن گلخانه</span>
      </header>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="name">نام گلخانه</label>
            <Field
                class="controlled-input"
                name="name"
                type="text"
                v-model="name"
                autocomplete=off>
            </Field>
            <ErrorMessage class="text-danger fw-bold" name="name"/>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="area"
            >مساحت (متر مربع)</label
            >
            <Field
                class="controlled-input"
                name="area"
                type="text"
                v-model="area"
                autocomplete=off
            />
            <ErrorMessage class="text-danger fw-bold" name="area"/>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="roof_peak_height"
            >ارتفاع تاج (سانتی متر)</label
            >
            <Field
                class="controlled-input"
                name="roof_peak_height"
                type="text"
                v-model="roof_peak_height"
                autocomplete=off
            />
            <ErrorMessage class="text-danger fw-bold" name="roof_peak_height"/>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="eave_height"
            >ارتفاع کناره (سانتی متر)</label
            >
            <Field
                id="eave_height"
                class="controlled-input"
                name="eave_height"
                type="text"
                v-model="eave_height"
                autocomplete=off
            />
            <ErrorMessage class="text-danger fw-bold" name="eave_height"/>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="state">استان</label>
            <VueMultiselect
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
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="city">شهر</label>
            <VueMultiselect
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
            >
            </VueMultiselect>
          </div>
          <div class="d-flex justify-content-center">
            <button
                v-if="!loading2 && !editMode"
                type="submit"
                class="
                d-flex
                justify-content-center
                align-items-center
                border-0
                submit-btn
              "
            >
              <span>ادامه</span>
              <span class="me-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                >
                  <g
                      id="Iconly_Light_Arrow_-_Down_2"
                      data-name="Iconly/Light/Arrow - Down 2"
                      transform="translate(12) rotate(90)"
                  >
                    <g
                        id="Arrow_-_Down_2"
                        data-name="Arrow - Down 2"
                        transform="translate(2.5 4.25)"
                    >
                      <path
                          id="Stroke_1"
                          data-name="Stroke 1"
                          d="M7,0,3.5,3.5,0,0"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="1.5"
                      />
                    </g>
                  </g>
                </svg>
              </span>
            </button>
            <button
                v-if="!loading2 && editMode"
                type="submit"
                class="
                d-flex
                justify-content-center
                align-items-center
                border-0
                submit-btn
              "
            >
              <span>ویرایش</span>
            </button>
            <Loading v-if="loading2"/>
          </div>
        </div>
      </Form>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import ProgressPage from "../components/UI/ProgressPage";
import {globalMixin} from "../mixins/globalMixin";
import Api from "../common/api";
import VueMultiselect from "vue-multiselect";
import _ from "lodash";
import * as yup from "yup";

export default {
  name: "AddGreenHouse",
  components: {ProgressPage, HomeLayout, VueMultiselect},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      name: null,
      area: null,
      roof_peak_height: null,
      eave_height: null,
      state: null,
      city: null,
      states: [],
      cities: [],
      editMode: false,
      greenHouseId: null,
      schema: yup.object({
        name: yup.string().required().typeError('پر کردن فیلد الزامی است'),
        area: yup.number().required().typeError('مقدار باید عدد باشد'),
        eave_height: yup.number().required().typeError('مقدار باید عدد باشد'),
        roof_peak_height: yup.number().required().typeError('مقدار باید عدد باشد'),
      }),
    };
  },
  props: ["serviceId"],
  mounted() {
    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[(sections.length - 1)];
    if (lastSection === 'edit') {
      this.getGreenHouse()
      this.editMode = true
    }
    this.getStates();
    let user = JSON.parse(localStorage.getItem("user"));
    this.city = user.city;
    this.state = user.state;
  },
  watch: {
    state(newValue) {
      this.getCities(newValue);
    },
  },
  methods: {
    onSubmit() {
      this.editMode ? this.submitGreenHouseEdit() : this.submitGreenHouse()
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
    submitGreenHouse() {
      this.loading2 = true;
      let data = {
        name: this.name,
        area: this.area,
        roof_peak_height: this.roof_peak_height,
        eave_height: this.eave_height,
        state_id: this.state.id,
        city_id: this.city.id,
      };
      data = _.pickBy(data, _.identity);
      Api.AddGreenHouseApi({self: this, data: data})
          .then((response) => {
            if (response.status === 200) {
              this.loading2 = false;
              this.toastReturnTxt(response);
              this.goAnotherPage({
                name: "AddGreenHousePlant",
                params: {
                  serviceId: response.data.greenhouse.service_id,
                },
              });
            }
          })
          .catch((error) => {
            this.loading2 = false;
            this.toastReturnTxt(error.response);
          });
    },
    getGreenHouse() {
      Api.getServiceInformationApi({self: this, id: this.serviceId})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.name = data.name;
              this.greenHouseId = data.id
              this.area = data.area.area;
              this.roof_peak_height = data.roof_peak_height;
              this.eave_height = data.eave_height;
              this.state = data.state;
              this.city = data.city;
            }
          })
          .catch((error) => {
            this.loading = false;
            this.toastReturnTxt(error.response);
          });
    },
    submitGreenHouseEdit() {
      this.loading2 = true;
      let data = {
        name: this.name,
        area: this.area,
        roof_peak_height: this.roof_peak_height,
        eave_height: this.eave_height,
        state_id: this.state.id,
        city_id: this.city.id,
        _method: 'PATCH'
      };
      data = _.pickBy(data, _.identity);
      Api.EditGreenHouseApi({self: this, data: data, id: this.greenHouseId})
          .then((response) => {
            if (response.status === 200) {
              this.loading2 = false;
              this.toastReturnTxt(response);
              this.$router.push(`/green-house/${this.serviceId}/information`)
            }
          })
          .catch((error) => {
            this.loading2 = false;
            this.toastReturnTxt(error.response);
          });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/AddGreenHouse/AddGreenHouse";
</style>