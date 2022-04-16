<template>
  <div class="justify-content-center">
    <main>
      <div class="row justify-content-center">
        <div class="col-12 home-layout-content-box justify-content-center text-center">
          <div class="banner"></div>
          <p class="text-center">در حال بارگزاری صفحه</p>
          <p dir="rtl" class="text-center">لطفا شکیبا باشید ...</p>
          <Loading/>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "ProgressPage",
}
</script>
<style lang="scss">
@import "src/styles/modules/Layout/HomeLayout";
@import "src/styles/modules/UI/Banner.scss";
</style>
