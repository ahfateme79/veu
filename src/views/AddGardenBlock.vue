<template>
  <HomeLayout>
    <div class="margin-at-mobile add-plant">
      <div class="border-bottom pb-3">
        <div class="row">
          <div class="add-plant-title col-md-8">
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
            <span>
              {{ editMode ? "ویرایش قطعه" : "افزودن قطعه" }}
            </span>
            <!-- <span v-if="name"> {{ name }}</span> -->
          </div>
          <div class="col-md-4" v-if="editMode">
            <button
              v-if="gardenBlockId !== null"
              class="btn btn-outline-primary fa-pull-left btn-sm"
              @click="
                goAnotherPage(
                  `/garden/${serviceId}/block/${gardenBlockId}/blockLines`
                )
              "
            >
              تنظیمات ردیف
            </button>
          </div>
        </div>
      </div>
      <div>
        <Form @submit="onSubmit" :validation-schema="schema">
          <div class="row">
            <div class="col-md-6 col-12 mb-3">
              <label class="label-add-plant-input" for="crop">نام قطعه</label>
              <Field
                class="add-farm-input w-100"
                type="text"
                v-model="name"
                name="name"
              />
              <ErrorMessage class="text-danger fw-bold" name="name" />
            </div>
            <div class="col-md-6 col-12 mb-3">
              <label class="label-add-plant-input" for="varietie"
                >نوع درخت</label
              >
              <Field v-model="selectedTree" name="tree" v-slot="{ field }">
                <VueMultiselect
                  class="text-end"
                  v-bind="field"
                  v-model="selectedTree"
                  :options="trees"
                  placeholder="انتخاب کنید"
                  track-by="id"
                  label="name"
                  dir="rtl"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :show-labels="false"
                  :allow-empty="false"
                ></VueMultiselect>
              </Field>
              <ErrorMessage class="text-danger fw-bold" name="tree" />
            </div>
            <div class="col-md-6 col-12 mb-3">
              <label class="label-add-plant-input" for="crop">
                تعداد درختان</label
              >
              <Field
                class="add-farm-input w-100"
                name="trees_count"
                type="text"
                v-model="trees_count"
              />
              <ErrorMessage
                class="text-danger pt-1 fw-bold"
                name="trees_count"
              />
            </div>
            <div class="col-md-6 col-12 mb-3">
              <label class="label-add-plant-input" for="varietie">رقم</label>
              <Field
                v-model="tree_cultivar"
                name="tree_cultivar"
                v-slot="{ field }"
              >
                <VueMultiselect
                  v-bind="field"
                  class="text-end"
                  v-model="tree_cultivar"
                  :options="treeCultivars"
                  placeholder="انتخاب کنید"
                  track-by="id"
                  label="name"
                  dir="rtl"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :show-labels="false"
                  :allow-empty="false"
                ></VueMultiselect>
              </Field>
              <ErrorMessage class="text-danger fw-bold" name="tree_cultivar" />
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
                  track-by="id"
                  label="name"
                  dir="rtl"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :show-labels="false"
                  :allow-empty="false"
                ></VueMultiselect>
              </Field>
              <ErrorMessage
                class="text-danger fw-bold"
                name="irrigation_type"
              />
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
              @click="editMode && modifyShap(`gardenblock${id}`, 'Polygon')"
              style="direction: ltr"
            >
            <!-- <div
              ref="popup-point"
              v-if="!editMode"
              class="justify-content-center"
            >
              <span class="area-value">{{polygonArea}}</span>
            </div> -->
              <div
                ref="popup-point"
                class="justify-content-center"
              >
                <span class="overlay-value">   {{overlayValue}}   </span>
                <!-- <div class="overlay-value">کلیک کنید</div> -->
              </div>
            </div>
            <section class="p-0">
              <div class="map-tools" style="right: 0.75%; top: 16%;">
                <!-- <div class="map-icon" @click="drawPolygon" v-if="!editMode">
                  <font-awesome-icon icon="draw-polygon" color="#9a9ca1" />
                </div> -->
                <div
                  class="map-icon"
                  @click="drawPolygon"
                >
                  <font-awesome-icon icon="draw-polygon" color="#9a9ca1" />
                </div>
                <div class="map-icon" @click="deletePolygon" >
                  <font-awesome-icon icon="trash" color="#9a9ca1" />
                </div>
                <!-- <div v-if="editMode" class="map-icon" @click="modifyPolygon(`gardenblock${id}`)">
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
              >
                ثبت قطعه
              </button>
              <button
                class="btn text-white add-plant-button"
                v-if="!loading && editMode"
              >
                ویرایش قطعه
              </button>
              <Loading v-if="loading" />
            </div>
          </div>
        </Form>
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
import moment from "moment-jalaali";
import _ from "lodash";
import * as yup from "yup";
export default {
  name: "AddGardenBlock",
  components: { HomeLayout, VueMultiselect },
  inject: ["$axios"],
  mixins: [addPlantValidation, globalMixin, mapMixin],
  data() {
    return {
      date: "",
      name: null,
      treeCultivars: [],
      tree_cultivar: null,
      trees: [],
      selectedTree: null,
      trees_count: null,
      irrigation_type: null,
      irrigation_types: [],
      service: null,
      garden_id: null,
      editMode: false,
      allowMultiPolygon: true,
      limitDrawing: true,
      gardenBlockId: null,
      schema: yup.object({
        name: yup.string().required().typeError("پر کردن فیلد الزامی است"),
        tree: yup.object().required().typeError("پر کردن فیلد الزامی است"),
        trees_count: yup
          .number()
          .integer()
          .positive()
          .required()
          .typeError("مقدار باید عدد باشد"),
        tree_cultivar: yup
          .object()
          .required()
          .typeError("پر کردن فیلد الزامی است"),
        irrigation_type: yup
          .object()
          .required()
          .typeError("پر کردن فیلد الزامی است"),
        // date: yup.date().required().typeError("پر کردن فیلد الزامی است"),
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
  watch: {
    selectedTree(newValue) {
      this.getTreeCultivars(newValue.id);
    },
  },
  mounted() {
    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[sections.length - 1];
    this.getFarm();
    this.getTrees();
    this.getIrrigation_types();
    if (lastSection === "edit") {
      this.getFarmPlant();
      // this.getFarm();
      return (this.editMode = true);
    }
  },
  methods: {
    onSubmit() {
      this.editMode ? this.EditPlantSubmit() : this.AddPlantSubmit();
    },
    getTreeCultivars(id) {
      let self = this;
      Api.getTreeCultivars({ self: this, id: id })
        .then((response) => {
          if (response.status === 200) {
            self.treeCultivars = response.data.treeCultivars;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    getTrees() {
      let self = this;
      Api.getTrees({ self: this })
        .then((response) => {
          if (response.status === 200) {
            this.trees = response.data.trees;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
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
            self.loading = false;
            let data = response.data;
            let polygonArray = [];
            this.service = data;
            this.farm_id = data.id;
            this.subServices = data.subServices;
            this.loadMap({
              hasSearchBar: false,
              point: [data.center.coordinates[0], data.center.coordinates[1]],
              zoom: data.area !== null && data.area.unit === 'هکتار'
               ?15 : 19,
            });

            this.showCreatedFarm(
              data.shape.coordinates,
              data.center.coordinates,
              false,
              `garden${data.service_id}`
            );
            if (data.sub_services.length > 0) {
              data.sub_services.map((item) => {
                this.showCreatedFarm(
                  item.shape.coordinates,
                  item.center.coordinates,
                  true,
                  `gardenblock${item.id}`,
                  item.id == self.id
                    ? "rgba(60, 179, 113, 0.8)"
                    : "rgba(250, 250, 250, 0.6)",
                  item.id == self.id ? item.center.coordinates : null
                );
                if (item.id == self.id) polygonArray = item.shape.coordinates
              });
            }
            this.polygonArray = polygonArray;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
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
    AddPlantSubmit() {
      this.loading = true;
      let self = this;
      if (this.polygonArray.length > 0) {
        this.formatLocationData();
        let data = {
          name: this.name,
          garden_id: this.farm_id,
          trees_count: this.trees_count,
          tree_id: this.selectedTree !== null ? this.selectedTree.id : null,
          tree_cultivar_id:this.tree_cultivar !== null ?  this.tree_cultivar.id: null,
          irrigation_type_id:this.irrigation_type !== null ? this.irrigation_type.id : null,
          planting_date:this.date !== ''? moment(this.date, "jYYYY/jM/jD").format("YYYY-MM-DD") :'',
          shape: this.finalPolygonArray,
          center: this.polygonCenter,
        };
        data = _.pickBy(data, _.identity);
        Api.createBlockApi({
          data: data,
          self: this,
        })
          .then((response) => {
            if (response.status === 200) {
              self.loading = false;
              this.toastReturnTxt(response);

              this.gardenBlockId = response.data.garden_block.id;
              this.goAnotherPage(
                `/garden/${this.serviceId}/block/${response.data.garden_block.id}/blockLines`
              );
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
            self.loading = false;
          });
      } else {
        this.loading = false;
        this.toast.error(
          "ابتدا موقعیت گیاه خود را بر روی نقشه ترسیم کنید",
          this.toastOptions
        );
      }
    },
    getFarmPlant() {
      this.loading = true;
      let self = this;
      Api.getGardenBlockApi({ self: this, id: this.id })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            self.loading = false;
            self.name = data.name;
            self.irrigation_type = data.irrigation_type;
            self.tree_cultivar = data.tree_cultivar;
            self.selectedTree = data.tree;
            self.trees_count = data.trees_count;
            self.date = moment(data.planting_date, "YYYY-M-D").format(
              "jYYYY/jMM/jDD"
            );
            data.shape.coordinates[0].map((item) => {
              let obj = {};
              obj.lat = item[1];
              obj.lng = item[0];
              self.finalPolygonArray.push(obj);
            });
            self.polygonCenter = {
              lat: data.center.coordinates[1],
              lng: data.center.coordinates[0],
            };
            self.gardenBlockId = data.id;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    EditPlantSubmit() {
      this.loading = true;
      if (this.polygonArray.length > 0) {
        this.formatLocationData();
        let data = {
          name: this.name,
          garden_id: this.farm_id,
          trees_count: this.trees_count,
          tree_id:this.selectedTree !== null ? this.selectedTree.id : null,
          tree_cultivar_id: this.tree_cultivar !== null ? this.tree_cultivar.id : null,
          irrigation_type_id: this.irrigation_type !== null ? this.irrigation_type.id: null,
          planting_date:this.date !== null ? moment(this.date, "jYYYY/jM/jD").format("YYYY-MM-DD") : '',
          shape: this.finalPolygonArray,
          center: this.polygonCenter,
          _method: "patch",
        };
        data = _.pickBy(data, _.identity);
        let self = this;
        Api.editBlockApi({ self: this, data: data, id: this.id })
          .then((response) => {
            if (response.status === 200) {
              this.loading = false;
              this.toastReturnTxt(response);
              this.$router.push(`/farm/${this.serviceId}/information`);
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
      } else {
        this.loading = false;
        this.toast.error(
          "موقعیت گیاه خود را بر روی نقشه ترسیم کنید",
          this.toastOptions
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "../styles/modules/LandAndPlantRegistration/AddPlant";
@import "../styles/modules/LandAndPlantRegistration/AddFarm";
.overlay-value {
  color: #fff;
  padding: 10px;
  font-size: 10px;
}
</style>