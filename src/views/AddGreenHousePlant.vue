<template>
  <HomeLayout>
    <div class="home" v-if="loading">
      <ProgressPage/>
    </div>
    <div class="add-green-house-plant-box margin-at-mobile" v-if="!loading">
      <header class="header d-flex align-items-center">
        <span class="pointer ms-2" @click="backToPrevPage">
          <svg id="Iconly_Light_Arrow_-_Right" data-name="Iconly/Light/Arrow - Right" xmlns="http://www.w3.org/2000/svg"
               width="24" height="24" viewBox="0 0 24 24">
  <g id="Arrow_-_Right" data-name="Arrow - Right" transform="translate(4.75 17.75) rotate(-90)">
    <path id="Stroke_1" data-name="Stroke 1" d="M0,15V0" transform="translate(6.025)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M12.049,0,6.025,6.05,0,0" transform="translate(0 8.95)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
  </g>
</svg>
        </span>
        <span class="txt">افزودن گیاه</span>
      </header>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="crop"
            >نام گیاه</label
            >
            <Field v-model="crop" name="name" v-slot="{ field }">
            <VueMultiselect
                class="text-end"
                v-bind="field"
                v-model="crop"
                :options="crops"
                placeholder="انتخاب کنید"
                track-by="name"
                label="name"
                dir="rtl"
                :close-on-select="true"
                :clear-on-select="false"
                :show-labels="false"
                :allow-empty="false"
                @select="varietie=null"
            >
            </VueMultiselect>
            </Field>
            <ErrorMessage class="text-danger fw-bold mt-2" name="name"/>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="varietie"
            >رقم</label
            >
            <Field  v-model="varietie" name="varietie" v-slot="{ field }">
            <VueMultiselect
                class="text-end"
                v-bind="field"
                v-model="varietie"
                :options="varieties"
                placeholder="انتخاب کنید"
                track-by="name"
                label="name"
                dir="rtl"
                :close-on-select="true"
                :clear-on-select="false"
                :show-labels="false"
                :allow-empty="false"
                @open="this.getVarieties"
                :disabled="checkVarietiesDisabled"
            >
            </VueMultiselect>
            </Field>
            <ErrorMessage class="text-danger fw-bold mt-2" name="varietie"/>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label
                class="label-add-plant-input"
                for="irrigation_type"
            >نوع آبیاری</label
            >
            <Field v-model="irrigation_type" name="irrigation_type" v-slot="{ field }">
            <VueMultiselect
                v-bind="field"
                class="text-end"
                v-model="irrigation_type"
                :options="irrigation_types"
                placeholder="انتخاب کنید"
                track-by="name"
                label="name"
                dir="rtl"
                :close-on-select="true"
                :clear-on-select="false"
                :show-labels="false"
                :allow-empty="false"
            ></VueMultiselect>
            </Field>
            <ErrorMessage class="text-danger fw-bold mt-2" name="irrigation_type"/>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input"
            >تاریخ کشت</label
            >
            <Field
                name="date"
                v-slot="{ field }">
              <input
                  type="text"
                  dir="rtl"
                  class="w-100 add-plant-select-input"
                  v-model="date"
                  id="my-custom-input"
                  placeholder=" انتخاب کنید "
              />
              <date-picker
                  v-bind="field"
                  auto-submit
                  clearable
                  element="my-custom-input"
                  v-model="date"
              ></date-picker>
            </Field>
            <ErrorMessage class="text-danger fw-bold mt-2" name="date"/>
          </div>
          <div class="d-flex justify-content-center">
            <button v-if="!loading2 && !editMode" type="submit"
                    class="d-flex justify-content-center align-items-center border-0 submit-btn">
              <span>ادامه</span>
              <span class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(12) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.5 4.25)">
      <path id="Stroke_1" data-name="Stroke 1" d="M7,0,3.5,3.5,0,0" fill="none" stroke="#fff" stroke-linecap="round"
            stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    </g>
  </g>
</svg>
              </span>
            </button>
            <button  v-if="!loading2 && editMode" type="submit"
                    class="d-flex justify-content-center align-items-center border-0 submit-btn">
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
import moment from 'moment-jalaali'
import _ from "lodash";
import * as yup from "yup";

