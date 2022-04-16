<template>
  <HomeLayout>
    <div class="margin-at-mobile add-plant">
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
            <span v-if="!editMode">افزودن گیاه</span>
            <span v-else>ویرایش گیاه</span>
          </div>
        </div>
      </div>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="crop">نام گیاه</label>
            <Field v-model="crop" name="crop" v-slot="{ field }">
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
                @select="varietie = null"
              >
              </VueMultiselect>
            </Field>
            <ErrorMessage class="text-danger fw-bold" name="crop" />
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="varietie">رقم</label>
            <Field v-model="varietie" name="varietie" v-slot="{ field }">
              <VueMultiselect
                v-bind="field"
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
                @open="this.getVarieties"
                :disabled="checkVarietiesDisabled"
              >
              </VueMultiselect>
            </Field>
            <ErrorMessage class="text-danger fw-bold" name="varietie" />
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input" for="irrigation_type"
              >نوع آبیاری</label
            >
            <Field
              v-model="irrigation_type"
              name="irrigation_type"
              v-slot="{ field }"
            >
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
            <ErrorMessage class="text-danger fw-bold" name="irrigation_type" />
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="label-add-plant-input">تاریخ کشت</label>
             <input
                type="text"
                dir="rtl"
                class="w-100 add-plant-select-input"
                v-model="date"
                v-bind="field"
                id="my-custom-input"
                placeholder=" انتخاب کنید "
              />
              <date-picker
                v-bind="field"
                auto-submit
                clearable
                element="my-custom-input"
                :max="befoureToday"
                v-model="date"
              ></date-picker>
            <!-- <Field name="date" v-slot="{ field }">
              <input
                type="text"
                dir="rtl"
                class="w-100 add-plant-select-input"
                v-model="date"
                v-bind="field"
                id="my-custom-input"
                placeholder=" انتخاب کنید "
              />
              <date-picker
                v-bind="field"
                auto-submit
                clearable
                element="my-custom-input"
                :max="befoureToday"
                v-model="date"
              ></date-picker>
            </Field>
            <ErrorMessage class="text-danger fw-bold" name="date" /> -->
          </div>
        </div>
        <div class="position-relative mt-5">
          <div class="map-title mb-4">انتخاب موقعیت جغرافیایی گیاه</div>
          <div
            ref="map-root"
            class="map"
             style="direction: ltr"
            @click="editMode && modifyShap(`plant${id}`, 'Polygon')"
          >
          
             <div
                ref="popup-point"
                class="justify-content-center"
              >
                <div class="overlay-value"> {{overlayValue}}   </div>
                <!-- <div class="overlay-value">کلیک کنید</div> -->
              </div>
              <!-- <div
              ref="popup-point"
              v-else
              class="justify-content-center"
            >
              <span class="area-value">{{polygonArea}}</span>
            </div> -->
          </div>
          <section class="p-0">
            <div class="map-tools" style="right: 0.75%; top: 16%;">
               <div class="map-icon" @click="deletePolygon">
                <font-awesome-icon icon="trash" color="#9a9ca1" />
              </div>
              <div class="map-icon" @click="drawPolygon" >
                <font-awesome-icon icon="draw-polygon" color="#9a9ca1" />
              </div>
             
              <!-- <div
              v-if="editMode"
              class="map-icon"
              @click="modifyPolygon(`plant${id}`)"
            >
              <font-awesome-icon icon="edit" color="#9a9ca1" />
            </div> -->
            </div>
          </section>
        </div>
        <div>
          <div class="d-flex justify-content-center">
            <button
              class="btn text-white add-plant-button"
              v-if="!loading && !editMode"
              @click="AddPlantSubmit"
            >
              ثبت گیاه
            </button>
            <button
              class="btn text-white add-plant-button"
              v-if="!loading && editMode"
              @click="EditPlantSubmit"
            >
              ویرایش گیاه
            </button>
            <Loading v-if="loading" />
          </div>
        </div>
      </Form>
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
import moment from "moment-jalaali";
import _ from "lodash";
import * as yup from "yup";

