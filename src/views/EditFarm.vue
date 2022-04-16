<template>
  <HomeLayout>
    <div class="container add-farm">
      <div class="border-bottom pb-3">
        <div>
          <div class="add-farm-title">
            <span @click="backToPrevPage" class="ms-2 pointer">
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
            <span>ویرایش مزرعه</span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column">
        <label class="label-add-farm-input" for="name">عنوان مزرعه</label>
        <Field
          v-if="farm !== null"
          id="name"
          class="col-12 add-farm-input"
          name="farmName"
          type="text"
          v-model="farm.name"
        />
        <ErrorMessage
          class="text-danger pt-1 fw-bold text-end"
          name="farmTitle"
        />
      </div>
      <div class="position-relative mt-5">
        <div class="map-title mb-4">موقعیت مکانی مزرعه</div>
        <div ref="map-root" class="col-12 map"></div>
        <section>
          <div>
            <div class="map-button">
              <button class="btn map-button-content" @click="submitLocation">
                ثبت موقعیت مزرعه
              </button>
            </div>
          </div>
          <div class="map-tools">
            <div class="map-icon" @click="drawPolygon">
              <font-awesome-icon icon="draw-polygon" color="#9a9ca1" />
            </div>
            <div class="map-icon" @click="deleteShapeOnMap">
              <font-awesome-icon icon="trash" color="#9a9ca1" />
            </div>
            <div class="map-icon" @click="undoPolygon">
              <font-awesome-icon icon="undo" color="#9a9ca1" />
            </div>
          </div>
        </section>
      </div>
      <div>
        <div class="d-flex justify-content-center">
          <button
            class="d-flex align-items-center btn text-white add-farm-button"
            v-if="!loading"
            @click="editFarm"
          >
            <span class="ms-1">ویرایش</span>
            <span>
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
          <Loading v-if="loading" />
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { addFarmValidation } from "../mixins/addFarmValidation";
import { mapMixin } from "../mixins/mapMixin";
import { globalMixin } from "../mixins/globalMixin";
import Api from "../common/api";

export default {
  name: "EditFarm",
  components: { HomeLayout },
  mixins: [addFarmValidation, mapMixin, globalMixin],
  inject: ["$axios"],
  props: ["serviceId"],
  data() {
    return {
      options: [{ country: "Canada", code: "CA" }],
      farm: {
        name: "",
      },
    };
  },
  mounted() {
    this.loadMap();
    this.getFarm();
  },
  methods: {
    getFarm() {
      let self = this;
      Api.getServiceInformationApi({ id: this.serviceId, self: this })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.farm = data;
            this.showCreatedFarm(
              data.shape.coordinates,
              data.center.coordinates,
              false,
              `farm${response.data.service_id}`
            );
          }
        })
        .catch((error) => {
          this.farmLoading = false;
          self.handleError(self, error);
        });
    },
    editFarm() {
      let self = this;
      this.loading = true;
      const data = {
        name: this.farm.title,
        shape: this.finalPolygonArray,
        center: this.polygonCenter,
        self: this,
      };
      Api.editFarmInfoApi({ farm: data, id: this.farm.id, self: this })
        .then((response) => {
          if (response.status === 200) {
            // let data = response.data.farm;
            // this.farm=data;
            this.loading = false;
            // this.showCreatedFarm(
            //     data.shape.coordinates,
            //     data.center.coordinates
            // );
          }
        })
        .catch((error) => {
          this.farmLoading = false;
          self.handleError(self, error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "../styles/modules/LandAndPlantRegistration/AddFarm";
//@import "vue-select/src/scss/vue-select.scss";
</style>