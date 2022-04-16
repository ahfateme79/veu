<template>
  <div class="analyze-home">
    <div class="d-flex justify-content-center">
      <div
          class="d-flex flex-row-reverse justify-content-center analyze-tabs"
      >
        <div
            class="analyze-tab text-nowrap d-flex justify-content-center align-items-center"
            :class="{ activeTab: activeTabId === tab.id }"
            @click="setShowTab(tab)"
            v-for="tab in tabs"
            :key="tab.id"
        >
          {{ tab.name }}
          <font-awesome-icon
              v-if="tab.icon !== ''"
              :icon="tab.icon"
              size="x"
              class="ms-2"
          ></font-awesome-icon>
        </div>
      </div>
    </div>
    <div v-if="activeTabId === 1">
      <div class="d-flex justify-content-center" v-if="showServiceNotSupport===true">
        <p style="margin-top: 50px">آنالیز محصول برای این سرویس وجود ندارد</p>
      </div>
      <div class="d-flex justify-content-center" v-if="showNotAnyPlantAdded===true">
        <p style="margin-top: 50px">گیاهی برای این مزرعه ثبت نشده</p>
      </div>
      <div class="d-flex justify-content-center" v-if="showServiceIsTooSmall===true">
        <p style="margin-top: 50px">مساحت مزرعه شما کم تر از حد مجاز برای آنالیز است</p>
      </div>
      <div>
        <div>
          <div v-if="showServiceNotSupport===false && showServiceIsTooSmall===false && showNotAnyPlantAdded===false"  class="ProductAnalysisHomeTabs">
            <swiper
                :slidesPerView="auto"
                dir="rtl"
            >
              <swiper-slide
                  class="ProductAnalysisHomeTab d-flex justify-content-center pointer text-nowrap"
                  v-for="analysisType in analysisTypes"
                  :key="analysisType.id"
                  @click="getSingleAnalysis(analysisType)"
                  :class="{ activeTab: activeAnalysisId === analysisType.id }"
                  :disabled="analysisType.mode !== 'رایگان'">
                {{ analysisType.name }}
              </swiper-slide>
            </swiper>
          </div>
          <div class="row margin-16-at-mobile">
            <div class="col-12">
              <div class="position-relative">
                <div ref="map-root" class="map"></div>
                  <div v-if="!showServiceNotSupport && !showServiceIsTooSmall  && !showNotAnyPlantAdded" class="d-flex map-tools">
                    <div class="d-flex flex-column align-items-center justify-content-end date-wrapper">
                      <div class="d-flex justify-content-center align-items-center select-date-label">تاریخ آنالیز را انتخاب کنید</div>
                      <div>
                        <date-picker auto-submit="true" v-model="selectedDate" :disable="checkDate" />
                      </div>
                    </div>
                    <div class="legend-wrapper">
                      <span class="max-min" v-if="selectedDaily">{{selectedDaily.max}}</span>
                      <div v-if="mapLegend && mapLegend.low && mapLegend.high" :style="{ backgroundImage: createBackgroundString }" class="map-legend"></div>
                      <span class="max-min" v-if="selectedDaily">{{selectedDaily.min}}</span>
                    </div>
                  </div>
              </div>
            </div>
            <div v-if="showServiceNotSupport===false && showServiceIsTooSmall===false  && showNotAnyPlantAdded===false" class="col-12 col-md-6">
              <JalizbanChart
                  :chartData="chartData"
                  :chartDataLegned="chartDataLegned"  
                  v-if="!!chartData  && chartData.length > 0"
              />
              <p class="text-center pt-2" v-else>نموداری گزارش نشده است</p>
            </div>
            <div v-if="showServiceNotSupport===false && showServiceIsTooSmall===false  && showNotAnyPlantAdded===false"  class=" col-12 col-md-6 dateReport">
              <div class="d-flex flex-column h-100 justify-content-between"
                   v-if="
                  summary &&
                  summary.length > 0
                "
              >
                <div
                    class="d-flex justify-content-between align-items-center flex-row-reverse dateReport-tab text-nowrap">
                  <div
                      v-for="(summary, index) in summary"
                      class="dateReport-tab-title"
                      :class="{
                      'dateReport-tab-title-active':
                        summeryActiveTab === summary.title,
                    }"
                      @click="getSummery(summary)"
                      :key="index"
                  >
                    {{ summary.title }}
                  </div>
                </div>
                <div v-if="selectedSummary" class="row flex-grow-1">
                  <div class="col-6">
                    <div class="padding-33">
                      <div v-if="selectedSummary.average" class="text-center timeTabValue margin-bottom-18">
                        {{ selectedSummary.average.value }}
                      </div>
                      <div class="timeTabValueText">
                        {{ selectedSummary.description }}
                      </div>
                    </div>
                  </div>
                  <div class="border-left col-6">
                    <div class="padding-33 d-flex flex-column">
                      <div class="d-flex justify-content-between align-items-center margin-bottom-46">
                        <div class="d-flex align-items-center">
                          <div class="d-inline-block me-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.79" height="16.026"
                                 viewBox="0 0 13.79 16.026">
                              <g id="Arrow_-_Up" data-name="Arrow - Up"
                                 transform="translate(12.729 15.276) rotate(180)">
                                <path id="Stroke_1" data-name="Stroke 1" d="M0,14.526V0" transform="translate(5.834)"
                                      fill="none" stroke="#29bb89" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-miterlimit="10" stroke-width="1.5"/>
                                <path id="Stroke_3" data-name="Stroke 3" d="M11.668,0,5.835,5.859,0,0"
                                      transform="translate(0 8.667)" fill="none" stroke="#29bb89" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                              </g>
                            </svg>
                          </div>
                          <div v-if="selectedSummary.max" class="d-inline-block timeTabValueMax">
                            {{ selectedSummary.max.value }}
                          </div>
                        </div>
                        <div class=" d-inline-block text-center timeTabText">
                          بیشترین مقدار
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                          <div class="d-inline-block me-1">
                            <svg id="Iconly_Light_Arrow_-_Down" data-name="Iconly/Light/Arrow - Down"
                                 xmlns="http://www.w3.org/2000/svg" width="23.242" height="23.242"
                                 viewBox="0 0 23.242 23.242">
                              <g id="Arrow_-_Down" data-name="Arrow - Down" transform="translate(6.052 4.6)">
                                <path id="Stroke_1" data-name="Stroke 1" d="M.5,14.526V0" transform="translate(5.334 0)"
                                      fill="none" stroke="#ec4b4b" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-miterlimit="10" stroke-width="1.5"/>
                                <path id="Stroke_3" data-name="Stroke 3" d="M11.668,0,5.835,5.859,0,0"
                                      transform="translate(0 8.667)" fill="none" stroke="#ec4b4b" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                              </g>
                            </svg>
                          </div>
                          <div v-if="selectedSummary.min" class="d-inline-block timeTabValueMin">
                            {{ selectedSummary.min.value }}
                          </div>
                        </div>
                        <div class="d-inline-block text-center timeTabText">
                          کمترین مقدار
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-center pt-2">هیچ گزارشی ثبت نشده است</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12" v-if="activeTabId === 2">
      <SoilExamination :farm="farm"/>
    </div>
    <div class="col-12" v-if="activeTabId === 3">
      <HerbalAdvice :plant="plant"/>
    </div>
  </div>
