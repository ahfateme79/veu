<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div class="MyFarms margin-at-mobile" v-if="!loading">
      <div>
        <div class="border-bottom">
          <div class="MyFarmsTitle text-right">سرویس های من</div>
        </div>
      </div>
      <div class="row justify-content-end MyFarmsList" v-if="services.length>0">
        <div
          class="col-md-6 col-12 mb-3"
          v-for="item in services"
          :key="item.id"
        >
          <div class="d-flex flex-column MyFarm">
            <div>
              <div
                class="
                  d-flex
                  flex-row
                  justify-content-between
                  align-items-center
                "
              >
                <div
                  class="show-service d-flex align-items-center pointer"
                  @click="goToServiceInformationPage(item)"
                >
                  <span>مشاهده</span>
                  <span class="mx-1">{{ serviceType(item.type) }}</span>
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
                </div>
                <div
                  class="MyFarmsListTitle"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div
              class="
                d-flex
                justify-content-between
                align-items-center
                margin-top-40
              "
            >
              <div class="d-flex flex-column align-items-center">
                <div class="MyFarmsListText">
                  <span>تاریخ ثبت</span>
                  <span class="MyFarmsListTextIcon">
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
                <div class="MyFarmsListValue d-flex justify-content-center">
                  {{ $filter.moment(item.created_at, "jYYYY/jM/jD") }}
                </div>
              </div>
              <div class="d-flex flex-column align-items-center">
                <div class="MyFarmsListText">تعداد گیاهان</div>
                <div
                  dir="rtl"
                  class="MyFarmsListValue d-flex justify-content-center"
                >
                  {{ item.sub_services.length }} نوع گیاه
                </div>
              </div>
              <div class="d-flex flex-column align-items-center">
                <div v-if="item.type==='farm' || item.type==='greenhouse' || item.type==='garden'" class="MyFarmsListText">
                  <span> مساحت</span>
                  <span class="MyFarmsListTextIcon">
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
                <div v-if="item.type==='apartment'" class="MyFarmsListText">
                  <span> نوع</span>
                  <span class="MyFarmsListTextIcon">
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
                  <button
                      v-if="item.type==='farm' || item.type==='greenhouse' || item.type==='garden'"
                    class="
                      MyFarmsListValue
                      d-flex
                      justify-content-center
                      border-0
                    "
                  >
                    <span class="me-2">{{ item.area.unit }}</span>
                    <span>{{ item.area.area }}</span>
                  </button>
                <button
                    v-if="item.type==='apartment'"
                    class="
                      MyFarmsListValue
                      d-flex
                      justify-content-center
                      border-0
                    "
                >
                  <span class="me-2">گل های آپارتمانی</span>
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
        <div v-else class="empty">تاکنون محصولی ثبت نکرده اید</div>
      <div class="d-flex justify-content-center">
        <button
          class="btn AddNewFarmButton"
          @click="goAnotherPage('/service-selection')"
        >
          افزودن محصول جدید
          <font-awesome-icon color="#fff" icon="plus-square" size="x" />
        </button>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { globalMixin } from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";
import Api from "../common/api";

export default {
  name: "MyServices",
  components: { ProgressPage, HomeLayout },
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      services: [],
    };
  },
  methods: {
    profileData() {
      let self = this;
      this.loading = true;
      Api.getProfileDataApi({ self: this })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.services = data.services;
            this.loading = false;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    goToServiceInformationPage(item){
     let type = item.type
      if (type ==='farm') this.goAnotherPage(`/farm/${item.service_id}/information`)
      if (type ==='garden') this.goAnotherPage(`/garden/${item.service_id}/information`)
      if (type ==='greenhouse') this.goAnotherPage(`/green-house/${item.service_id}/information`)
      if (type ==='apartment') this.goAnotherPage(`/flower-type/${item.service_id}/information`)
    },
    serviceType(type) {
      let faType;
      if (type === "farm") faType = "مزرعه";
      else if (type === "apartment") faType = "گل های آپارتمانی";
      else if (type === "greenhouse") faType = "گلخانه";
      else if (type === "garden") faType = "باغ";
      return faType;
    },
  },
  mounted() {
    this.profileData();
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/Profile/MyFarms";
</style>