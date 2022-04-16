<template>
  <div>
    <div>
      <div
          class="climate-the-region"
          v-if="!weather">
        <p class="text-center">اطلاعاتی یافت نشد</p>
      </div>
      <div
          class="climate-the-region">
        <div v-if="weather" class="d-flex flex-column justify-content-between">
          <div class="climate-title text-center">
            {{
              city !== null ? `آب و هوای ${city.name}`
                  : "نام شهر ثبت نشده است"
            }}
          </div>
          <div
              class="climate-the-region-style"
              v-if="weather.length>0">
            <swiper
                :slidesPerView="3.6"
                :breakpoints="{
              '1024': {
                slidesPerView: 7,
              },
            }"
                dir="rtl"
            >
              <swiper-slide
                  v-for="item in weather"
                  :key="item.index">
                <div class="d-flex flex-column align-items-center climate-the-region-day">
                  <div class="climate-text">{{ item.day }}</div>
                  <div class="weather-icon">
                    <img class="img-fluid climate-image"
                         :src="`https://app.jalizan.com/weather_icons/${item.weather[0].icon}@2x.png`"/>
                  </div>
                  <div class="climate-text">
                    {{ Math.round(item.temp.min) }}/ {{ Math.round(item.temp.max) }}
                  </div>
                  <!--              <div class="d-flex align-items-center precipitation-text" v-if="item.precipitation.value !== 0">-->
                  <!--                <span> بارش:</span>-->
                  <!--                <span>{{item.precipitation.value}}</span>-->
                  <!--              </div>-->
                  <div class="d-flex align-items-center precipitation-text" v-if="item.humidity !== 0">
                    <span> رطوبت:</span>
                    <span>{{ item.humidity }}%</span>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "ClimateTheRegion",
  inject: ["$axios"],
  data() {
    return {
      daily: []
    }
  },
  props: {
    weather: {
      type: Array,
    },
    city: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/ClimateTheRegion";
</style>