</template>

<script>
import SoilExamination from "../SoilConsulting/SoilExamination.vue";
import JalizbanChart from "./JalizbanChart.vue";
import HerbalAdvice from "../SoilConsulting/HerbalAdvice";
import {mapMixin} from "../../mixins/mapMixin";
import _ from "lodash";
import moment from "moment-jalaali";

export default {
  name: "AnalyzeHome",
  components: {SoilExamination, JalizbanChart, HerbalAdvice},
  mixins: [mapMixin],
  inject: ["$axios"],
  props: {
    farm: {
      type: Object,
    },
    plant: {
      type: Object,
    },
    analysisTypes: {
      type: Array,
    },
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: "آنالیز محصول",
          icon: "chart-bar",
        },
        {
          id: 2,
          name: "مشاوره خاک",
          icon: "",
        },
        {
          id: 3,
          name: "مشاوره گیاه",
          icon: "",
        },
      ],
      activeTabId: 1,
      activeAnalysisId: 1,
      activeAnalysisData: null,
      summeryActiveTab: "",
      summary: null,
      selectedSummary:null,
      chartData: [],
      chartDataLegned: [],
      mapOptions: {
        point: null,
        zoom: null,
        hasSearchBar:false,
        image:null
      },
      farmAnalysis:null,
      plantAnalyses:null,
      showAnalyze:false,
      showServiceNotSupport:false,
      showServiceIsTooSmall:false,
      showNotAnyPlantAdded:false,
      mapLegend:null,
      chartDailyDates:[],
      selectedDate:null,
      selectedDaily:null,
      dailyChart:[]

    };
  },
  computed: {
    createBackgroundString() {
      return `linear-gradient(${this.mapLegend.low.hex}, ${this.mapLegend.high.hex})`;
    },
  },
  watch: {
    analysisTypes(newValue){
      this.getSingleAnalysis(newValue[0]);
      if (newValue[0] && newValue[0].summery && newValue[0].summery.length > 0) {
        this.getSummery(newValue[0].summery[0]);
      }
      this.getChartData(newValue[0]);
      // this.activeTabId = 1;
    },
    farm(newValue){
      if(newValue.type !== 'farm' && newValue.type !== 'garden'){
        this.showServiceNotSupport=true
        this.showServiceIsTooSmall=false
        this.showNotAnyPlantAdded=false
        this.showAnalyze=false
      }
      if((this.farm.type === 'farm' || this.farm.type === 'garden') && this.plant == null){
        this.showServiceNotSupport=false
        this.showServiceIsTooSmall=false
        this.showNotAnyPlantAdded=true
        this.showAnalyze=false
      }
      if((this.farm.type === 'farm' || this.farm.type === 'garden') && this.plant !== null && this.plant.analyses === null){
        this.showServiceIsTooSmall=true
        this.showServiceNotSupport=false
        this.showNotAnyPlantAdded=false
        this.showAnalyze=false
      }
      if(this.plant && this.plant.analyses !== null){
        this.showAnalyze=true
        this.showServiceIsTooSmall=false
        this.showServiceNotSupport=false
        this.showNotAnyPlantAdded=false
        this.mapOptions.zoom = 13;
        this.mapOptions.point = _.toArray(this.plant.center.coordinates);
        this.loadMap(this.mapOptions)
        this.showCreatedFarm(
            this.plant.shape.coordinates,
            this.plant.center.coordinates
        );
      }
    },
    plant(newValue){
      if(newValue == null){
        this.showServiceNotSupport=false
        this.showServiceIsTooSmall=false
        this.showNotAnyPlantAdded=true
        this.showAnalyze=false
      }
      if((this.farm.type === 'farm' && this.farm.type === 'garden') && newValue.analyses === null){
        this.showServiceIsTooSmall=true
        this.showServiceNotSupport=false
        this.showNotAnyPlantAdded=false
        this.showAnalyze=false
      }
      if (newValue.analyses){
        this.showAnalyze=true
        this.showServiceNotSupport=false
        this.showServiceIsTooSmall=false
        this.showNotAnyPlantAdded=false
        if(this.$refs["map-root"] !== null && this.$refs["map-root"].innerHTML !== ''){
          this.$refs["map-root"].innerHTML=""
        }
        this.mapOptions.zoom = 13;
        this.mapOptions.point = _.toArray(newValue.center.coordinates);
        this.loadMap(this.mapOptions)
        this.showCreatedFarm(
            newValue.shape.coordinates,
            newValue.center.coordinates
        );
      }
      else{
        if(this.$refs["map-root"] !== null && this.$refs["map-root"].innerHTML !== ''){
          this.$refs["map-root"].innerHTML=""
        }
      }
    },
    selectedDate(newvalue){
      let date=moment(newvalue, "jYYYY/jM/jD").format("YYYY-MM-DD")
      this.selectedDaily=this.dailyChart.find(item=> item.date.value === date)
      this.selectedDaily && this.showImage(this.selectedDaily)
    }
  },
  methods: {
    setShowTab(tab) {
      this.activeTabId = tab.id;
    },
    getSingleAnalysis(analysis) {
      if (analysis !== undefined) {
        this.activeAnalysisId = analysis.id;
        this.activeAnalysisData = analysis;
        this.summary=analysis.summary
        this.selectedSummary=analysis.summary[0]
        this.summeryActiveTab=analysis.summary[0].title
        this.mapLegend=analysis.map_legend
        this.chartDailyDates=analysis.daily_chart && analysis.daily_chart.length >0 ?analysis.daily_chart.map(item=>item.date.value) : []
        this.dailyChart=analysis.daily_chart ? analysis.daily_chart :[]
        this.selectedDaily=analysis.daily_chart && analysis.daily_chart.length >0?analysis.daily_chart[0]:null
        // this.mapOptions.image=analysis.daily_chart && analysis.daily_chart.length >0?analysis.daily_chart[0].map_image:null
        // this.showImage(this.selectedDaily)
        this.selectedDate=analysis.daily_chart && analysis.daily_chart.length >0 ? moment(analysis.daily_chart[analysis.daily_chart.length-1].date.value, "YYYY-M-D").format("jYYYY/jMM/jDD"):null


        if (analysis.summery && analysis.summery.length > 0) {
          this.getSummery(analysis.summery[0]);
        }
        this.getChartData(analysis);
      }
    },
    getSummery(summery) {
      if (summery !== undefined) {
        this.summeryActiveTab = summery.title;
        this.selectedSummary = summery;
      }
    },
    getChartData(analysis) {
      if (analysis) {
        this.chartData = analysis.daily_chart;
        this.chartDataLegned = analysis.chart;
      }
    },
    checkDate(formatted) {
      return !(_.includes(this.chartDailyDates, moment(formatted, "jYYYY/jM/jD").format("YYYY-MM-DD")))
    }
  },
  mounted() {
    if(this.plant == null){
      this.showNotAnyPlantAdded=true
      this.showServiceNotSupport=false
      this.showServiceIsTooSmall=false
      this.showAnalyze=false
      return
    }
      if(this.farm.type !== 'farm' && this.farm.type !== 'garden'){
        this.showServiceNotSupport=true
        this.showServiceIsTooSmall=false
        this.showAnalyze=false
      }
      if((this.farm.type === 'farm' || this.farm.type === 'garden') && this.plant.analyses === null){
        this.showServiceIsTooSmall=true
        this.showServiceNotSupport=false
        this.showAnalyze=false
      }
      if(this.plant && this.plant.analyses !== null){
        this.showAnalyze=true
        this.showServiceIsTooSmall=false
        this.showServiceNotSupport=false
        this.mapOptions.zoom = 13;
        this.mapOptions.point = _.toArray(this.plant.center.coordinates);
        this.loadMap(this.mapOptions)
        this.showCreatedFarm(
            this.plant.shape.coordinates,
            this.plant.center.coordinates
        );
      }
     let dateBtn= document.getElementsByClassName('vpd-icon-btn')
    dateBtn[0].innerHTML=''
    dateBtn[0].innerHTML=
        '<svg id="Iconly_Light_Calendar" data-name="Iconly/Light/Calendar" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <g id="Calendar" transform="translate(3 2)">\n' +
        '    <path id="Line_200" d="M0,.473H17.824" transform="translate(0.093 6.931)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_201" d="M.459.473H.468" transform="translate(12.984 10.837)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_202" d="M.459.473H.468" transform="translate(8.546 10.837)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_203" d="M.459.473H.468" transform="translate(4.099 10.837)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_204" d="M.459.473H.468" transform="translate(12.984 14.723)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_205" d="M.459.473H.468" transform="translate(8.546 14.723)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_206" d="M.459.473H.468" transform="translate(4.099 14.723)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_207" d="M.463,0V3.291" transform="translate(12.581 0)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Line_208" d="M.463,0V3.291" transform="translate(4.502 0)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '    <path id="Path" d="M13.238,0H4.771C1.834,0,0,1.636,0,4.643v9.05c0,3.054,1.834,4.728,4.771,4.728h8.458c2.946,0,4.771-1.645,4.771-4.652V4.643C18.009,1.636,16.184,0,13.238,0Z" transform="translate(0 1.579)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>\n' +
        '  </g>\n' +
        '</svg>\n'

  }
};
</script>

<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "src/styles/modules/Home/AnalyzeHome";
@import "src/styles/modules/LandAndPlantRegistration/AddFarm";
</style>
<style>
.ProductAnalysisHomeTabs::-webkit-scrollbar {
  height: 2px;
}

.ProductAnalysisHomeTabs::-webkit-scrollbar-track {
  border-radius: 5px;
  /*box-shadow: inset 0 0 1px grey;*/
}

.ProductAnalysisHomeTabs::-webkit-scrollbar-thumb {
  background: #00A57A;
  border-radius: 5px;
}
.vpd-input-group{
  background-color: #fff;
  width: 129px;
  height: 36px;
  border-radius: 8px;
  padding: 6px 12px;
}
.vpd-input-group label{
  background-color: unset !important;
}
.vpd-input-group input{
  border: unset;
  padding: 0;
  margin-left: 8px;
}
.vpd-icon-btn{
  padding: 0;
}
</style>