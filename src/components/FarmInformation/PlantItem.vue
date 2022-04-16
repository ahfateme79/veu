<template>
  <div class="plants">
    <div class="row">
      <div class="col-1">
        <font-awesome-icon
            icon="edit"
            size="x"
        >
        </font-awesome-icon>
      </div>
      <div class="col-11 text-end">
            <span>
              سینگل کراس 704
            </span>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col">
        <div class="farm-information-data-title">
          تاریخ کشت
          <font-awesome-icon
              icon="calendar-alt"
              size="x"
          >
          </font-awesome-icon>
        </div>
        <span class="farm-information-data-box">
              1400/05/05
            </span>
      </div>
      <div class="col">
        <div class="farm-information-data-title">نوع محصول</div>
        <span class="farm-information-data-box">
              گندم
            </span>
      </div>
      <div class="col">
        <div class="farm-information-data-title">
          مساحت
          <font-awesome-icon
              icon="square"
              size="x"
          >
          </font-awesome-icon>
        </div>
        <span class="farm-information-data-box">
              50.35 هکتار
            </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlantItem"
}
</script>

<style lang="scss">
@import "src/styles/modules/FarmInformation/PlantItem";
</style>