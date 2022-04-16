<template>
  <div>
    <div>
      <div class="farm-item"
           v-if="activeService && activeServiceFirstSubService"
      >
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center farm-setting">
           <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(10) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.083 3.542)">
      <path id="Stroke_1" data-name="Stroke 1" d="M5.833,0,2.917,2.917,0,0" fill="none" stroke="#7fd2bc"
            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    </g>
  </g>
</svg>

          </span>
              <span @click="goToServiceInformationPage">تنظیمات محصول</span>
            </div>
            <div v-if="activeServiceFirstSubService.name" class="text-right farm-item-first-title">
              {{ activeServiceFirstSubService.name }}
            </div>
            <div v-else class="text-right farm-item-first-title">
              نوع گل را نمیدانم
            </div>
          </div>
          <div class="d-flex flex-row-reverse justify-content-between margin-top">
            <div class="d-flex flex-column align-items-center">
              <div v-if="activeService.type === 'farm' || activeService.type === 'garden'" class="farm-item-title">
                مساحت
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16.345" height="16.298" viewBox="0 0 16.345 16.298">
  <path id="area"
        d="M15.541,12.551a1.564,1.564,0,0,1,0,2.21l0,0L14.469,15.82a.625.625,0,1,1-.878-.889l.625-.618H4.186a2.5,2.5,0,0,1-2.5-2.5V1.767l-.624.615a.625.625,0,0,1-.878-.89L1.24.451a1.575,1.575,0,0,1,2.2,0L4.5,1.493a.625.625,0,0,1-.878.89l-.686-.677V11.813a1.251,1.251,0,0,0,1.25,1.25H14.279l-.689-.68a.625.625,0,1,1,.878-.889l1.069,1.056,0,0ZM14.123,0H6.03a.625.625,0,1,0,0,1.25h8.094a.625.625,0,0,1,.625.625V10A.625.625,0,1,0,16,10V1.875A1.875,1.875,0,0,0,14.123,0Z"
        transform="translate(0.146 0.198)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
</svg>

              </span>
              </div>
              <div v-if="activeService.type === 'apartment'" class="farm-item-title">
                سن
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16.345" height="16.298" viewBox="0 0 16.345 16.298">
  <path id="area"
        d="M15.541,12.551a1.564,1.564,0,0,1,0,2.21l0,0L14.469,15.82a.625.625,0,1,1-.878-.889l.625-.618H4.186a2.5,2.5,0,0,1-2.5-2.5V1.767l-.624.615a.625.625,0,0,1-.878-.89L1.24.451a1.575,1.575,0,0,1,2.2,0L4.5,1.493a.625.625,0,0,1-.878.89l-.686-.677V11.813a1.251,1.251,0,0,0,1.25,1.25H14.279l-.689-.68a.625.625,0,1,1,.878-.889l1.069,1.056,0,0ZM14.123,0H6.03a.625.625,0,1,0,0,1.25h8.094a.625.625,0,0,1,.625.625V10A.625.625,0,1,0,16,10V1.875A1.875,1.875,0,0,0,14.123,0Z"
        transform="translate(0.146 0.198)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
</svg>

              </span>
              </div>
              <div v-if="activeService.type === 'greenhouse'" class="farm-item-title">
                نوع آبیاری
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16.345" height="16.298" viewBox="0 0 16.345 16.298">
  <path id="area"
        d="M15.541,12.551a1.564,1.564,0,0,1,0,2.21l0,0L14.469,15.82a.625.625,0,1,1-.878-.889l.625-.618H4.186a2.5,2.5,0,0,1-2.5-2.5V1.767l-.624.615a.625.625,0,0,1-.878-.89L1.24.451a1.575,1.575,0,0,1,2.2,0L4.5,1.493a.625.625,0,0,1-.878.89l-.686-.677V11.813a1.251,1.251,0,0,0,1.25,1.25H14.279l-.689-.68a.625.625,0,1,1,.878-.889l1.069,1.056,0,0ZM14.123,0H6.03a.625.625,0,1,0,0,1.25h8.094a.625.625,0,0,1,.625.625V10A.625.625,0,1,0,16,10V1.875A1.875,1.875,0,0,0,14.123,0Z"
        transform="translate(0.146 0.198)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
