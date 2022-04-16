<template>
  <div class="container analyze-soil-consulting">
    <div class="d-flex flex-row-reverse bd-highlight justify-content-center w-50 analyze-tabs">
      <div class="bd-highlight analyze-tab" :class="showProductAnalysisSoilConsulting?'activeTab':''"
           @click="setShowTab('1')">
        آنالیز محصول
        <font-awesome-icon
            icon="chart-bar"
            size="x"
        >
        </font-awesome-icon>
      </div>
      <div class="bd-highlight analyze-tab" :class="showSoilExamination?'activeTab':''"
           @click="setShowTab('2')">
        مشاوره خاک
      </div>
      <div class="bd-highlight analyze-tab" :class="showHerbalAdvice?'activeTab':''" @click="setShowTab('3')">
        مشاوره گیاهی
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-if="showProductAnalysisSoilConsulting">
        <ProductAnalysisSoilConsulting/>
      </div>
      <div class="col-12" v-if="showSoilExamination">
        <SoilExamination/>
      </div>
      <div class="col-12" v-if="showHerbalAdvice">
        <HerbalAdvice/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductAnalysisSoilConsulting from "./ProductAnalysisSoilConsulting";
import SoilExamination from "./SoilExamination";
import HerbalAdvice from "./HerbalAdvice";

export default {
  name: "AnalyzeSoilConsulting",
  components: {HerbalAdvice, SoilExamination, ProductAnalysisSoilConsulting},
  data() {
    return {
      showHerbalAdvice: false,
      showSoilExamination: true,
      showProductAnalysisSoilConsulting: false
    };
  },
  methods: {
    setShowTab(dataTab) {
      if (dataTab === '1') {
        this.showSoilExamination = this.showHerbalAdvice = false;
        this.showProductAnalysisSoilConsulting = true;
      } else if (dataTab === '2') {
        this.showProductAnalysisSoilConsulting = this.showHerbalAdvice = false
        this.showSoilExamination = true;
      } else {
        this.showProductAnalysisSoilConsulting = this.showSoilExamination = false;
        this.showHerbalAdvice = true;
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/AnalyzeSoilConsulting";
</style>