export default {
  name: "AddGreenHousePlant",
  components: {ProgressPage, HomeLayout, VueMultiselect},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      date: "",
      crop: null,
      varietie: null,
      irrigation_type: null,
      crops: [],
      irrigation_types: [],
      varieties: [],
      service: null,
      editMode: false,
      schema: yup.object({
        name: yup.object().required().typeError( 'پر کردن فیلد الزامی است'),
        varietie: yup.object().required().typeError( 'پر کردن فیلد الزامی است'),
        irrigation_type: yup.object().required().typeError( 'پر کردن فیلد الزامی است'),
        // date: yup.date().required().typeError( 'پر کردن فیلد الزامی است'),
      }),
    }
  },
  computed: {
    checkVarietiesDisabled() {
      return this.crop === null;
    },
  },
  props: ['serviceId', 'id'],
  mounted() {
    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[(sections.length - 1)];
    if (lastSection === 'edit') {
      this.getGreenHousePlant()
      this.editMode = true
    }
    this.getCrops();
    this.getService()
    this.getIrrigation_types()
  },
  methods: {
    onSubmit() {
      this.editMode ? this.submitGreenHousePlantEdit() : this.submitGreenHousePlant()
    },
    getService() {
      let self = this;
      this.loading = true;
      Api.getServiceInformationApi({
        id: this.serviceId,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.loading = false;
              this.service = response.data
              this.loading = false;
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response)
          });
    },
    submitGreenHousePlant() {
      this.loading2 = true;
      let self = this;
      let data = {
        greenhouse_id: this.service.id,
        crop_variety_id: this.varietie.id,
        irrigation_type_id: this.irrigation_type.id,
        crop_id: this.crop.id,
        planting_date: moment(this.date, "jYYYY/jM/jD").format("YYYY-MM-DD"),
      }
      // data = _.pickBy(data, _.identity)
      Api.AddGreenHousePlantApi({
        data: data,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.loading2 = false;
              this.toastReturnTxt(response)
              this.$router.push(`/green-house/${this.serviceId}/information`);
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response)
            self.loading2 = false;
          });
    },
    getCrops() {
      let self = this;
      Api.getCrops({self: this})
          .then((response) => {
            if (response.status === 200) {
              self.crops = response.data.crops;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getIrrigation_types() {
      let self = this;
      Api.getIrrigationType({self: this})
          .then((response) => {
            if (response.status === 200) {
              this.irrigation_types = response.data.irrigation_types;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getVarieties() {
      let self = this;
      Api.getVarieties({crop_id: this.crop.id, self: this})
          .then((response) => {
            if (response.status === 200) {
              this.varieties = response.data.crop_varieties;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getGreenHousePlant() {
      this.loading = true;
      let self = this;
      Api.getGreenHousePlantApi({self: this, id: this.id})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.crop = data.crop
              this.varietie = data.crop_variety
              this.irrigation_type = data.irrigation_type
              this.date = moment(data.planting_date, "YYYY-M-D").format("jYYYY/jMM/jDD")
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response)
            self.loading = false;
          });
    },
    submitGreenHousePlantEdit() {
      let data = {
        greenhouse_id: this.service.id,
        crop_variety_id: this.varietie.id,
        irrigation_type_id: this.irrigation_type.id,
        crop_id: this.crop.id,
        planting_date: moment(this.date, "jYYYY/jM/jD").format("YYYY-MM-DD"),
        _method: 'patch'
      }
      data = _.pickBy(data, _.identity);
      this.loading2 = true;
      let self = this;
      Api.editGreenHousePlantApi({self: this, data: data, id: this.id})
          .then((response) => {
            if (response.status === 200) {
              this.loading2 = false;
              this.toastReturnTxt(response)
              this.$router.push(`/green-house/${this.serviceId}/information`)
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response)
            self.loading2 = false;
          });
    }
  }

}
</script>

<style lang="scss">
@import "../styles/modules/AddGreenHousePlant/AddGreenHousePlant";
</style>