<template>
  <HomeLayout>
    <div class="home" v-if="loading">
      <ProgressPage />
    </div>
    <div class="background-on-mobile" v-if="!loading">
      <div v-if="farms.length > 0">
        <div class="d-none d-md-block existing-farm">
          <div class="mb-3 d-flex justify-content-between list-existing-farm">
            <div class="col-12 ps-3">
              <swiper
                :slidesPerView="2"
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
                  v-for="item in farms"
                  :key="item.id"
                  @click="getServiceInfo(item)"
                  :class="{ activeTab: farm.service_id === item.service_id }"
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
        </div>
        <div class="d-md-none margin-at-mobile">
          <div class="d-flex justify-content-end gap-4">
            <VueMultiselect
              class="text-end"
              v-model="farm"
              :options="farms"
              placeholder="انتخاب کنید"
              track-by="id"
              label="name"
              dir="rtl"
              :close-on-select="true"
              :clear-on-select="false"
              :show-labels="false"
              :allow-empty="false"
              @update:model-value="farmChange"
            >
            </VueMultiselect>
          </div>
        </div>
      </div>
      <div v-else>
        <EmptyHome />
      </div>
      <div v-if="farms.length > 0" class="meteorology">
        <div>
          <div class="weather">
            <div class="d-flex flex-column align-items-center" v-if="daily.length>0">
              <div
                v-if="
                  active_day_obj != null &&
                  daily[0] !== null &&
                  daily[0].day !== null &&
                  active_day_obj.day === daily[0].day
                "
                class="weather-title"
              >
                <span v-if="farm && farm.city">{{
                  `وضعیت آب و هوای امروز  (${farm.city.name})`
                }}</span>
              </div>
              <div v-else class="weather-title">
                <span v-if="farm && farm.city"
                  >({{ farm.city.name }}) وضعیت آب و هوای روز
                  {{ active_day_obj.day }}</span
                >
              </div>
              <div v-if="active_day_obj" class="mb-3">
                {{ active_day_obj.weather[0].description }}
              </div>
              <div v-if="active_day_obj" class="mb-3 day-temp">
                {{ Math.round(active_day_obj.temp.day) }} &#176;
              </div>
              <div class="temp-max-min d-flex justify-content-between">
                <div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g
                        id="Group_8956"
                        data-name="Group 8956"
                        transform="translate(-136 -372.229)"
                      >
                        <rect
                          id="Rectangle_603"
                          data-name="Rectangle 603"
                          width="16"
                          height="16"
                          transform="translate(136 372.229)"
                          fill="none"
                        />
                        <g
                          id="Iconly_Light_Arrow_-_Up"
                          data-name="Iconly/Light/Arrow - Up"
                          transform="translate(139.527 375.038)"
                        >
                          <g
                            id="Arrow_-_Up"
                            data-name="Arrow - Up"
                            transform="translate(9.152 9.393) rotate(180)"
                          >
                            <path
                              id="Stroke_1"
                              data-name="Stroke 1"
                              d="M0,9.393V0"
                              transform="translate(4.576)"
                              fill="none"
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                            />
                            <path
                              id="Stroke_3"
                              data-name="Stroke 3"
                              d="M9.152,0,4.576,3.789,0,0"
                              transform="translate(0 5.605)"
                              fill="none"
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <span> : </span>
                  <span v-if="active_day_obj"
                    >{{ Math.round(active_day_obj.temp.max) }} &#176;</span
                  >
                </div>
                <div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g
                        id="Group_8957"
                        data-name="Group 8957"
                        transform="translate(152 388.229) rotate(180)"
                      >
                        <rect
                          id="Rectangle_603"
                          data-name="Rectangle 603"
                          width="16"
                          height="16"
                          transform="translate(136 372.229)"
                          fill="none"
                        />
                        <g
                          id="Iconly_Light_Arrow_-_Up"
                          data-name="Iconly/Light/Arrow - Up"
                          transform="translate(139.527 375.038)"
                        >
                          <g
                            id="Arrow_-_Up"
                            data-name="Arrow - Up"
                            transform="translate(9.152 9.393) rotate(180)"
                          >
                            <path
                              id="Stroke_1"
                              data-name="Stroke 1"
                              d="M0,9.393V0"
                              transform="translate(4.576)"
                              fill="none"
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                            />
                            <path
                              id="Stroke_3"
                              data-name="Stroke 3"
                              d="M9.152,0,4.576,3.789,0,0"
                              transform="translate(0 5.605)"
                              fill="none"
                              stroke="#fff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <span> : </span>
                  <span v-if="active_day_obj"
                    >{{ Math.round(active_day_obj.temp.min) }} &#176;</span
                  >
                </div>
              </div>
              <div
                v-if="daily && daily.length > 0"
                class="
                  d-none d-md-flex
                  align-items-center
                  justify-content-between
                  meteorology-week
                  w-100
                "
              >
                <div
                  v-for="(item, index) in daily"
                  :key="index"
                  :class="{ activeWeek: active_day === index }"
                  class="week"
                  @click="activeDay(index, item)"
                >
                  {{ item.day }}
                </div>
              </div>
            </div>
            <div
              v-if="daily && daily.length > 0"
              class="swiper-background-on-mobile d-md-none"
            >
              <swiper :slidesPerView="4.3" dir="rtl">
                <swiper-slide
                  v-for="(item, index) in daily"
                  :key="index"
                  :class="{ activeWeek: active_day === index }"
                  class="week d-flex justify-content-center"
                  @click="activeDay(index, item)"
                >
                  {{ item.day }}
                </swiper-slide>
              </swiper>
            </div>
            <!--          changes begin-->
            <div v-if="filterHourlyWeather">
              <div
                class="
                  d-flex
                  justify-content-between
                  align-self-center
                  hourly-item
                "
                v-for="item in filterHourlyWeather"
                :key="item"
              >
                <div class="weather-text">
                  {{ Math.round(item.temperature.now.value) }}&#176;
                </div>
                <div class="d-flex align-items-center gap-5">
                  <div>
                    <img
                      class="img-fluid weather-icon"
                      :src="`https://app.jalizan.com/weather_icons/${item.weather.icon}@2x.png`"
                    />
                  </div>
                  <div class="d-flex flex-column flex-md-row gap-md-2">
                    <div
                      class="d-flex align-items-center precipitation-text gap-1"
                    >
                      <span> بارش: </span>
                      <span>{{ item.precipitation.value }}</span>
                    </div>
                    <div
                      class="d-flex align-items-center precipitation-text gap-1"
                    >
                      <span>رطوبت:</span>
                      <span>{{ item.humidity.value }}%</span>
                    </div>
                  </div>
                </div>
                <div class="weather-text">
                  {{ $filter.moment(item.time.to.date, "HH:ss") }}
                </div>
              </div>
            </div>

            <!--             changes end-->
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import Api from "../common/api";
import ProgressPage from "../components/UI/ProgressPage";
import { globalMixin } from "../mixins/globalMixin";
import EmptyHome from "../components/Home/EmptyHome";
import VueMultiselect from "vue-multiselect";

