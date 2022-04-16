<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage/>
    </div>
    <div v-if="!loading">
      <div class="show-soil-consulting">
        <div>
          <div class="header border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <div v-if="service !== null" class="d-flex align-items-center">
                <span class="farm-title"> {{ serviceName !== null ? serviceName : '' }}</span>
                <span class="farm-area"
                >{{
                    serviceArea !== null 
                        ? "(" + serviceArea.area + " " + serviceArea.unit + ")"
                        : ""
                  }} </span
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
          <div class="row">
            <div class="col">
              <h3 class="d-inline">
                {{plant !== null ? `محصول ${plant.crop !== null ? plant.crop.name : plant.flower_type.name}` : ''}}
              </h3>
              <span class="text-muted" v-if="plant !== null && plant.area !== null">{{plant.area.area + " " + plant.area.unit}}</span>

              <span class="mx-2 text-primary text-small">تاریخ مشاوره:{{createAt}}</span>
            </div>
            <div class="col">
              <span class="float-start mt-1 text-small text-success">وضعیت: {{status !== null ? status.title_fa : 'در انتظار بررسی'}}</span>
            </div>
          </div>
          <div class="row mt-5" v-if="status !== null && status.code !== 0">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <span>توضیح کارشناس:</span>
                </div>
                <div class="card-body">
                  {{
                     consult !== null && consult.expert_description !== null ? consult.expert_description
                                                    : 'در انتظار پاسخ'
                  }}

                  
                  <!-- <p>یک نمونه توضیح کارشناسی یک نمونه توضیح کارشناسی یک نمونه توضیح کارشناسی یک نمونه توضیح کارشناسی یک
                    نمونه توضیح کارشناسی یک نمونه توضیح کارشناسی یک نمونه توضیح کارشناسی یک نمونه توضیح کارشناسی یک
                    نمونه توضیح کارشناسی </p> -->
                </div>
              </div>
            </div>
            <div class="col-12">
              <blockquote class="blockquote border-0 my-5">
                <p class="mb-3"> {{consult !== null && consult.user_description !== null ?
                                                                consult.user_description
                                                                :
                                                                'توضیحات کاربر ثبت نشده است'}}</p>
                <footer class="blockquote-footer">توضیح کاربر
                  <!-- <cite title="Source Title">محمد رضوانی</cite> -->
                </footer>
              </blockquote>
            </div>
          </div>
              <div class="row justify-content-center" v-else>
                <div class="row mb-12">
                <div class="col text-center">
                  در انتظار بررسی
                 
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
import moment from "moment-jalaali";

export default {
  name: "ShowPlantConsulting",
  components: {ProgressPage, HomeLayout},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      serviceName: null,
      serviceArea: null,
      plant: null,
      consult: null,
      status: null,
      createAt: null
    };
  },
  props: ["id"],
  methods: {
    getConsultResult() {
      let self = this;
      Api.singleConsultApi({self: this, id: this.id})
          .then((res) => {
            if (res.status === 200) {
              let data = res.data;
              self.loading = false;
              self.serviceName = data.service !== null && data.service.parent !== undefined ? data.service.parent.name : data.service.name
              self.serviceArea = data.service !== null && data.service.parent !== undefined ? data.service.parent.area : data.service.area
              self.plant= data.service !== null && data.service.parent !== undefined ? data.service : null,
              self.consult= data !== null ? data : null,
              self.status = data !== null ? data.status : null;
              self.createAt = data !== null && data.create_at !== null ? moment(data.created_at,"YYYY-MM-DD").format("jYYYY/jMM/jDD") : ''
            }
          })
          .catch((error) => {
            self.loading = false;
            this.toastReturnTxt(error.response);
          });
    }
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.getConsultResult();
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/ShowPlantConsulting/ShowPlantConsulting";
</style>


