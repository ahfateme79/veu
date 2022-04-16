<template>
  <HomeLayout>
    <div class="margin-at-mobile add-farm">
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
            <span v-if="!editMode">افزودن مزرعه</span>
            <span v-else>ویرایش مزرعه</span>
          </div>
        </div>
      </div>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="d-flex flex-column">
          <label class="label-add-farm-input" :for="farmTitle"
            >عنوان مزرعه</label
          >
          <Field
            class="add-farm-input"
            name="name"
            type="text"
            v-model="farmTitle"
          />
          <ErrorMessage class="text-danger fw-bold mt-2" name="name" />
        </div>
        <div class="position-relative mt-5">
          <div class="map-title mb-4">موقعیت مکانی مزرعه</div>
          <div
            ref="map-root"
            class="col-12 map"
            @click="editMode && modifyShap(`farm${serviceId}`, 'Polygon')"
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
              <span class="overlay-value">{{overlayValue}} </span>
              <!-- <div class="overlay-value">کلیک کنید</div> -->
            </div>
          </div>
          <section>
            <div class="map-tools" style="right: 0.75%; top: 16%;">
                <div class="map-icon" @click="deletePolygon">
                <font-awesome-icon icon="trash" color="#9a9ca1" />
              </div>
              <div class="map-icon" @click="drawPolygon" >
                <font-awesome-icon icon="draw-polygon" color="#9a9ca1" />
              </div>
              <!-- <div class="map-icon" @click="modifyPolygon">
              <font-awesome-icon icon="edit" color="#9a9ca1" />
            </div> -->
            </div>
          </section>
        </div>
        <div>
          <div class="d-flex justify-content-center">
            <button
              class="d-flex align-items-center btn text-white add-farm-button"
              v-if="!loading && !editMode"
            >
              <span class="ms-1"> ثبت و ادامه</span>
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
            <button
              class="d-flex align-items-center btn text-white add-farm-button"
              v-if="!loading && editMode"
            >
              <span class="ms-1"> ویرایش</span>
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
import { addFarmValidation } from "../mixins/addFarmValidation";
import { mapMixin } from "../mixins/mapMixin";
import { globalMixin } from "../mixins/globalMixin";
import Api from "../common/api";
import _ from "lodash";
import * as yup from "yup";

export default {
  name: "AddFarm",
  components: { HomeLayout },
  mixins: [addFarmValidation, mapMixin, globalMixin],
  inject: ["$axios"],
  props: ["serviceId"],
  data() {
    return {
      farmTitle: "",
      options: [{ country: "Canada", code: "CA" }],
      farm: null,
      editMode: false,
      mapOptions: {
        point: [53.688, 32.4279],
        zoom: 5,
        hasSearchBar: true,
      },
      schema: yup.object({
        name: yup.string().required(),
      }),
    };
  },
  mounted() {
    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[sections.length - 1];
    if (lastSection === "edit") {
      this.getFarm();
      return (this.editMode = true);
    } else {
      this.loadMap({
        point: [
          JSON.parse(localStorage.getItem("user")).city.lng,
          JSON.parse(localStorage.getItem("user")).city.lat,
        ],
        zoom: 15,
        hasSearchBar: true,
      });
    }
  },
  methods: {
    onSubmit() {
      if (this.editMode) this.editFarm();
      else this.createFarm();
    },
    createFarm() {
      this.loading = true;
      if (this.polygonArray.length > 0) {
        this.formatLocationData();
        let data = {
          name: this.farmTitle,
          shape: this.finalPolygonArray,
          center: this.polygonCenter,
          self: this,
        };
        Api.createFarmApi({ data: data })
          .then((response) => {
            this.farm = response.data.farm;
            this.loading = false;
            this.$router.push({
              path: `/farm/${response.data.farm.service_id}/plant/create`,
            });
            this.toastReturnTxt(response);
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.toast.error(
          "ابتدا موقعیت گیاه خود را بر روی نقشه ترسیم کنید",
          this.toastOptions
        );
      }
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
            let farm = response.data;
            this.farmTitle = farm.name;
            self.polygonArray = farm.shape.coordinates;
            farm.shape.coordinates[0].map((item) => {
              let obj = {};
              obj.lat = item[1];
              obj.lng = item[0];
              this.finalPolygonArray.push(obj);
            });
            this.polygonCenter = {
              lat: farm.center.coordinates[1],
              lng: farm.center.coordinates[0],
            };
            this.mapOptions.zoom = farm.area !== null && farm.area.unit === 'هکتار'
               ?15 : 19;
            this.mapOptions.point = _.toArray(farm.center.coordinates);
            this.farm = farm;
            this.loadMap(this.mapOptions);
            this.showCreatedFarm(
              farm.shape.coordinates,
              farm.center.coordinates,
              false,
              `farm${farm.service_id}`,
               self.editMode
                    ? "rgba(60, 179, 113, 0.8)"
                    : "rgba(250, 250, 250, 0.6)",
              farm.center.coordinates
            );

            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
          // this.toastReturnTxt(error.response);
        });
    },
    editFarm() {
      this.loading = true;
      if (this.polygonArray.length > 0) {
        this.formatLocationData();
        let data = {
          name: this.farmTitle,
          shape: this.finalPolygonArray,
          center: this.polygonCenter,
          _method: "PATCH",
        };
        data = _.pickBy(data, _.identity);

        Api.editFarmApi({ self: this, data: data, id: this.farm.id })
          .then((response) => {
            if (response.status === 200) {
              this.loading = false;
              this.toastReturnTxt(response);
              this.$router.push(`/farm/${this.serviceId}/information`);
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error);
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.toast.error(
          "ابتدا موقعیت گیاه خود را بر روی نقشه ترسیم کنید",
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
@import "../styles/modules/LandAndPlantRegistration/AddFarm";
//@import "vue-select/src/scss/vue-select.scss";
</style>
<style>
.ol-geocoder.gcd-gl-container {
  padding: 12px 8px;
  display: flex;
  align-items: center;
  margin: -55px auto 0 auto;
  width: 448px;
  height: 48px;
  background-color: #fff;
  overflow: unset;
  border-radius: 8px;
  border: 1px solid #eaecf1;
  position: relative;
}

@media (max-width: 767px) {
  .ol-geocoder.gcd-gl-container {
    width: 238px;
  }
}

.ol-geocoder.gcd-gl-container .ol-control button {
  background-color: unset;
}

.ol-geocoder .gcd-gl-btn {
  background-image: url("../assets/icon/Iconly-Light-Search.png");
}

.ol-geocoder .gcd-gl-input,
.ol-geocoder.gcd-gl-container .ol-control button {
  position: unset !important;
}

.ol-geocoder .gcd-gl-input:focus {
  box-shadow: unset;
}

.ol-geocoder .gcd-gl-input {
  border: unset;
  width: 100%;
}

.ol-geocoder .gcd-gl-control {
  overflow: unset;
  display: flex;
  align-items: center;
  width: unset;
  height: unset;
}

.ol-geocoder ul.gcd-gl-result {
  position: absolute;
  top: 3.2875em;
  width: unset;
}
.overlay-value {
  color: #fff;
  padding: 10px;
  font-size: 10px;
}
.area-value {
  color: #fff;
  padding: 10px;
  font-size: 20px;

}
/*.ol-geocoder.gcd-gl-container{*/
/*  left: 2.5em !important;*/
/*  top: 3.975em !important;*/
/*}*/
/*.ol-geocoder .gcd-gl-control{*/
/*  width: 1.9875em;*/
/*  height: 1.9875em;*/
/*}*/
</style>

