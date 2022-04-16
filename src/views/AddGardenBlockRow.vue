<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div v-if="!loading" class="margin-at-mobile add-garden-block-row">
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
            <span>{{ blockName }}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="position-relative mt-5">
          <div class="map-title mb-4">انتخاب موقعیت جغرافیایی گیاه</div>
          <div
            ref="map-root"
            class="map"
            @click="editMode && modifyShap(`line${id}`, 'Line')"
            style="direction: ltr"
          >
            <!-- <div
              ref="popup-point"
              v-if="!editMode"
              class="justify-content-center"
            >
              <span class="area-value">{{lineLength}}</span>
            </div> -->
            <div ref="popup-point" class="justify-content-center">
              <span class="overlay-value"> {{ overlayValue }} </span>
              <!-- <div class="overlay-value">کلیک کنید</div> -->
            </div>
          </div>
          <section class="p-0">
            <div class="map-tools" style="right: 0.75%; top: 16%">
              <div class="map-icon" @click="drawLine">
                <font-awesome-icon icon="draw-polygon" color="#9a9ca1" />
              </div>
              <div class="map-icon" @click="deleteLineBlock">
                <font-awesome-icon icon="trash" color="#9a9ca1" />
              </div>
              <!--              <div class="map-icon" @click="undoPolygon">-->
              <!--                <font-awesome-icon icon="undo" color="#9a9ca1"/>-->
              <!--              </div>-->
            </div>
          </section>
          <section v-if="mapLineForm">
            <div class="map-tools form-position">
              <RowForm
                :directions="directions"
                :submitLine="submitLine"
                :lineData="lineData"
              />
            </div>
          </section>
        </div>

        <div
          class="
            form-info-show
            d-flex
            align-items-center
            justify-content-between
            mt-5
          "
          v-if="lineData !== null"
        >
          <div
            class="d-flex flex-column align-items-center form-info-show-item"
          >
            <span class="farm-title">عنوان</span>
            <span class="farm-value">{{ lineData.name }}</span>
          </div>
          <div
            class="d-flex flex-column align-items-center form-info-show-item"
          >
            <span class="farm-title">جهت</span>
            <span class="farm-value">{{ lineData.direction.name_fa }}</span>
          </div>

          <div
            class="d-flex flex-column align-items-center form-info-show-item"
          >
            <span class="farm-title">تعداد درختان</span>
            <span class="farm-value">{{ lineData.trees_count }}</span>
          </div>
          <div
            class="d-flex flex-column align-items-center form-info-show-item"
          >
            <span class="farm-title">پیشوند درختان</span>
            <span class="farm-value">{{ lineData.prefix }}</span>
          </div>
          <div
            class="d-flex flex-column align-items-center form-info-show-item"
          >
            <button class="btn btn-outline-success btn-sm" @click="showForm">
              <svg
                id="Iconly_Light_Edit"
                data-name="Iconly/Light/Edit"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g id="Edit" transform="translate(3.5 3.5)">
                  <path
                    id="Stroke_1"
                    data-name="Stroke 1"
                    d="M0,.5H6.377"
                    transform="translate(10.2 15.898)"
                    fill="none"
                    stroke="#7fd2bc"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="1.5"
                  />
                  <path
                    id="Stroke_3"
                    data-name="Stroke 3"
                    d="M8.6.706A1.947,1.947,0,0,1,11.473.553l1.39,1.09A1.946,1.946,0,0,1,13.4,4.464L5.11,15.039a1.481,1.481,0,0,1-1.15.568l-3.2.041L.039,12.533a1.486,1.486,0,0,1,.277-1.252Z"
                    transform="translate(0.75 0.75)"
                    fill="none"
                    stroke="#7fd2bc"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="1.5"
                  />
                  <path
                    id="Stroke_5"
                    data-name="Stroke 5"
                    d="M0,0,4.794,3.758"
                    transform="translate(7.803 3.436)"
                    fill="none"
                    stroke="#7fd2bc"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="1.5"
                  />
                </g>
              </svg>

              ویرایش
            </button>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
          <div v-if="!submitLoading">
            <button class="btn btn-success mx-3" @click="submitLineForm">
              {{ editMode ? "ویرایش ردیف" : "ثبت ردیف" }}
            </button>
            <button class="btn btn-outline-secondary" @click="backToPrevPage">
              بعدا
            </button>
          </div>
          <Loading v-if="submitLoading" />
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { globalMixin } from "../mixins/globalMixin";
import { mapMixin } from "../mixins/mapMixin";
import ProgressPage from "../components/UI/ProgressPage";
import Api from "../common/api";
import RowForm from "../components/Garden/RowForm";

