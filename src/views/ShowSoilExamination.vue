<template>
  <HomeLayout>
    <div v-if="loading">
      <ProgressPage/>
    </div>
    <div v-if="!loading">
      <div class="show-soil-consulting margin-at-mobile">
        <div>
          <div class="header border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <div v-if="service !== null" class="d-flex align-items-center">
                <span class="farm-title"> {{ service.name }}</span>
                <span class="farm-area"
                >( {{
                    service.area !== null
                        ? service.area.area + " " + service.area.unit
                        : ""
                  }} )</span
                >
              </div>
              <div
                  class="d-flex align-items-center pointer"
                  @click="backToPrevPage"
              >
                <span class="back-home-link">بازگشت</span>
                <span>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                  >
                    <g
                        id="Iconly_Light_Arrow_-_Down_2"
                        data-name="Iconly/Light/Arrow - Down 2"
                        transform="translate(10) rotate(90)"
                    >
                      <g
                          id="Arrow_-_Down_2"
                          data-name="Arrow - Down 2"
                          transform="translate(2.083 3.542)"
                      >
                        <path
                            id="Stroke_1"
                            data-name="Stroke 1"
                            d="M5.833,0,2.917,2.917,0,0"
                            fill="none"
                            stroke="#7fd2bc"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="1.2"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div>

            <div class="container">
              <div class="row mb-4">
                <div class="col text-center">
                  <span class="soil-consulting-req-text">
                    تاریخ آزمایش: {{createdAt}}
                    <span class="badge">test</span>
                  </span>
                  <span class="mx-2">آزمایشگاه:
                    <span class="text-success text-bold">{{laboratory !== null ? laboratory.name : ''}}</span>
                  </span>
                </div>
              </div>
              <div class="row justify-content-center" v-if="soilResult !== null">
                  <div class="col-6 align-self-center">
                  <table class="table table-striped table-hover">
                    <tbody>
                    <tr>
                      <th scope="row">واکنش خاک (اسیدینه):</th>
                      <td>{{soilResult.ph}}</td>
                    </tr>
                    <tr>
                      <th scope="row">هدایت الکتریکی (شوری):</th>
                      <td>{{soilResult.ec}}</td>
                    </tr>
                    <tr>
                      <th scope="row">نسبت جذب سدیم:</th>
                      <td>{{soilResult.sar}}</td>
                    </tr>
                    <tr>
                      <th scope="row">کل مواد خنثي شونده (میزان آهک):</th>
                      <td>{{soilResult.tnv}}</td>
                    </tr>
                    <tr>
                      <th scope="row"> کربن آلی:</th>
                      <td>{{soilResult.oc}}</td>
                    </tr>
                    <tr>
                      <th scope="row">نیتروژن (ازت):</th>
                      <td>{{soilResult.n}}</td>
                    </tr>
                    <tr>
                      <th scope="row">فسفر قابل جذب:</th>
                      <td>{{soilResult.p}}</td>
                    </tr>
                    <tr>
                      <th scope="row">پتاسیم فابل جذب:</th>
                      <td>{{soilResult.k}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-6 align-self-center">
                  <table class="table table-striped table-hover">
                    <tbody>
                    <tr>
                      <th scope="row"> درصد اشباع خاک:</th>
                      <td>{{soilResult.sp}}</td>
                    </tr>
                    <tr>
                      <th scope="row">شن:</th>
                      <td>{{soilResult.sand}}</td>
                    </tr>
                    <tr>
                      <th scope="row">سیلت:</th>
                      <td>{{soilResult.silt}}</td>
                    </tr>
                    <tr>
                      <th scope="row">رس:</th>
                      <td>{{soilResult.clay}}</td>
                    </tr>
                    <tr>
                      <th scope="row">روی:</th>
                      <td>{{soilResult.zine}}</td>
                    </tr>
                    <tr>
                      <th scope="row">آهن:</th>
                      <td>{{soilResult.iron}}</td>
                    </tr>
                    <tr>
                      <th scope="row">مس:</th>
                      <td>{{soilResult.copper}}</td>
                    </tr>
                    <tr>
                      <th scope="row"> منیزیم:</th>
                      <td>{{soilResult.manganese}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              
              </div>
              <div class="row justify-content-center" v-else>
                <div class="row mb-12">
                <div class="col text-center">
                  نتایجی یافت نشد
                 
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import {globalMixin} from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";
import Api from "../common/api";

export default {
  name: "ShowSoilExamination",
  components: {ProgressPage, HomeLayout},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      service: null,
      soilResult: null,
      laboratory: null,
      createdAt: ''
    };
  },
  props: ["id"],
  methods: {
    getService() {
      let self = this;
      Api.singleSoilResult({self: this, id: this.id})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              self.createdAt = data.created_at;
              self.service = data.service !== null ? data.service : null;
              self.soilResult = data.result !== null ? data.result : null;
              self.laboratory = data.laboratory !== null ? data.laboratory : null
              self.loading = false;
            }
          })
          .catch((error) => {
            this.loading = false;
            this.toastReturnTxt(error.response);
          });
    },
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.getService();
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/ShowSoilConsulting/ShowSoilConsulting";
</style>