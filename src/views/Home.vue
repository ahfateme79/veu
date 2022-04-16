<template>
  <HomeLayout>
    <div class="home" v-if="loading">
      <ProgressPage />
    </div>
    <div class="home" v-if="!loading">
      <div v-if="services.length > 0">
        <!--service list -->
        <div class="existing-farm">
          <div class="mb-3 row list-existing-farm">
            <div class="col-2 col-md-2 p-md-0 existing-farm-add-new">
              <div
                class="d-flex existing-farm-title-new-button"
                @click="goAnotherPage('/service-selection')"
              >
                <div class="m-1 d-none d-md-block">افزودن</div>
                <span class="d-md-none">
                  <svg
                    id="Iconly_Light_Plus"
                    data-name="Iconly/Light/Plus"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g id="Plus" transform="translate(2 2)">
                      <path
                        id="Line_185"
                        d="M.476,0V7.326"
                        transform="translate(9.524 6.327)"
                        fill="none"
                        stroke="#a8a9ab"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Line_186"
                        d="M7.333.476H0"
                        transform="translate(6.333 9.515)"
                        fill="none"
                        stroke="#a8a9ab"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Path"
                        d="M14.686,0H5.314C2.048,0,0,2.312,0,5.585v8.83C0,17.688,2.038,20,5.314,20h9.371C17.962,20,20,17.688,20,14.415V5.585C20,2.312,17.962,0,14.686,0Z"
                        fill="none"
                        stroke="#a8a9ab"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                    </g>
                  </svg>
                </span>
                <span class="d-none d-md-block">
                  <svg
                    id="Iconly_Light_Plus"
                    data-name="Iconly/Light/Plus"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <g id="Plus" transform="translate(1.5 1.5)">
                      <path
                        id="Line_185"
                        d="M.476,0V5.495"
                        transform="translate(7.024 4.745)"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Line_186"
                        d="M5.5.476H0"
                        transform="translate(4.75 7.017)"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Path"
                        d="M11.014,0H3.986A3.864,3.864,0,0,0,0,4.189v6.622A3.86,3.86,0,0,0,3.986,15h7.029A3.86,3.86,0,0,0,15,10.811V4.189A3.86,3.86,0,0,0,11.014,0Z"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div class="col-10 col-md-10 pe-0">
              <swiper
                :slidesPerView="3"
                :breakpoints="{
                  '1024': {
                    slidesPerView: 7.5,
                  },
                }"
                dir="rtl"
              >
                <swiper-slide
                  class="
                    existing-farm-title
                    d-flex
                    flex-column
                    align-items-center
                  "
                  v-for="item in services"
                  :key="item.id"
                  @click="getServiceInfo(item)"
                  :class="{
                    activeTab: activeService.service_id === item.service_id,
                  }"
                >
                  <div class="text-nowrap">{{ item.name }}</div>
                  <div class="existing-farm-title-value">
                    <div class="d-flex">
                      <div
                        v-if="
                          item.type === 'farm' ||
                          item.type === 'greenhouse' ||
                          item.type === 'garden'
                        "
                      >
                        {{ item.area.area.toLocaleString() }}
                      </div>
                      <div
                        v-if="
                          item.type === 'farm' ||
                          item.type === 'greenhouse' ||
                          item.type === 'garden'
                        "
                        class="me-2"
                      >
                        {{ item.area.unit }}
                      </div>
                      <div
                        v-if="item.type === 'apartment'"
                        class="me-2 text-nowrap"
                      >
                        گل های آپارتمانی
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div
            v-if="!serviceLoading && activeServiceSubServices.length > 0"
            class="row justify-content-end existing-farm-value"
          >
            <div class="col-11 col-md-10">
              <div>
                <swiper
                  :slidesPerView="2.3"
                  :spaceBetween="16"
                  :breakpoints="{
                    '1024': {
                      slidesPerView: 4.8,
                      spaceBetween: 24,
                    },
                  }"
                  dir="rtl"
                >
                  <swiper-slide
                    v-for="item in activeServiceSubServices"
                    :key="item.id"
                  >
                    <div
                      class="
                        d-flex
                        flex-column
                        align-items-center
                        justify-content-center
                        existing-farm-box
                        pointer
                      "
                      @click="getJalizbanAnalysis(item)"
                      :class="{
                        ActivePlant:
                          activeServiceFirstSubService.id === item.id,
                      }"
                    >
                      <div
                        v-if="
                          activeService.type === 'farm' ||
                          activeService.type === 'greenhouse'
                        "
                        class="name"
                      >
                        {{ item.crop.name }}
                      </div>
                      <div v-if="activeService.type === 'garden'" class="name">
                        {{ item.name }}
                      </div>
                      <div
                        v-if="
                          activeService.type === 'apartment' &&
                          item.flower_type !== null
                        "
                        class="name"
                      >
                        {{ item.flower_type.name }}
                      </div>
                      <div
                        v-if="
                          activeService.type === 'apartment' &&
                          item.flower_type === null
                        "
                        class="name"
                      >
                        نوع گل را نمیدانم
                      </div>
                      <div class="centring existing-farm-value">
                        <div class="d-flex flex-row justify-content-center">
                          <div
                            v-if="
                              activeService.type === 'farm' ||
                              activeService.type === 'garden'
                            "
                          >
                            {{ item.area.area.toLocaleString() }}
                          </div>
                          <div v-if="activeService.type === 'apartment'">
                            {{ item.height }}
                          </div>
                          <div
                            v-if="
                              activeService.type === 'farm' ||
                              activeService.type === 'garden'
                            "
                            class="me-2"
                          >
                            {{ item.area.unit }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>

            <div
              @click="addNewPlant"
              class="
                d-flex d-md-none
                flex-column
                align-items-center
                btn
                col-1 col-md-2
              "
            >
              <div
                class="
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-around
                "
                @click="addNewPlant"
              >
                <svg
                  id="Iconly_Light_Plus"
                  data-name="Iconly/Light/Plus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g id="Plus" transform="translate(2 2)">
                    <path
                      id="Line_185"
                      d="M.476,0V7.326"
                      transform="translate(9.524 6.327)"
                      fill="none"
                      stroke="#a8a9ab"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.2"
                    />
                    <path
                      id="Line_186"
                      d="M7.333.476H0"
                      transform="translate(6.333 9.515)"
                      fill="none"
                      stroke="#a8a9ab"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.2"
                    />
                    <path
                      id="Path"
                      d="M14.686,0H5.314C2.048,0,0,2.312,0,5.585v8.83C0,17.688,2.038,20,5.314,20h9.371C17.962,20,20,17.688,20,14.415V5.585C20,2.312,17.962,0,14.686,0Z"
                      fill="none"
                      stroke="#a8a9ab"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.2"
                    />
                  </g>
                </svg>
                <div class="add-new-btn-txt d-none d-md-block">
                  افزودن گیاه جدید
                </div>
              </div>
            </div>
            <div
              @click="addNewPlant"
              style="width: unset"
              class="
                d-flex d-none d-md-block
                flex-column
                align-items-center
                existing-farm-box
                col-2
                btn
              "
            >
              <div
                class="
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-around
                "
                @click="addNewPlant"
              >
                <span>
                  <svg
                    id="Iconly_Light_Plus"
                    data-name="Iconly/Light/Plus"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <g id="Plus" transform="translate(1.5 1.5)">
                      <path
                        id="Line_185"
                        d="M.476,0V5.495"
                        transform="translate(7.024 4.745)"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Line_186"
                        d="M5.5.476H0"
                        transform="translate(4.75 7.017)"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Path"
                        d="M11.014,0H3.986A3.864,3.864,0,0,0,0,4.189v6.622A3.86,3.86,0,0,0,3.986,15h7.029A3.86,3.86,0,0,0,15,10.811V4.189A3.86,3.86,0,0,0,11.014,0Z"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                    </g>
                  </svg>
                </span>
                <div class="add-new-btn-txt d-none d-md-block">
                  افزودن گیاه جدید
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="d-flex justify-content-end">
              <div
                @click="addNewPlant"
                class="
                  btn
                  d-none d-md-flex
                  flex-column
                  align-items-center
                  existing-farm-box
                "
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21.5"
                    height="21.5"
                    viewBox="0 0 21.5 21.5"
                  >
                    <g id="Plus" transform="translate(0.75 0.75)">
                      <path
                        id="Line_185"
                        d="M.476,0V7.326"
                        transform="translate(9.524 6.327)"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.5"
                      />
                      <path
                        id="Line_186"
                        d="M7.333.476H0"
                        transform="translate(6.333 9.515)"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path"
                        d="M14.686,0H5.314C2.048,0,0,2.312,0,5.585v8.83C0,17.688,2.038,20,5.314,20h9.371C17.962,20,20,17.688,20,14.415V5.585C20,2.312,17.962,0,14.686,0Z"
                        fill="none"
                        stroke="#4c4d4e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                </span>
                <div class="add-new-btn-txt">افزودن قطعه جدید</div>
              </div>
              <div @click="addNewPlant" class="d-md-none">
                <span>
                  <svg
                    id="Iconly_Light_Plus"
                    data-name="Iconly/Light/Plus"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g id="Plus" transform="translate(2 2)">
                      <path
                        id="Line_185"
                        d="M.476,0V7.326"
                        transform="translate(9.524 6.327)"
                        fill="none"
                        stroke="#a8a9ab"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Line_186"
                        d="M7.333.476H0"
                        transform="translate(6.333 9.515)"
                        fill="none"
                        stroke="#a8a9ab"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                      <path
                        id="Path"
                        d="M14.686,0H5.314C2.048,0,0,2.312,0,5.585v8.83C0,17.688,2.038,20,5.314,20h9.371C17.962,20,20,17.688,20,14.415V5.585C20,2.312,17.962,0,14.686,0Z"
                        fill="none"
                        stroke="#a8a9ab"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="1.2"
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!serviceLoading">
          <!-- weather and subservices -->
          <div class="row margin-at-mobile">
            <div class="col-md-7 col-12 order-md-0 order-1">
              <ClimateTheRegion :city="city" :weather="weather" />
            </div>
            <div class="col-md-5 col-12 order-md-1 order-0">
              <PlantItem
                :activeService="activeService"
                :activeServiceFirstSubService="activeServiceFirstSubService"
              />
            </div>
          </div>

          <!-- consultings and analysis -->
          <div class="analyze-home margin-at-mobile">
            <div class="d-md-flex justify-content-center with-margin">
              <div
                class="
                  d-flex
                  flex-row-reverse
                  justify-content-between justify-content-center
                  analyze-tabs
                  flex-grow-md-1
                "
              >
                <div
                  class="
                    analyze-tab
                    text-nowrap
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  :class="{ activeTab: activeTabId === tab.id }"
                  @click="setActiveTab(tab)"
                  v-for="tab in tabs"
                  :key="tab.id"
                >
                  {{ tab.name }}
                  <font-awesome-icon
                    v-if="tab.icon !== ''"
                    :icon="tab.icon"
                    size="x"
                    class="ms-2"
                  ></font-awesome-icon>
                </div>
              </div>
            </div>
            <div v-show="activeTabId === 1">
              <div
                class="d-flex justify-content-center"
                v-if="
                  activeService.type !== 'farm' &&
                  activeService.type !== 'garden'
                "
              >
                <p style="margin-top: 50px">
                  آنالیز محصول برای این سرویس وجود ندارد
                </p>
              </div>
              <JalizbanAnalysis
                v-else
                :farm="activeService"
                :plant="activeServiceFirstSubService"
                :analysisTypes="analysisTypes"
                :singleService="activeServiceFirstSubService"
              />
            </div>
            <div class="col-12" v-show="activeTabId === 2">
              <SoilExamination :farm="activeService" />
            </div>
            <div class="col-12" v-show="activeTabId === 3">
              <HerbalAdvice :plant="activeServiceFirstSubService" />
            </div>
          </div>
        </div>
        <ProgressPage v-if="serviceLoading" />
      </div>
      <div v-else>
        <EmptyHome />
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import ClimateTheRegion from "../components/SoilConsulting/ClimateTheRegion";
import PlantItem from "../components/Home/PlantItem";
// import AnalyzeHome from "../components/Home/AnalyzeHome";
import HomeLayout from "../layout/HomeLayout";
import Api from "../common/api";
import { globalMixin } from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage.vue";
import EmptyHome from "../components/Home/EmptyHome.vue";
import { mapMixin } from "../mixins/mapMixin";
import JalizbanAnalysis from "../components/Home/JalizbanAnalysis.vue";
import SoilExamination from "../components/SoilConsulting/SoilExamination.vue";
import HerbalAdvice from "../components/SoilConsulting/HerbalAdvice";

export default {
  name: "Home",
  components: {
    HomeLayout,
    ProgressPage,
    EmptyHome,
    JalizbanAnalysis,
    SoilExamination,
    HerbalAdvice,
    // AnalyzeHome,
    PlantItem,
    ClimateTheRegion,
  },
  inject: ["$axios"],
  mixins: [globalMixin, mapMixin],
  data() {
    return {
      greeting: null,
      user: null,
      services: [],
      activeService: null,
      activeServiceSubServices: [],
      activeServiceFirstSubService: null,
      weather: null,
      analysisTypes: [],
      tabs: [
        {
          id: 1,
          name: "آنالیز محصول",
          icon: "chart-bar",
        },
        {
          id: 2,
          name: "مشاوره خاک",
          icon: "",
        },
        {
          id: 3,
          name: "مشاوره گیاه",
          icon: "",
        },
      ],
      activeTabId: 1,
      city: null,
      serviceLoading: true,
    };
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.homeData();
  },
  methods: {
    homeData() {
      let self = this;
      Api.getHomeApi({ self: this })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.loading = false;
            this.serviceLoading = false;
            this.greeting =
              data.greeting !== undefined && data.greeting !== null
                ? data.greeting
                : null;
            this.user =
              data.user !== undefined && data.user !== null ? data.user : null;
            this.services = data.services;
            // this.$store.dispatch("service", {service: data.latest_service});
            this.activeService = data.latest_service;
            this.activeServiceSubServices = data.latest_service.sub_services;
            this.activeServiceFirstSubService =
              data.latest_service.sub_services[0];
            this.weather = data.latest_service.weather;
            this.city = data.latest_service.city;
            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userAvatar", data.user.avatar !== null ? data.user.avatar : '');
            if (
              (data.latest_service.type === "farm" ||
                data.latest_service.type === "garden") &&
              data.latest_service.sub_services.length > 0
            ) {
              this.getJalizbanAnalysis(data.latest_service.sub_services[0]);
            }
          }
        })
        .catch((error) => {
          this.serviceLoading = false;
          this.loading = false;
          self.handleError(self, error);
        });
    },
    addNewPlant() {
      let type = this.activeService.type;
      if (type === "farm")
        this.goAnotherPage(
          `/farm/${this.activeService.service_id}/plant/create`
        );
      if (type === "garden")
        this.goAnotherPage(
          `/garden/${this.activeService.service_id}/block/create`
        );
      if (type === "apartment") this.goAnotherPage(`/flower-types`);
      if (type === "greenhouse")
        this.goAnotherPage(
          `/green-house/${this.activeService.service_id}/plant/create`
        );
    },
    getServiceInfo(service) {
      // this.loading = true;
      this.serviceLoading = true;

      let self = this;
      Api.getServiceInformationApi({ id: service.service_id, self: this })
        .then((response) => {
          if (response.status === 200) {
            this.loading = false;
            this.serviceLoading = false;

            this.activeTabId = 1;
            this.activeService = response.data;
            this.activeServiceSubServices =
              response.data.sub_services.length > 0
                ? response.data.sub_services
                : [];
            this.activeServiceFirstSubService =
              response.data.sub_services.length > 0
                ? response.data.sub_services[0]
                : null;
            this.weather = response.data.weather;
            this.city = response.data.city;
            if (
              (response.data.type === "farm" ||
                response.data.type === "garden") &&
              response.data.sub_services.length > 0
            ) {
              this.getJalizbanAnalysis(response.data.sub_services[0]);
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          this.serviceLoading = false;
          self.handleError(self, error);
        });
    },
    getJalizbanAnalysis(plant) {
      let self = this;
      this.activeServiceFirstSubService = plant;
      let data = {
        uuid: plant.uuid,
      };
      if (plant.uuid !== null) {
        Api.jalizbanAPi({ self, data: data })
          .then((res) => {
            if (res.status === 200) {
              self.analysisTypes = res.data.analyses_types;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
      }
    },
    setActiveTab(tab) {
      this.activeTabId = tab.id;
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/Home/Home";
@import "src/styles/modules/SoilConsulting/ExistingFarm";
@import "src/styles/modules/Home/AnalyzeHome";
@import "src/styles/modules/LandAndPlantRegistration/AddFarm";
</style>
