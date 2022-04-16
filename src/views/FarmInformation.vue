<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div
      v-if="!loading"
      class="margin-at-mobile margin-bottom-at-mobile FarmInformation"
    >
      <div>
        <div class="border-bottom padding-bottom-17">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex">
              <div
                v-if="service !== null && service.type !== 'apartment'"
                @click="goToFarmEditPage"
                class="d-flex align-items-center pointer"
              >
                <span class="edit-farm-txt d-none d-md-block"
                  >ویرایش {{ serviceName }}</span
                >
              </div>
              <div
                v-if="service !== null && service.type !== 'apartment'"
                class="delete-farm-txt"
                @click="showDeleteServiceModal"
              >
                حذف {{ serviceName }}
              </div>
              <div
                v-if="service !== null && service.type === 'apartment'"
                class="delete-farm-txt"
                @click="showDeleteServiceModal"
              >
                حذف آپارتمان
              </div>
              <div
                class="modal fade"
                id="deleteServiceModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title text-danger"
                        id="exampleModalLabel"
                      >
                        حذف {{ serviceName }}
                      </h5>
                      <button
                        type="button"
                        class="btn-close m-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p>آیا {{ serviceName }} حذف شود؟</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        خیر
                      </button>
                      <button
                        @click="deleteFarm"
                        type="button"
                        class="btn btn-primary"
                      >
                        بله
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="
                service &&
                (service.type === 'farm' ||
                  service.type === 'greenhouse' ||
                  service.type === 'garden')
              "
              class="FarmInformationTitle"
            >
              {{ service.name }}
              <span class="FarmInformationSubTitle"
                >(
                {{ service.area.area }}
                {{ service.area.unit }} )</span
              >
            </div>
            <div
              v-if="service !== null && service.type === 'apartment'"
              class="FarmInformationTitle"
            >
              {{ service.name }}
            </div>
          </div>
        </div>
        <div>
          <div v-if="subServices && subServices.length > 0">
            <div class="row FarmInformationList justify-content-end">
              <div
                class="col-12 col-md-6"
                v-for="item in subServices"
                :key="item.id"
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
                          @click="goToPlantEditPage(item.id)"
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
                          @click="showDeletePlantModal(item)"
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
                                <h5
                                  class="modal-title text-danger"
                                  id="exampleModalLabel2"
                                >
                                  حذف گیاه
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close m-0"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <p>آیا گیاه حذف شود؟</p>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  خیر
                                </button>
                                <button
                                  @click="deletePlant"
                                  type="button"
                                  class="btn btn-primary"
                                >
                                  بله
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="
                          service !== null &&
                          (service.type === 'farm' ||
                            service.type === 'greenhouse' ||
                            service.type === 'garden')
                        "
                        class="FarmInformationListTitle"
                      >
                        {{ item.name }}
                      </div>
                      <div
                        v-if="
                          service !== null &&
                          service.type === 'apartment' &&
                          item.flower_type !== null
                        "
                        class="FarmInformationListTitle"
                      >
                        {{ item.flower_type.name }}
                      </div>
                      <div
                        v-if="
                          service !== null &&
                          service.type === 'apartment' &&
                          item.flower_type === null
                        "
                        class="FarmInformationListTitle"
                      >
                        نوع گل را نمیدانم
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex flex-column align-items-center">
                        <div class="FarmInformationText">
                          تاریخ ثبت
                          <span class="FarmInformationTextIcon">
                            <svg
                              id="Iconly_Light_Calendar"
                              data-name="Iconly/Light/Calendar"
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                            >
                              <g id="Calendar" transform="translate(2.25 1.5)">
                                <path
                                  id="Line_200"
                                  d="M0,.473H13.368"
                                  transform="translate(0.069 5.08)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_201"
                                  d="M.459.473H.466"
                                  transform="translate(9.623 8.009)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_202"
                                  d="M.459.473H.466"
                                  transform="translate(6.295 8.009)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_203"
                                  d="M.459.473H.466"
                                  transform="translate(2.96 8.009)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_204"
                                  d="M.459.473H.466"
                                  transform="translate(9.623 10.924)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_205"
                                  d="M.459.473H.466"
                                  transform="translate(6.295 10.924)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_206"
                                  d="M.459.473H.466"
                                  transform="translate(2.96 10.924)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_207"
                                  d="M.463,0V2.468"
                                  transform="translate(9.32 0)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Line_208"
                                  d="M.463,0V2.468"
                                  transform="translate(3.261 0)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                                <path
                                  id="Path"
                                  d="M9.929,0H3.578A3.227,3.227,0,0,0,0,3.482V10.27a3.258,3.258,0,0,0,3.578,3.546H9.922A3.229,3.229,0,0,0,13.5,10.326V3.482C13.507,1.227,12.138,0,9.929,0Z"
                                  transform="translate(0 1.184)"
                                  fill="none"
                                  stroke="#919294"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="10"
                                  stroke-width="1.2"
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div
                          class="
                            FarmInformationValue
                            d-flex
                            justify-content-center
                          "
                        >
                          {{ $filter.moment(item.created_at, "jYYYY/jM/jD") }}
                        </div>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                        <div class="FarmInformationText">نوع محصول</div>
                        <div
                          v-if="
                            service &&
                            (service.type === 'farm' ||
                              service.type === 'greenhouse' ||
                              service.type === 'garden')
                          "
                          dir="rtl"
                          class="
                            FarmInformationValue
                            d-flex
                            justify-content-center
                          "
                        >
                          {{ item.crop.name }}
                        </div>
                        <div
                          v-if="
                            service &&
                            service.type === 'apartment' &&
                            item.flower_type
                          "
                          class="
                            d-flex
                            justify-content-center
                            FarmInformationValue
                          "
                        >
                          {{ item.flower_type.name }}
                        </div>
                        <div
                          v-if="
                            service &&
                            service.type === 'apartment' &&
                            !item.flower_type
                          "
                          class="
                            d-flex
                            justify-content-center
                            FarmInformationValue
                          "
                        >
                          نوع گل را نمیدانم
                        </div>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                        <div
                          v-if="
                            service &&
                            (service.type === 'farm' ||
                              service.type === 'garden' ||
                              service.type === 'greenhouse')
                          "
                          class="FarmInformationText"
                        >
                          مساحت
                          <span class="FarmInformationTextIcon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16.345"
                              height="16.298"
                              viewBox="0 0 16.345 16.298"
                            >
                              <path
                                id="area"
                                d="M15.541,12.551a1.564,1.564,0,0,1,0,2.21l0,0L14.469,15.82a.625.625,0,1,1-.878-.889l.625-.618H4.186a2.5,2.5,0,0,1-2.5-2.5V1.767l-.624.615a.625.625,0,0,1-.878-.89L1.24.451a1.575,1.575,0,0,1,2.2,0L4.5,1.493a.625.625,0,0,1-.878.89l-.686-.677V11.813a1.251,1.251,0,0,0,1.25,1.25H14.279l-.689-.68a.625.625,0,1,1,.878-.889l1.069,1.056,0,0ZM14.123,0H6.03a.625.625,0,1,0,0,1.25h8.094a.625.625,0,0,1,.625.625V10A.625.625,0,1,0,16,10V1.875A1.875,1.875,0,0,0,14.123,0Z"
                                transform="translate(0.146 0.198)"
                                fill="#919294"
                                stroke="#919294"
                                stroke-width="0.2"
                              />
                            </svg>
                          </span>
                        </div>
                        <div
                          v-if="service && service.type === 'apartment'"
                          class="FarmInformationText"
                        >
                          ارتفاع
                          <span class="FarmInformationTextIcon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16.345"
                              height="16.298"
                              viewBox="0 0 16.345 16.298"
                            >
                              <path
                                id="area"
                                d="M15.541,12.551a1.564,1.564,0,0,1,0,2.21l0,0L14.469,15.82a.625.625,0,1,1-.878-.889l.625-.618H4.186a2.5,2.5,0,0,1-2.5-2.5V1.767l-.624.615a.625.625,0,0,1-.878-.89L1.24.451a1.575,1.575,0,0,1,2.2,0L4.5,1.493a.625.625,0,0,1-.878.89l-.686-.677V11.813a1.251,1.251,0,0,0,1.25,1.25H14.279l-.689-.68a.625.625,0,1,1,.878-.889l1.069,1.056,0,0ZM14.123,0H6.03a.625.625,0,1,0,0,1.25h8.094a.625.625,0,0,1,.625.625V10A.625.625,0,1,0,16,10V1.875A1.875,1.875,0,0,0,14.123,0Z"
                                transform="translate(0.146 0.198)"
                                fill="#919294"
                                stroke="#919294"
                                stroke-width="0.2"
                              />
                            </svg>
                          </span>
                        </div>
                        <Popper
                          v-if="
                            service &&
                            (service.type === 'farm' ||
                              service.type === 'garden')
                          "
                        >
                          <button
                            class="
                              FarmInformationValue
                              d-flex
                              justify-content-center
                              border-0
                            "
                          >
                            <span class="me-2">{{ item.area.unit }}</span>
                            {{ shortener(item.area.area.toString(), 4) }}
                          </button>
                          <template #content>
                            <div>{{ item.area }}</div>
                          </template>
                        </Popper>
                        <button
                          v-if="service && service.type === 'apartment'"
                          class="
                            FarmInformationValue
                            d-flex
                            justify-content-center
                            border-0
                          "
                        >
                          <span class="me-2">سانتی متر</span>
                          {{ item.height }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="
              d-flex
              justify-content-center
              align-items-center
              empty-plants
            "
            v-else
          >گیاهی ثبت نشده است </div>
        </div>
        <div class="d-flex justify-content-center">
          <div
            class="d-flex justify-content-center align-items-center final-btn"
            @click="backToHome"
          >
            ثبت نهایی
          </div>
          <div
            class="d-flex align-items-center AddNewPlantButton"
            @click="addNewPlant"
          >
            <span class="me-1">
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
                      stroke="#7fd2bc"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                    />
                  </g>
                </g>
              </svg>
            </span>
            <span> افزودن گیاه جدید</span>
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { globalMixin } from "../mixins/globalMixin";
import Api from "../common/api";
import { Modal } from "bootstrap";
import ProgressPage from "../components/UI/ProgressPage";

export default {
  name: "FarmInformation",
  components: { HomeLayout, ProgressPage },
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      service: null,
      subServices: [],
      deleteServiceModal: null,
      deletePlantModal: null,
      plantToDelete: null,
    };
  },
  props: ["serviceId"],
  computed: {
    serviceName() {
      let faname;
      if (this.service !== null && this.service.type === "farm")
        faname = "مزرعه";
      else if (this.service !== null && this.service.type === "greenhouse")
        faname = "گلخانه";
      else if (this.service !== null && this.service.type === "apartment")
        faname = "گل آپارتمانی";
      else if (this.service !== null && this.service.type === "garden")
        faname = "باغ";
      return faname;
    },
  },
  methods: {
    showDeleteServiceModal() {
      this.deleteServiceModal = new Modal(
        document.getElementById("deleteServiceModal"),
        {}
      );
      this.deleteServiceModal.show();
    },
    showDeletePlantModal(item) {
      this.deletePlantModal = new Modal(
        document.getElementById("deletePlantModal"),
        {}
      );
      this.deletePlantModal.show();
      this.plantToDelete = item;
    },
    getService() {
      this.loading = true;
      Api.getServiceInformationApi({ self: this, id: this.serviceId })
        .then((response) => {
          if (response.status === 200) {
            this.service = response.data;
            this.subServices = response.data.sub_services;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
          // this.toastReturnTxt(error.response)
        });
    },
    addNewPlant() {
      let type = this.service.type;
      if (type === "apartment") this.goAnotherPage(`/flower-types`);
      if (type === "farm")
        this.goAnotherPage(`/farm/${this.service.service_id}/plant/create`);
      if (type === "garden")
        this.goAnotherPage(`/garden/${this.service.service_id}/block/create`);
      if (type === "greenhouse")
        this.goAnotherPage(
          `/green-house/${this.service.service_id}/plant/create`
        );
    },
    goToFarmEditPage() {
      let type = this.service.type;
      if (type === "apartment")
        this.goAnotherPage(`/flower-type/${this.service.service_id}/edit`);
      if (type === "farm")
        this.goAnotherPage(`/farm/${this.service.service_id}/edit`);
      if (type === "garden")
        this.goAnotherPage(`/garden/${this.service.service_id}/edit`);
      if (type === "greenhouse")
        this.goAnotherPage(`/green-house/${this.service.service_id}/edit`);
    },
    deleteFarm() {
      Api.deleteFarmApi({ self: this, id: this.service.service_id })
        .then((response) => {
          if (response.status === 200) {
            this.deleteServiceModal.hide();
            this.toastReturnTxt(response);
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
        });
    },
    deletePlant() {
      if (this.plantToDelete !== null) {
        if (this.service.type === "farm") {
          Api.deletePlantApi({ self: this, id: this.plantToDelete.id })
            .then((response) => {
              if (response.status === 200) {
                this.deletePlantModal.hide();
                this.toastReturnTxt(response);
                this.getService();
              }
            })
            .catch((error) => {
              this.toastReturnTxt(error.response);
            });
        } else if (this.service.type === "apartment") {
          Api.deleteHousePlantApi({ self: this, id: this.plantToDelete.id })
            .then((response) => {
              if (response.status === 200) {
                this.deletePlantModal.hide();
                this.toastReturnTxt(response);
                this.getService();
              }
            })
            .catch((error) => {
              this.toastReturnTxt(error.response);
            });
        } else if (this.service.type === "greenhouse") {
          Api.deleteGreenHouseApi({ self: this, id: this.plantToDelete.id })
            .then((response) => {
              if (response.status === 200) {
                this.deletePlantModal.hide();
                this.toastReturnTxt(response);
                this.getService();
              }
            })
            .catch((error) => {
              this.toastReturnTxt(error.response);
            });
        } else {
          Api.deleteBlockApi({ self: this, id: this.plantToDelete.id })
            .then((response) => {
              if (response.status === 200) {
                this.deletePlantModal.hide();
                this.toastReturnTxt(response);
                this.getService();
              }
            })
            .catch((error) => {
              this.toastReturnTxt(error.response);
            });
        }
      }
    },
    goToPlantEditPage(id) {
      let type = this.service.type;
      if (type === "greenhouse")
        this.$router.push(`/green-house/${this.serviceId}/plant/${id}/edit`);
      if (type === "farm")
        this.$router.push(`/farm/${this.serviceId}/plant/${id}/edit`);
      if (type === "garden")
        this.$router.push(`/garden/${this.serviceId}/block/${id}/edit`);
      if (type === "apartment") this.$router.push(`/flower-type/${id}/edit`);
    },
  },
  mounted() {
    if (this.serviceId != null) {
      this.getService();
    }
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/FarmInformation/FarmInformation";
</style>
<style>
.modal {
  direction: rtl;
}

.popper {
  border: 1px solid red;
  padding: 5px;
}
</style>