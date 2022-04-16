<template>
  <HomeLayout>
    <div v-if="loading">
      <ProgressPage />
    </div>
    <div v-if="!loading" class="margin-at-mobile add-plant">
      <div class="border-bottom pb-3">
        <div>
          <div class="add-plant-title">
            <span @click="backToPrevPage" class="pointer ms-2">
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
            ویرایش گیاه
          </div>
        </div>
      </div>
      <Form>
        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="crop">نام گیاه</label>
            <VueMultiselect
              class="text-end"
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
            >
            </VueMultiselect>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="varietie">رقم</label>
            <VueMultiselect
              class="text-end"
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
              :disabled="checkVarietiesDisabled"
            >
            </VueMultiselect>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="irrigation_type"
              >نوع آبیاری</label
            >
            <VueMultiselect
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
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input">تاریخ کشت</label>
            <input
              type="text"
              dir="rtl"
              class="w-100 add-plant-select-input"
              v-model="date"
              id="my-custom-input"
              placeholder=" انتخاب کنید "
            />
            <date-picker
              auto-submit
              clearable
              element="my-custom-input"
              v-model="date"
            ></date-picker>
          </div>
        </div>
      </Form>

      <!--      <div class="position-relative mt-5">-->
      <!--        <div class="map-title mb-4">-->
      <!--          ویرایش موقعیت جغرافیایی گیاه-->
      <!--        </div>-->
      <!--        <div ref="map-root" class="map"></div>-->
      <!--        <section class="p-0">-->
      <!--          <div>-->
      <!--            <div class="map-button">-->
      <!--              <button class="btn map-button-content" @click="submitLocation">-->
      <!--                ثبت موقعیت-->
      <!--              </button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class=" map-tools">-->
      <!--            <div class="map-icon" @click="drawPolygon">-->
      <!--              <font-awesome-icon icon="draw-polygon" color="#9a9ca1" />-->
      <!--            </div>-->
      <!--            <div class="map-icon" @click="deletePolygon">-->
      <!--              <font-awesome-icon icon="trash" color="#9a9ca1" />-->
      <!--            </div>-->
      <!--            <div class="map-icon" @click="undoPolygon">-->
      <!--              <font-awesome-icon icon="undo" color="#9a9ca1" />-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </section>-->
      <!--      </div>-->
      <div>
        <div class="d-flex justify-content-center">
          <button
            class="btn text-white add-plant-button"
            v-if="!loading"
            @click="AddPlantSubmit"
          >
            ویرایش گیاه
          </button>
          <Loading v-if="loading" />
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { addPlantValidation } from "../mixins/addPlantValidation";
import Api from "../common/api";
import { globalMixin } from "../mixins/globalMixin";
import { mapMixin } from "../mixins/mapMixin";
import VueMultiselect from "vue-multiselect";
import ProgressPage from "../components/UI/ProgressPage";
import moment from "moment-jalaali";

export default {
  name: "EditPlant",
  components: { ProgressPage, HomeLayout, VueMultiselect },
  mixins: [globalMixin, mapMixin, addPlantValidation],
  inject: ["$axios"],
  data() {
    return {
      crops: [],
      irrigation_types: [],
      varieties: [],
      farm_id: null,
      crop: null,
      irrigation_type: null,
      varietie: null,
      date: null,
    };
  },
  props: ["serviceId"],
  computed: {
    checkVarietiesDisabled() {
      return this.crop === null;
    },
  },
  watch: {
    crop(newValue) {
      // this.varietie=null
      this.getVarieties(newValue.id);
    },
  },
  methods: {
    plantInformationData() {
      Api.getPlantInformationDataApi({ self: this, id: this.serviceId })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data.plant;
            this.loading = false;
            this.farm_id = data.farm_id;
            let crop = data.crop;
            this.crop = this.crops.find((item) => item.name === crop);
            this.getVarieties(this.crop.id);
            this.irrigation_type = data.irrigation_type;
            (this.date = moment(data.planting_date, "YYYY-M-D").format(
              "jYYYY/jMM/jDD"
            )),
              (this.varietie = data.crop_variety);

            // this.getFarm(data.farm_id);
            // this.showCreatedFarm(
            //     data.shape.coordinates,
            //     data.center.coordinates
            // );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFarm(id) {
      let self = this;
      Api.getFarmInfoApi({ farm: id, self: this })
        .then((response) => {
          if (response.status === 200) {
            self.farmLoading = false;
            let data = response.data.farm;
            this.showCreatedFarm(
              data.shape.coordinates,
              data.center.coordinates,
              false,
              `farm${data.service_id}`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCrops() {
      Api.getCrops({ self: this })
        .then((response) => {
          if (response.status === 200) {
            this.crops = response.data.crops;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIrrigation_types() {
      Api.getIrrigationType({ self: this })
        .then((response) => {
          if (response.status === 200) {
            this.irrigation_types = response.data.irrigation_types;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getVarieties(id) {
      Api.getVarieties({ crop_id: id, self: this })
        .then((response) => {
          if (response.status === 200) {
            this.varieties = response.data.crop_varieties;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddPlantSubmit() {
      let data = {
        farm_id: this.farm_id,
        variety_id: this.varietie.id,
        irrigation_type_id: this.irrigation_type.id,
        planting_date: moment(this.date, "jYYYY/jM/jD").format("YYYY-MM-DD"),
        // shape: payload.finalPolygonArray,
        // center: payload.polygonCenter
      };
      Api.editPlantApi({ data: data, self: this })
        .then((response) => {
          if (response.status === 200) {
            this.toastReturnTxt(response);
            this.loading = false;
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
          this.loading = false;
        });
    },
  },
  created() {
    this.loading = true;
    this.getCrops();
    this.getIrrigation_types();
    this.plantInformationData();
  },
  mounted() {
    // this.loadMap();
  },
};
</script>

<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "../styles/modules/LandAndPlantRegistration/AddPlant";
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>