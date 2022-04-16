<template>
  <div class="existing-farm">
    <div class="d-flex  mb-3 border-bottom">
      <div class="p-2  existing-farm-add-new">
        <router-link to="" class="existing-farm-title p-0">
          اضافه کردن مزرعه جدید
          <font-awesome-icon
              icon="plus-square"
              size="x"
              color="black"
          ></font-awesome-icon>
        </router-link>
      </div>
      <div class="p-2 bd-highlight existing-farm-title">مزرعه اطراف تهران</div>
      <div class="p-2 bd-highlight existing-farm-title">مزرعه تهران</div>
    </div>
    <div class="d-flex flex-row-reverse ">
      <div v-if="user.farms.length" class="p-2" v-for="item in user.farms" :key="item.id">
        <div class="d-flex flex-column mb-3 existing-farm-box existing-farm-active text-center">
          <div class="p-2 bd-highlight">{{ item.name }}</div>
          <div class="p-2 bd-highlight existing-farm-value">{{ item.area }} هکتار</div>
        </div>
      </div>
      <div v-else class="p-2">
        <div class="d-flex flex-column mb-3 existing-farm-box text-center">
          <div class="p-2 bd-highlight text-warning">شما هنوز مزرعه ای ثبت نکرده اید</div>
          <div class="p-2 bd-highlight existing-farm-value">لطفا اولین مزرعه خود را ثبت کنید</div>
        </div>
      </div>
      <div class="p-2 existing-farm-title">
        <div class="d-flex flex-column bd-highlight mb-3 existing-farm-box text-center">
          <div class="p-2 bd-highlight">
            <font-awesome-icon
                icon="plus-square"
                size="x"
            ></font-awesome-icon>
          </div>
          <div class="p-2 existing-farm-title">
            افزودن قطعه جدید
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExistingFarm",
  props: {
    user: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/ExistingFarm";
</style>