export default {
  name: "AddGardenBlockRow",
  props: ["blockId", "id"],
  components: { ProgressPage, HomeLayout, RowForm },
  mixins: [globalMixin, mapMixin],
  inject: ["$axios"],
  data() {
    return {
      name: null,
      prefix: null,
      direction: null,
      directions: [],
      trees_count: null,
      row_count: null,
      editMode: false,
      allowMultiPolygon: true,
      limitDrawing: true,
      block: null,
      blockName: "",
      gardenLines: [],
      loading: false,
      lineData: null,
      submitLoading: false,
    };
  },
  mounted() {
    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[sections.length - 1];
    if (lastSection === "edit") {
      this.editMode = true;
    }
    this.getDirections();
    this.getGardenBlock();
  },
  methods: {
    getDirections() {
      Api.getDirectionsApi({ self: this }).then((res) => {
        if (res.status === 200) {
          let data = res.data;
          this.directions = data;
        }
      });
    },
    getGardenBlock() {
      let self = this;
      Api.getGardenBlockApi({ self: this, id: this.blockId })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.loadMap({
              hasSearchBar: false,
              point: [data.center.coordinates[0], data.center.coordinates[1]],
              zoom: data.area !== null && data.area.unit === "هکتار" ? 15 : 19,
            });
            self.blockName = data.name;
            this.showCreatedFarm(
              data.shape.coordinates,
              data.center.coordinates,
              true,
              `gardenblock${data.id}`,
              "rgba(250, 250, 250, 0.3)"
            );
            data.garden_lines.map((item) => {
              if (this.editMode) {
                self.lineData = item;
                self.lineArray = item.line.coordinates;
              }
              // if (item.id == self.id) {
              //   self.lineData = item;
              //   self.lineArray = item.line.coordinates;
              this.showCreatedLine(
                item.line.coordinates,
                `line${item.id}`,
                true,
                item.id == self.id
                  ? "rgba(60, 179, 113, 1)"
                  : "rgba(0, 0, 0, 0.8)",
                item.id == self.id ? item.line.coordinates[0] : null
              );
              // }
            });
          }
        })
        .catch((error) => {
          self.toastReturnTxt(error.response);
        });
    },
    showForm() {
      this.mapLineForm = true;
    },
    deleteLineBlock() {
      this.lineData = null;
      this.deleteLine();
    },
    submitLine(data) {
      this.lineData = data;
      this.mapLineForm = false;
    },
    submitLineForm() {
      this.formatLineData();
      let self = this;
      self.submitLoading = true;
      let data = {
        garden_block_id: this.blockId,
        name:
          this.lineData !== null &&
          this.lineData.name !== undefined &&
          this.lineData.name !== null
            ? this.lineData.name
            : "",
        prefix:
          this.lineData !== null &&
          this.lineData.prefix !== undefined &&
          this.lineData.prefix !== null
            ? this.lineData.prefix
            : "",
        direction:
          this.lineData !== null &&
          this.lineData.direction !== undefined &&
          this.lineData.direction !== null
            ? this.lineData.direction.name_en
            : "",
        trees_count:
          this.lineData !== null &&
          this.lineData.trees_count !== undefined &&
          this.lineData.trees_count !== null
            ? this.lineData.trees_count
            : 0,
        line: this.finalLineArray,
      };

      if (this.editMode) {
        data["_method"] = "patch";
        Api.editLine({ self: this, data: data, id: this.id })
          .then((res) => {
            if (res.status === 200) {
              self.loading = false;
              self.submitLoading = false;
              this.toastReturnTxt(res);
              this.backToPrevPage();
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
            self.submitLoading = false;
          });
      } else {
        if (this.finalLineArray.length > 0) {
          Api.createLine({ self: this, data: data })
            .then((res) => {
              if (res.status === 200) {
                self.submitLoading = false;
                this.toastReturnTxt(res);
                this.backToPrevPage();
              }
            })
            .catch((error) => {
              this.toastReturnTxt(error.response);
              self.submitLoading = false;
            });
        } else {
          self.submitLoading = false;
          this.toast.error(
            "ابتدا ردیف خود را بر روی نقشه ترسیم کنید",
            this.toastOptions
          );
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "../styles/modules/AddGardenBlockRow/AddGardenBlockRow";

.form-position {
  margin-right: 60px;
}
.overlay-value {
  color: #fff;
  padding: 10px;
  font-size: 10px;
}
</style>