export default {
  name: "AddPlant",
  components: { HomeLayout, VueMultiselect },
  inject: ["$axios"],
  mixins: [addPlantValidation, globalMixin, mapMixin],
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
      farm_id: null,
      editMode: false,
      allowMultiPolygon: true,
      limitDrawing: true,
      farmPolygon: null,
      self: this,
      schema: yup.object({
        crop: yup.object().required().typeError("پر کردن فیلد الزامی است"),
        varietie: yup.object().required().typeError("پر کردن فیلد الزامی است"),
        irrigation_type: yup
          .object()
          .required()
          .typeError("پر کردن فیلد الزامی است"),
        date: yup.date().required().typeError("پر کردن فیلد الزامی است"),
      }),
    };
  },
  props: ["serviceId", "id"],
  computed: {
    checkVarietiesDisabled() {
      return this.crop === null;
    },
    befoureToday() {
      const date = new Date();
      date.setDate(date.getDate() - 4);
      return date;
    },
  },
  mounted() {
    window.scrollTo(0, 0);

    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[sections.length - 1];
    this.getFarm();
    this.getCrops();
    this.getIrrigation_types();
    if (lastSection === "edit") {
      this.getFarmPlant();
      return (this.editMode = true);
    }
  },
  methods: {
    onSubmit() {
      if (this.editMode) this.EditPlantSubmit();
      else this.AddPlantSubmit();
    },
    getFarm() {
      let self = this;
      this.loading = true;
      Api.getServiceInformationApi({
        id: this.serviceId,
        self: this,
      })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            self.loading = false;
            this.service = data;
            this.farm_id = data.id;
            this.subServices = data.sub_services;
            this.loadMap({
              hasSearchBar: false,
              point: [data.center.coordinates[0], data.center.coordinates[1]],
              zoom:  data.area !== null && data.area.unit === 'هکتار'
               ?15 : 19,
            });

            this.farmPolygon = response.data.shape.coordinates;
            this.showCreatedFarm(
              response.data.shape.coordinates,
              response.data.center.coordinates,
              false,
              `farm${response.data.service_id}`
            );
            if (data.sub_services.length > 0) {
              data.sub_services.map((item) => {
                this.showCreatedFarm(
                  item.shape.coordinates,
                  item.center.coordinates,
                  true,
                  `plant${item.id}`,
                  item.id == self.id ? 'rgba(60, 179, 113, 0.8)' : 'rgba(0, 0, 0, 0.3)',
                   item.id == self.id ? item.center.coordinates : null
                );
              });
            }
            this.loading = false;
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
        });
    },
    getCrops() {
      let self = this;
      Api.getCrops({ self: this })
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
      Api.getIrrigationType({ self: this })
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
      Api.getVarieties({ crop_id: this.crop.id, self: this })
        .then((response) => {
          if (response.status === 200) {
            this.varieties = response.data.crop_varieties;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    AddPlantSubmit() {
      this.loading = true;
      let self = this;
      if(this.polygonArray.length > 0) {
        this.formatLocationData();
      let data = {
        shape: this.finalPolygonArray,
        center: this.polygonCenter,
        farm_id: this.farm_id,
        variety_id: this.varietie !== null ? this.varietie.id : null,
        irrigation_type_id:this.irrigation_type !== null ? this.irrigation_type.id : null,
        planting_date: this.date !== ''? moment(this.date, "jYYYY/jM/jD").format("YYYY-MM-DD") : '',
        self: this,
      };
      Api.createPlantApi(data)
        .then((response) => {
          if (response.status === 200) {
            self.loading = false;
            this.toastReturnTxt(response);
            this.$router.push(`/farm/${this.serviceId}/information`);
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
          this.loading = false;
        });

      }else {
        this.loading = false;
        this.toast.error("ابتدا موقعیت گیاه خود را بر روی نقشه ترسیم کنید", this.toastOptions);

      }
      
    },
    getFarmPlant() {
      this.loading = true;
      let self =this;
      Api.getFarmPlantApi({ self: this, id: this.id })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data.plant;
            this.loading = false;
            this.crop = data.crop;
            this.varietie = data.crop_variety;
            this.irrigation_type = data.irrigation_type;
            self.date = moment(data.planting_date, "YYYY-M-D").format(
              "jYYYY/jMM/jDD"
            );
            self.polygonArray = data.shape.coordinates
            data.shape.coordinates[0].map((item) => {
              let obj = {};
              obj.lat = item[1];
              obj.lng = item[0];
              this.finalPolygonArray.push(obj);
            });
            this.polygonCenter = {
              lat: data.center.coordinates[0],
              lng: data.center.coordinates[1],
            };
          }
        })
        .catch((error) => {
          this.loading = false;
          // this.toastReturnTxt(error.response);
          console.log(error);
        });
    },
    EditPlantSubmit() {
        this.loading = true;
          if(this.polygonArray.length > 0) {
        this.formatLocationData();
             let data = {
        farm_id: this.farm_id,
        variety_id:this.varietie !== null ? this.varietie.id : null,
        irrigation_type_id:this.irrigation_type !== null ? this.irrigation_type.id : null,
        planting_date:this.date !== '' ? moment(this.date, "jYYYY/jM/jD").format("YYYY-MM-DD") :'',
        shape: this.finalPolygonArray,
        center: this.polygonCenter,
        _method: "PATCH",
      };
      data = _.pickBy(data, _.identity);
    
      Api.editPlantApi({ self: this, data: data, id: this.id })
        .then((response) => {
          if (response.status === 200) {
            this.loading = false;
            this.toastReturnTxt(response);
            this.$router.push(`/farm/${this.serviceId}/information`);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.toastReturnTxt(error.response);
        });
          }else {
              this.loading = false;
        this.toast.error("ابتدا موقعیت گیاه خود را بر روی نقشه ترسیم کنید", this.toastOptions);

          }
 
    },
  },
};
</script>
<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "../styles/modules/LandAndPlantRegistration/AddPlant";
.overlay-value {
  color: #fff;
  padding: 10px;
  font-size: 10px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
