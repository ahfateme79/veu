<template>
  <LoginLayout :withRightImg="false">
    <div v-if="loading">
      <ProgressPage/>
    </div>
    <div v-if="!loading" class="select_box">
      <header class="header">انتخاب نوع محصول</header>
      <div class="row justify-content-center services">
        <div
            v-for="service in services"
            :key="service.name"
            class="box col-6 col-md-3 d-flex flex-column align-items-center justify-content-center gap-4"
            @click="redirectToRelatedPage(service)"
        >
          <img class="img-fluid" :src="service.icon"/>
          <span class="text-center name">{{ service.name }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div
            class="d-flex justify-content-center align-items-center later-btn"
            @click="backToHome"
        >
          بعدا
        </div>
      </div>
    </div>
  </LoginLayout>
</template>

<script>
import LoginLayout from "../layout/LoginLayout";
import {globalMixin} from "../mixins/globalMixin";
import Api from "../common/api";
import ProgressPage from "../components/UI/ProgressPage.vue";

export default {
  name: "ServiceSelection",
  components: {LoginLayout, ProgressPage},
  data() {
    return {
      services: [],
    };
  },
  mixins: [globalMixin],
  inject: ["$axios"],
  mounted() {
    this.homeData();
  },
  methods: {
    homeData() {
      this.loading = true;
      let self = this;
      Api.getServicesApi({self: this})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.services = data.services;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    redirectToRelatedPage(service) {
      let type = service.type;
      switch (type) {
        case "farm":
          if (service.active === true) {
            this.goAnotherPage({name: "AddFarm"});
          } else {
            return;
          }
          break;
        case "apartment":
          if (service.active === true) {
            this.goAnotherPage("/flower-types");
          } else {
            return;
          }
          break;
        case "greenhouse":
          if (service.active === true) {
            this.goAnotherPage({name: "AddGreenHouse"});
          } else {
            return;
          }
          break;
        case "garden":
          if (service.active === true) {
            this.goAnotherPage({name: "AddGarden"});
          } else {
            return;
          }
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/ServiceSelection/ServiceSelection";
</style>