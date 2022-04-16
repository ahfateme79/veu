<template>
  <HomeLayout>
    <div class="container soil-consulting">
      <div class="row mt-3">
        <div class="col-md-6 col-12">
          <ClimateTheRegion/>
        </div>
        <div class="col-md-6 col-12">
          <FarmItem/>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <AnalyzeSoilConsulting/>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import ClimateTheRegion from "../components/SoilConsulting/ClimateTheRegion";
import FarmItem from "../components/SoilConsulting/FarmItem";
import AnalyzeSoilConsulting from "../components/SoilConsulting/AnalyzeSoilConsulting";
import HomeLayout from "../layout/HomeLayout";

export default {
  name: "SoilConsulting",
  components: {HomeLayout, AnalyzeSoilConsulting, FarmItem, ClimateTheRegion},
  mounted() {
    alert(this.$route.params.data.id)
  }
}
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/SoilConsulting";
</style>