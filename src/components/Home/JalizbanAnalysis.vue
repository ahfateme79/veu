<template>
  <div>
    <div>
      <div class="ProductAnalysisHomeTabs">
        <swiper
          :slidesPerView="3"
          :breakpoints="{
            '1024': {
              slidesPerView: 6.8,
            },
          }"
          dir="rtl"
        >
          <swiper-slide
            class="
              ProductAnalysisHomeTab
              d-flex
              justify-content-center
              pointer
              text-nowrap
            "
            v-for="analysisType in analysisTypes"
            :key="analysisType.id"
            @click="getSingleAnalysis(analysisType)"
            :class="{ activeTab: activeAnalysisId === analysisType.id }"
            :disabled="analysisType.mode !== 'رایگان'"
          >
            {{ analysisType.name }}
          </swiper-slide>
        </swiper>
      </div>
      <div
        class="d-flex justify-content-center margin-at-mobile"
        v-if="
          activeAnalysisData !== null && activeAnalysisData.map.length === 0
        "
      >
        <p style="margin-top: 50px">آنالیز وجود ندارد</p>
      </div>
      <div
        class="d-flex justify-content-center margin-at-mobile"
        v-if="!singleService"
      >
        <p style="margin-top: 50px">گیاهی برای مزرعه شما ثبت نشده</p>
      </div>
      <div class="map-wrapper">
        <div class="row justify-content-center">
          <div
            ref="map-root"
            class="col-12 map margin-at-mobile"
            :class="{
              activeMap:
                activeAnalysisData !== null &&
                activeAnalysisData.map.length === 0,
            }"
          >
            <div ref="popup-point">
              <p v-if="pointValue !== ''" class="point-value">
                {{ pointValue }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="row margin-16-at-mobile"
          v-if="
            activeAnalysisData !== null && activeAnalysisData.map.length > 0
          "
        >
          <div class="legend-position">
            <img class="img-fluid legend-img" src="../../assets/legend.png" />
          </div>

          <div class="manage-layers" v-if="farm.type === 'garden'">
            <div class="d-flex map-tools">
              <div
                class="
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-end
                  date-wrapper
                "
              >
                <div v-for="(mapLayer, index) in mapLayers" :key="mapLayer.id">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      :id="mapLayer.id"
                      :value="mapLayer.name"
                      :checked="mapLayer.checked"
                      class="form-check-input"
                      @click="selectLayer(mapLayer, index)"
                    />
                    <label class="form-check-label mx-2" :for="mapLayer.id">{{
                      mapLayer.name
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tools-wrapper">
            <div class="d-flex map-tools">
              <div
                v-if="selectedDate !== null"
                class="
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-end
                  date-wrapper
                "
              >
                <div
                  class="
                    d-flex
                    justify-content-center
                    align-items-center
                    select-date-label
                  "
                >
                  تاریخ آنالیز را انتخاب کنید
                </div>
                <div class="input-icons">
                  <input
                    type="text"
                    class="input-field"
                    v-model="selectedDate"
                    id="selected-date-input"
                  />
                </div>
                <date-picker
                  v-model="selectedDate"
                  @change="getDate"
                  :disable="checkDate"
                  element="selected-date-input"
                  color="#7a7a79"
                  :auto-submit="true"
                />
                <!-- <date-picker
                    auto-submit="true"
                    v-model="selectedDate"
                    @change="getDate"
                    :disable="checkDate"
                /> -->
              </div>
            </div>
          </div>
          <div class="col-12 col-md-12 d-flex align-items-end">
            <JalizbanChart
              :chartData="chartData"
              :chartDataLegned="chartDataLegned"
              v-if="chartData.length > 0"
              :chartTitle="chartTitle"
            />
            <p class="text-center pt-2" v-else>نموداری گزارش نشده است</p>
          </div>
          <div class="col-12 col-md-12 dateReport mt-5">
            <div
              class="d-flex flex-column h-100 justify-content-between"
              v-if="
                activeAnalysisData !== null &&
                activeAnalysisData.summary.length > 0
              "
            >
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  flex-row-reverse
                  dateReport-tab
                  text-nowrap
                "
              >
                <div
                  v-for="(summary, index) in activeAnalysisData.summary"
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
              <div v-if="summary != null" class="row">
                <div class="col-6">
                  <div class="row">
                    <div class="col-12 text-center timeTabValue">
                      {{ summary.average.value }}
                    </div>
                    <div class="col-12 timeTabValueText">
                      {{ summary.description }}
                    </div>
                  </div>
                </div>
                <div class="col-6 border-left">
                  <div class="row">
                    <div class="col-2 d-inline-block">
                      <font-awesome-icon
                        icon="arrow-up"
                        size="2x"
                        color="#29bb89"
                      ></font-awesome-icon>
                    </div>
                    <div class="col-2 d-inline-block timeTabValueMax">
                      {{ summary.max.value }}
                    </div>
                    <div class="col-8 d-inline-block text-center timeTabText">
                      بیشترین مقدار
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-2 d-inline-block">
                      <font-awesome-icon
                        icon="arrow-down"
                        size="2x"
                        color="#ec4b4b"
                      ></font-awesome-icon>
                    </div>
                    <div class="col-2 d-inline-block timeTabValueMin">
                      {{ summary.min.value }}
                    </div>
                    <div class="col-8 d-inline-block text-center timeTabText">
                      کمترین مقدار
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
</template>

<script>
import JalizbanChart from "./JalizbanChart.vue";
import { mapMixin } from "../../mixins/mapMixin";
import { globalMixin } from "../../mixins/globalMixin";
import moment from "moment-jalaali";
import Api from "../../common/api";

export default {
  name: "AnalyzeHome",
  components: { JalizbanChart },
  mixins: [mapMixin, globalMixin],
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
    singleService: {
      type: Object,
    },
  },
  data() {
    return {
      activeAnalysisId: 1,
      activeAnalysisData: null,
      summeryActiveTab: "",
      summary: null,
      selectedSummary: null,
      chartData: [],
      chartDataLegned: [],
      chartTitle: "",
      mapOptions: {
        point: null,
        zoom: null,
        hasSearchBar: false,
      },
      chartDailyDates: [],
      selectedDate: null,
      selectedDaily: null,
      dailyChart: [],
      loading: true,
      filterDates: [],
      mapLayers: [
        {
          id: 1,
          name: "نمایش آنالیز",
          checked: true,
          value: "analysisLayer",
        },
        {
          id: 2,
          name: "نمایش قطعه",
          checked: false,
          value: "sectionLayer",
        },
        {
          id: 3,
          name: "نمایش ردیف",
          checked: false,
          value: "lineLayer",
        },
        {
          id: 4,
          name: "نمایش درخت",
          checked: false,
          value: "treeLayer",
        },
      ],
      gardenBlock: null,
      gardenLines: [],
      gardenTrees: [],
      gardenTreesLength: 0,
      markerCoordinate: null,
    };
  },
  watch: {
    analysisTypes: function () {
      this.loading = true;
      this.getSingleAnalysis(this.analysisTypes[0]);
      if (this.analysisTypes[0] !== undefined) {
        if (this.analysisTypes[0].summary.length > 0) {
          this.getSummery(this.analysisTypes[0].summary[0]);
        }
        this.getChartData(this.analysisTypes[0]);
        if (this.analysisTypes[0].map.length > 0) {
          this.getMapData(this.analysisTypes[0].map[0]);
          this.selectedDate = moment(
            this.analysisTypes[0].map[0].date.value,
            "YYYY-MM-DD"
          ).format("jYYYY/jMM/jDD");
        }
      }
    },
  },
  methods: {
    clearMapFeatures() {
      if (this.map !== null) {
        let mapLayers = this.map.getLayers().array_;
        mapLayers.map((item, index) => {
          console.log(item);
          if (index !== 0) {
            this.map.removeLayer(mapLayers[index]);
          }
        });
      }
    },
    drawMapFeatures() {
      this.showJalizbanFeatures(
        this.farm.shape.coordinates,
        this.farm.center.coordinates,
        false,
        `farm${this.farm.service_id}`,
        "rgba(60, 179, 113, 0.8)",
        null
      );
      this.showJalizbanFeatures(
        this.plant.shape.coordinates,
        this.plant.center.coordinates,
        true,
        `plant${this.plant.id}`,
        "rgba(0, 106, 57, 0.5)",
        null
      );
    },
    getSingleAnalysis(analysis) {
      if (this.map === null) this.loadMap(this.mapOptions);
      this.clearMapFeatures();
      if (analysis !== undefined) {
        this.activeAnalysisId = analysis.id;
        this.activeAnalysisData = analysis;
        this.chartTitle = analysis.name;
        if (analysis.summary.length > 0) {
          this.getSummery(analysis.summary[0]);
        }
        if (analysis.map.length > 0) {
          this.getMapData(analysis.map[0]);
          this.selectedDate = moment(
            analysis.map[0].date.value,
            "YYYY-MM-DD"
          ).format("jYYYY/jMM/jDD");
        }
        this.getChartData(analysis);
        this.getFilterDates(analysis);
      }
      this.drawMapFeatures();
      this.loading = false;
    },
    getSummery(summery) {
      this.summeryActiveTab = summery.title !== undefined ? summery.title : "";
      this.summary = summery;
    },
    getChartData(analysis) {
      if (analysis !== null) {
        this.chartData = analysis.daily_chart;
        this.chartDataLegned = analysis.chart;
      } else {
        this.chartData = [];
        this.chartDataLegned = [];
      }
    },
    getMapData(mapObject) {
      let geoParams = mapObject.geo_params;
      let mapImage = mapObject.map_image;
      this.mapLayers[0].checked = true;
      this.displayMapAnalysis(mapImage, this, geoParams);
    },
    getDate() {
      let date = moment(this.selectedDate, "jYYYY/jMM/jDD").format(
        "YYYY-MM-DD"
      );
      if (this.activeAnalysisData.map.length > 0) {
        this.clearMapFeatures();
        this.drawMapFeatures();
        const selectedSrc = (item) => item.date.value === date;
        let arrayIndex = this.activeAnalysisData.map.findIndex(selectedSrc);
        this.getMapData(this.activeAnalysisData.map[arrayIndex]);
      }
    },

    getFilterDates(analysis) {
      let mapData = analysis.map;
      let filterDates = [];
      if (mapData.length > 0) {
        mapData.map((item) => {
          if (item.date !== null && item.date.value !== null)
            filterDates.push(
              moment(item.date.value, "YYYY-MM-DD").format("jYYYY/jMM/jDD")
            );
        });
        this.filterDates = filterDates;
      }
    },

    checkDate(formatted) {
      if (this.filterDates.length > 0)
        return !this.filterDates.includes(formatted);
    },
    selectLayer(layer, index) {
      let mapLayers = this.mapLayers;
      let selectedItem = layer;
      selectedItem.checked = !layer.checked;
      mapLayers[index] = selectedItem;
      this[selectedItem.value] = selectedItem.checked;
      this.mapLayers = mapLayers;
      this.markerCoordinate = null;
      this.manageLayer(layer);
    },
    manageLayer(layer) {
      let layerId = layer.id;
      switch (layerId) {
        case 1:
          this.manageAnalysis(layer);
          break;
        case 2:
          this.managePolygon(layer);
          break;
        case 3:
          this.manageLine(layer);
          break;
        case 4:
          this.managePoint(layer);
          break;
      }
    },
    manageAnalysis(layer) {
      if (!layer.checked) {
        this.deleteMapLayer(this, layer);
      } else {
        this.getDate();
      }
    },
    managePolygon(layer) {
      if (layer.checked) {
        this.getGardenBlock(layer);
        this.showAnalysisPolygon(
          this.singleService.shape.coordinates,
          this.singleService.center.coordinates,
          true
        );
      } else {
        this.deleteMapLayer(this, layer);
      }
    },
    manageLine(layer) {
      if (layer.checked) {
        this.getGardenBlock(layer);
      } else {
        this.gardenLines = [];
        this.deleteMapLayer(this, layer);
      }
    },
    managePoint(layer) {
      if (layer.checked) {
        this.getGardenBlock(layer);
      } else {
        this.gardenTrees = [];
        this.gardenTreesLength = 0;
        this.deleteMapLayer(this, layer);
      }
    },
    getGardenBlock(layer) {
      let self = this;
      Api.singleGardenBlock({ self: this, id: this.singleService.id })
        .then((res) => {
          if (res.status === 200) {
            let data = res.data;
            self.gardenBlock = data;
            self.gardenLines = data.garden_lines;

            data.garden_lines.map((item) => {
              if (layer.id === 3) {
                this.showCreatedLine(item.line.coordinates);
              }
              if (layer.id === 4) {
                self.gardenTreesLength += item.trees_count;
                self.gardenTrees = self.gardenTrees.concat(item.garden_trees);
              }
            });

            if (layer.id === 4) {
              self.showMapPoints(self, layer);
            }
          }
        })
        .catch((error) => this.handleError(self, error));
    },
  },
  mounted() {
    // if (this.analysisTypes && this.analysisTypes.length > 0) {
    //   this.activeAnalysisData = this.analysisTypes[0];
    //   this.getFilterDates(this.analysisTypes[0]);
    // }

    // this.activeAnalysisData && this.activeAnalysisData.summary.length > 0
    //     ? (this.summary = this.activeAnalysisData.summary[0])
    //     : (this.summary = null);

    // this.summeryActiveTab =
    //     this.activeAnalysisData && this.activeAnalysisData.summary.length > 0
    //         ? this.activeAnalysisData.summary[0].title
    //         : "";
    // this.getChartData(this.activeAnalysisData);
    if (this.farm.type === "farm" || this.farm.type === "garden") {
      if (this.singleService !== undefined && this.singleService !== null) {
        this.mapOptions.point = this.singleService.center.coordinates;
        this.mapOptions.zoom =
          this.singleService.area !== null &&
          this.singleService.area.unit === "هکتار"
            ? 15
            : 18;
        // if (this.map === null) this.loadMap(this.mapOptions);
        // if (this.activeAnalysisData.map.length > 0) {
        //   this.getMapData(this.activeAnalysisData.map[0]);
        //   this.selectedDate = moment(
        //       this.activeAnalysisData.map[0].date.value,
        //       "YYYY-MM-DD"
        //   ).format("jYYYY/jMM/jDD");
        // }
      }
    }
  },
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
  background: #00a57a;
  border-radius: 5px;
}

.vpd-input-group {
  background-color: #fff;
  width: 129px;
  height: 36px;
  border-radius: 8px;
  padding: 6px 12px;
}

.vpd-input-group label {
  background-color: unset !important;
}

.vpd-input-group input {
  border: unset;
  padding: 0;
  margin-left: 8px;
}

.vpd-icon-btn {
  padding: 0;
}

.activeMap {
  display: none;
}

.manage-layer-item {
  color: #fff;
  font-size: 12px;
  margin-right: 5px;
}

.point-value {
  color: #fff;
  padding: 10px;
}
.input-field {
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  border-width: 1px;
  border-color: #fff;
}
.legend-position {
  position: absolute;
  top: 80px;
  right: 0px;
  left: 0px;
}
.legend-img {
  width: 15px;
  height: 150px;
}
</style>