</svg>

              </span>
              </div>
              <Popper v-if="activeService.type === 'farm' || activeService.type === 'garden'">
                <button class="farm-item-value border-0 d-flex justify-content-center align-items-center">
              <span v-if="activeService.type === 'farm' || activeService.type === 'garden'" class="me-2">{{
                  activeServiceFirstSubService.area.unit
                }}</span>
                  {{ activeServiceFirstSubService ? shortener((activeServiceFirstSubService.area.area.toLocaleString()).toString(), 4) : 0 }}
                </button>
                <template #content>
                  <div>{{ activeServiceFirstSubService.area.area.toLocaleString() }}</div>
                </template>
              </Popper>
              <button v-if="activeService.type === 'apartment'"
                      class="farm-item-value border-0 d-flex justify-content-center align-items-center">
                <span v-if="activeService.type === 'apartment'" class="me-2">سال</span>
                <span> {{ activeServiceFirstSubService.age }}</span>
              </button>
              <button v-if="activeService.type === 'greenhouse'"
                      class="farm-item-value border-0 d-flex justify-content-center align-items-center">
                <span> {{ activeServiceFirstSubService.irrigation_type.name }}</span>
              </button>
            </div>
            <div>
              <div class="d-flex flex-column align-items-center align-items-center">
                <div v-if="activeService.type === 'farm' || activeService.type ==='greenhouse' || activeService.type === 'garden'" class="farm-item-title">
                  رقم
                </div>
                <div v-if="activeService.type === 'farm' || activeService.type ==='greenhouse' || activeService.type === 'garden'"
                     class="farm-item-value d-flex justify-content-center align-items-center text-center">
                  {{
                    activeServiceFirstSubService.crop_variety.name
                  }}
                </div>
                <div v-if="activeService.type === 'apartment'" class="farm-item-title"> نام گیاه</div>
                <div v-if="activeService.type === 'apartment' && activeServiceFirstSubService.flower_type !== null"
                     class="farm-item-value d-flex justify-content-center align-items-center">
                  {{
                    activeServiceFirstSubService.flower_type.name
                  }}
                </div>
                <div v-if="activeService.type === 'apartment' && activeServiceFirstSubService.flower_type === null"
                     class="text-nowrap farm-item-value d-flex justify-content-center align-items-center">
                  نوع گل را نمیدانم
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex flex-column align-items-center align-items-center">
                <div class="farm-item-title">
                  تاریخ کشت
                  <span>
               <svg id="Iconly_Light_Calendar" data-name="Iconly/Light/Calendar" xmlns="http://www.w3.org/2000/svg"
                    width="18" height="18" viewBox="0 0 18 18">
  <g id="Calendar" transform="translate(2.25 1.5)">
    <path id="Line_200" d="M0,.473H13.368" transform="translate(0.069 5.08)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_201" d="M.459.473H.466" transform="translate(9.623 8.009)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_202" d="M.459.473H.466" transform="translate(6.295 8.009)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_203" d="M.459.473H.466" transform="translate(2.96 8.009)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_204" d="M.459.473H.466" transform="translate(9.623 10.924)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_205" d="M.459.473H.466" transform="translate(6.295 10.924)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_206" d="M.459.473H.466" transform="translate(2.96 10.924)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_207" d="M.463,0V2.468" transform="translate(9.32 0)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Line_208" d="M.463,0V2.468" transform="translate(3.261 0)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Path"
          d="M9.929,0H3.578A3.227,3.227,0,0,0,0,3.482V10.27a3.258,3.258,0,0,0,3.578,3.546H9.922A3.229,3.229,0,0,0,13.5,10.326V3.482C13.507,1.227,12.138,0,9.929,0Z"
          transform="translate(0 1.184)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.2"/>
  </g>
</svg>

             </span>
                </div>
                <div v-if="activeService.type === 'farm' || activeService.type ==='greenhouse' || activeService.type === 'garden'" style="direction: rtl"
                     class="farm-item-value d-flex justify-content-center align-items-center text-nowrap">
                  {{ $filter.moment(activeServiceFirstSubService.planting_date, "jYYYY/jM/jD") }}
                </div>
                <div v-if="activeService.type === 'apartment'" style="direction: rtl"
                     class="farm-item-value d-flex justify-content-center align-items-center text-nowrap">
                  {{ $filter.moment(activeServiceFirstSubService.created_at, "jYYYY/jM/jD") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="farm-item d-flex justify-content-center align-items-center empty-farm-item" v-else>
        <div class="d-flex flex-column align-items-center">
          <div class="text-warning fw-bold">
            شما هنوز گیاهی ثبت نکرده اید
          </div>
          <div class="existing-farm-value">
            لطفا اولین گیاه خود را ثبت کنید
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {globalMixin} from "../../mixins/globalMixin";

export default {
  name: "FarmItem",
  mixins: [globalMixin],
  methods: {
    goToServiceInformationPage() {
      let type = this.activeService.type
      if (type === 'apartment') this.$router.push(`/flower-type/${this.activeService.service_id}/information`)
      if (type === 'farm') this.$router.push(`/farm/${this.activeService.service_id}/information`)
      if (type === 'garden') this.$router.push(`/garden/${this.activeService.service_id}/information`)
      if (type === 'greenhouse') this.$router.push(`/green-house/${this.activeService.service_id}/information`)
    }
  },
  props: {
    activeService: {
      type: Object,
    },
    activeServiceFirstSubService: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/FarmItem";
</style>