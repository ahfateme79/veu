<template>
  <div class="home-layout p-0">
    <Header class="d-md-none home-layout-header"/>
    <div class="margin-x">
      <Header class="d-none d-md-block home-layout-header"/>
      <div class="row">
        <div v-if="!withoutSideBar" class="col-md-10 col-12">
          <slot></slot>
        </div>
        <div v-if="withoutSideBar" class="col-md-12 col-12">
          <slot></slot>
        </div>
        <div v-if="!withoutSideBar" class="col-md-2 d-md-block d-none">
          <SideBarMenu/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import SideBarMenu from "./SideBarMenu";

export default {
  name: "HomeLayout",
  components: {SideBarMenu, Header},
  props: {
    user: {
      type: Object,
      required: false,
    },
    withoutSideBar:{
      type:Boolean,
      required: false
    }
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/Layout/HomeLayout";
</style>
<style>
.btn:focus {
  box-shadow: unset;
}
.Vue-Toastification__toast-body{
  font-family: 'iranyekan';
  font-size: 14px !important;
}
</style>

