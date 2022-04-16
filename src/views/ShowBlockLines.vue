<template>
  <HomeLayout>
    <div class="margin-at-mobile margin-bottom-at-mobile FarmInformation">
      <ProgressPage v-if="loading" />
      <div class="d-flex flex-column" v-if="!loading">
        <div>
          <div v-if="gardenLines.length > 0" class="mb-5">
            <div class="row FarmInformationList justify-content-end">
              <div
                class="col-12 col-md-6"
                v-for="line in gardenLines"
                :key="line.id"
              >
                <div>
                  <div class="d-flex flex-column FarmInformation-card">
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        margin-bottom-40
                      "
                    >
                      <div class="d-flex">
                        <div
                          @click="
                            goAnotherPage(
                              `/garden/${serviceId}/block/${blockId}/row/${line.id}/edit`
                            )
                          "
                          class="pointer"
                        >
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
                        </div>
                        <div
                          @click="showDeletePlantModal(line)"
                          class="pointer ms-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18.458"
                            height="19.999"
                            viewBox="0 0 18.458 19.999"
                          >
                            <g id="Delete" transform="translate(0 -0.001)">
                              <path
                                id="Stroke_1"
                                data-name="Stroke 1"
                                d="M14.191,0s-.543,6.735-.858,9.572a2.238,2.238,0,0,1-2.358,2.174c-2.609.047-5.221.05-7.829-.005A2.214,2.214,0,0,1,.857,9.579C.54,6.717,0,0,0,0"
                                transform="translate(2.134 7.468)"
                                fill="none"
                                stroke="#d27f85"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                                stroke-width="1.5"
                              />
                              <path
                                id="Stroke_3"
                                data-name="Stroke 3"
                                d="M16.958.5H0"
                                transform="translate(0.75 3.74)"
                                fill="none"
                                stroke="#d27f85"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                                stroke-width="1.5"
                              />
                              <path
                                id="Stroke_5"
                                data-name="Stroke 5"
                                d="M10.423,3.489A1.648,1.648,0,0,1,8.808,2.165L8.565.949A1.28,1.28,0,0,0,7.328,0H3.1A1.28,1.28,0,0,0,1.858.949L1.615,2.165A1.648,1.648,0,0,1,0,3.489"
                                transform="translate(4.018 0.751)"
                                fill="none"
                                stroke="#d27f85"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                                stroke-width="1.5"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div class="FarmInformationListTitle">
                        {{ line.name }}
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex flex-column align-items-center">
                        <div class="FarmInformationText">نام</div>
                        <div
                          class="
                            FarmInformationValue
                            d-flex
                            justify-content-center
                          "
                        >
                          {{ line.name }}
                        </div>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                        <div class="FarmInformationText">تعداد درخت</div>
                        <div
                          dir="rtl"
                          class="
                            FarmInformationValue
                            d-flex
                            justify-content-center
                          "
                        >
                          {{ line.trees_count }}
                        </div>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                        <div class="FarmInformationText">جهت</div>
                        <div
                          dir="rtl"
                          class="
                            FarmInformationValue
                            d-flex
                            justify-content-center
                          "
                        >
                          {{ line.direction.name_fa }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span v-else class="mb-5">ردیف درختان را انتخاب کنید</span>
        </div>
        <div class="d-flex gap-4 row-selection-btns">
          <div
            class="d-flex justify-content-center align-items-center"
            @click="backToHome"
          >
            بعدا
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            @click="
              goAnotherPage(
                `/garden/${this.serviceId}/block/${blockId}/row/create`
              )
            "
          >
            ایجاد ردیف جدید
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="deletePlantModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="exampleModalLabel2">
                حذف ردیف
              </h5>
              <button
                type="button"
                class="btn-close m-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>آیا ردیف حذف شود؟</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                خیر
              </button>
              <button @click="deleteLine" type="button" class="btn btn-primary">
                بله
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { globalMixin } from "../mixins/globalMixin";
import { mapMixin } from "../mixins/mapMixin";
import Api from "../common/api";
import { Modal } from "bootstrap";
import ProgressPage from "../components/UI/ProgressPage.vue";

export default {
  name: "AddGardenBlock",
  components: { HomeLayout, ProgressPage },
  inject: ["$axios"],
  mixins: [globalMixin, mapMixin],
  data() {
    return {
      service: null,
      garden_id: null,
      gardenLines: [],
      deletePlantModal: null,
      plantToDelete: null,
    };
  },
  props: ["serviceId", "blockId"],
  mounted() {
    this.getGardenBlock();
  },
  methods: {
    getGardenBlock() {
      let self = this;
      this.loading = true;
      Api.singleGardenBlock({ self: this, id: this.blockId })
        .then((res) => {
          if (res.status === 200) {
            let data = res.data;
            self.gardenLines = data.garden_lines;
            self.loading = false;
          }
        })
        .catch((error) => {
          self.loading = false;
          this.toastReturnTxt(error.response);
        });
    },
    showDeletePlantModal(item) {
      this.deletePlantModal = new Modal(
        document.getElementById("deletePlantModal"),
        {}
      );
      this.deletePlantModal.show();
      this.plantToDelete = item;
    },
    deleteLine() {
      Api.deleteLineApi({ self: this, id: this.plantToDelete.id })
        .then((response) => {
          if (response.status === 200) {
            this.deletePlantModal.hide();
            this.toastReturnTxt(response);
            this.getGardenBlock();
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "../styles/modules/LandAndPlantRegistration/AddPlant";
@import "../styles/modules/LandAndPlantRegistration/AddFarm";
@import "../styles/modules/AddGardenBlockRow/AddGardenBlockRow";
@import "../styles/modules/FarmInformation/FarmInformation";
</style>