export default {
  name: "Meteorology",
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      daily: [],
      hourly: [],
      filterHourlyWeather: [],
      active_day: null,
      active_day_obj: null,
      greeting: null,
      user: null,
      farm: null,
      farms: [],
      weather: null,
    };
  },
  components: { EmptyHome, ProgressPage, HomeLayout, VueMultiselect },
  created() {
    this.loading = true;
    this.homeData();
  },

  methods: {
    farmChange() {
      this.getServiceInfo();
    },
    activeDay: function (index, item) {
      this.active_day = index;
      this.active_day_obj = item;
      this.filterHour(index);
    },
    WeatherDataDaily(city) {
      let self = this;
      let data = {
        lat: city.lat,
        lon: city.lng,
      };
      Api.getWeatherDaily({ data: data, self: this })
        .then((response) => {
          if (response.status === 200) {
            self.daily = response.data.daily;
            self.active_day = 0;
            self.active_day_obj = response.data.daily[0];
            self.loading = false;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    WeatherDataHourly(city) {
      let self = this;
      let data = {
        lat: city.lat,
        lon: city.lng,
      };
      Api.getWeatherHourly({ data: data, self: this })
        .then((response) => {
          if (response.status === 200) {
            self.hourly = response.data.hourly;
            this.loading = false;
          }
          this.filterHour(0);
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    filterHour(dataIndex) {
      let index = dataIndex;
      this.filterHourlyWeather = this.hourly.filter((value) => {
        if (value.time.day.display_date === this.daily[index].day) {
          return value;
        }
      });
    },
    getServiceInfo(item) {
      let service = window.innerWidth < 767 ? this.farm : item;

      this.loading2 = true;
      let self = this;
      Api.getServiceInformationApi({ id: service.service_id, self: this })
        .then((response) => {
          if (response.status === 200) {
            this.loading2 = false;
            this.farm = response.data;
            this.WeatherDataDaily(response.data.city);
            this.WeatherDataHourly(response.data.city);
            this.city = response.data.city;
          }
        })
        .catch((error) => {
          this.loading2 = false;
          self.handleError(self, error);
        });
    },
    homeData() {
      let self = this;
      Api.getHomeApi({ self: this })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.loading = false;
            this.farm = data.latest_service;
            this.farms = data.services;
            this.WeatherDataDaily(data.latest_service.city);
            this.WeatherDataHourly(data.latest_service.city);
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/Meteorology/Meteorology";
</style>