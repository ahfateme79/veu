<template>
  <div>
    <div class="row farm-item" v-if="farm !== undefined && farm !== null">
      <div>
        <div class="farm-item-first-title">
          {{ farm.title }}
        </div>
      </div>
      <div class="d-flex flex-row-reverse justify-content-around">
        <div>
          <div class="d-flex flex-column mb-3">
            <div class="farm-item-title">
              مساحت
              <font-awesome-icon icon="square" size="x"></font-awesome-icon>
            </div>
            <div class="p-2 farm-item-value">
              {{ shortener(farm.area, 4) }} هکتار
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex flex-column mb-3">
            <div class="farm-item-title">نوع محصول</div>
            <div class="farm-item-value">
              {{ farm.plantings.length > 0 ? farm.plantings[0].crop.name : 'محصولی برای این مزرعه ثبت نشده است' }}
            </div>
          </div>
        </div>
        <div class=" bd-highlight">
          <div class="d-flex flex-column bd-highlight mb-3">
            <div class=" bd-highlight farm-item-title">
              تاریخ کشت
              <font-awesome-icon icon="calendar-alt" size="x">
              </font-awesome-icon>
            </div>
            <div class=" farm-item-value">
              {{ farm.plantings.length > 0 ? farm.plantings[0].planting_date : 'محصولی برای این مزرعه ثبت نشده است' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row farm-item" v-else-if="farm === undefined || farm === null">
      <div class="d-flex flex-column bd-highlight mb-3 text-center">
        <div class="text-warning fw-bold">
          شما هنوز مزرعه ای ثبت نکرده اید
        </div>
        <div class="existing-farm-value">
          لطفا اولین مزرعه خود را ثبت کنید
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FarmItem",
  props: {
    farm: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/FarmItem";
</style>