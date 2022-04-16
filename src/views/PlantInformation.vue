<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage/>
    </div>
    <div class="FarmInformation" v-if="!loading">
      <div>
        <div class="border-bottom padding-bottom-17">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex">
              <div
                  @click="goToFarmEditPage"
                  class="d-flex align-items-center pointer"
              >
                <span class="edit-farm-txt">ویرایش</span>
                <span class="edit-farm-icon">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                  >
                    <g
                        id="Group_8938"
                        data-name="Group 8938"
                        transform="translate(-711 -335)"
                    >
                      <g
                          id="Iconly_Light_Edit"
                          data-name="Iconly/Light/Edit"
                          transform="translate(711 335)"
                      >
                        <g id="Edit" transform="translate(3.5 3.5)">
                          <path
                              id="Stroke_1"
                              data-name="Stroke 1"
                              d="M0,.5H6.377"
                              transform="translate(10.2 15.898)"
                              fill="none"
                              stroke="#7fd2bc"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                          />
                          <path
                              id="Stroke_3"
                              data-name="Stroke 3"
                              d="M8.6.706A1.947,1.947,0,0,1,11.473.553l1.39,1.09A1.946,1.946,0,0,1,13.4,4.464L5.11,15.039a1.481,1.481,0,0,1-1.15.568l-3.2.041L.039,12.533a1.486,1.486,0,0,1,.277-1.252Z"
                              transform="translate(0.75 0.75)"
                              fill="none"
                              stroke="#7fd2bc"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                          />
                          <path
                              id="Stroke_5"
                              data-name="Stroke 5"
                              d="M0,0,4.794,3.758"
                              transform="translate(7.803 3.436)"
                              fill="none"
                              stroke="#7fd2bc"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </div>
              <div
                  class="d-flex align-items-center pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
              >
                <span class="delete-farm-txt">حذف</span>
                <span class="delete-farm-icon">
                  <svg
                      id="Iconly_Light_Delete"
                      data-name="Iconly/Light/Delete"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                  >
                    <g id="Delete" transform="translate(3 2)">
                      <path
                          id="Stroke_1"
                          data-name="Stroke 1"
                          d="M14.191,0s-.543,6.735-.858,9.572a2.238,2.238,0,0,1-2.358,2.174c-2.609.047-5.221.05-7.829-.005A2.214,2.214,0,0,1,.857,9.579C.54,6.717,0,0,0,0"
                          transform="translate(2.134 7.468)"
                          fill="none"
                          stroke="#d27f85"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="1.5"
                      />
                      <path
                          id="Stroke_3"
                          data-name="Stroke 3"
                          d="M16.958.5H0"
                          transform="translate(0.75 3.74)"
                          fill="none"
                          stroke="#d27f85"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="1.5"
                      />
                      <path
                          id="Stroke_5"
                          data-name="Stroke 5"
                          d="M10.423,3.489A1.648,1.648,0,0,1,8.808,2.165L8.565.949A1.28,1.28,0,0,0,7.328,0H3.1A1.28,1.28,0,0,0,1.858.949L1.615,2.165A1.648,1.648,0,0,1,0,3.489"
                          transform="translate(4.018 0.751)"
                          fill="none"
                          stroke="#d27f85"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="1.5"
                      />
                    </g>
                  </svg>
                </span>
              </div>
              <div
                  class="modal fade"
                  ref="vuemodal"
                  id="editModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                          class="modal-title text-danger"
                          id="exampleModalLabel"
                      >
                        حذف گیاه
                      </h5>
                      <button
                          type="button"
                          class="btn-close m-0"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p>آیا گیاه {{ plant.crop }} حذف شود؟</p>
                    </div>
                    <div class="modal-footer">
                      <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                      >
                        خیر
                      </button>
                      <button type="button" class="btn btn-primary">بله</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="FarmInformationTitle">
              {{ plant.crop }}
              <span class="FarmInformationSubTitle"
              >(
                {{ plant.area }}
                هکتار )</span
              >
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="plants.length > 0">
          <div class="row FarmInformationList justify-content-end">
            <!--            <div class="col-12 col-md-6" v-for="item in plants" :key="item.id">-->
            <!--              <div>-->
            <!--                <div class="d-flex flex-column FarmInformation">-->
            <!--                  <div class="d-flex justify-content-between align-items-center margin-bottom-40">-->
            <!--                    <div>-->
            <!--                      <svg id="Iconly_Light_Edit" data-name="Iconly/Light/Edit" xmlns="http://www.w3.org/2000/svg"-->
            <!--                           width="24" height="24" viewBox="0 0 24 24">-->
            <!--                        <g id="Edit" transform="translate(3.5 3.5)">-->
            <!--                          <path id="Stroke_1" data-name="Stroke 1" d="M0,.5H6.377" transform="translate(10.2 15.898)"-->
            <!--                                fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round"-->
            <!--                                stroke-miterlimit="10" stroke-width="1.5"/>-->
            <!--                          <path id="Stroke_3" data-name="Stroke 3"-->
            <!--                                d="M8.6.706A1.947,1.947,0,0,1,11.473.553l1.39,1.09A1.946,1.946,0,0,1,13.4,4.464L5.11,15.039a1.481,1.481,0,0,1-1.15.568l-3.2.041L.039,12.533a1.486,1.486,0,0,1,.277-1.252Z"-->
            <!--                                transform="translate(0.75 0.75)" fill="none" stroke="#a8a9ab" stroke-linecap="round"-->
            <!--                                stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>-->
            <!--                          <path id="Stroke_5" data-name="Stroke 5" d="M0,0,4.794,3.758" transform="translate(7.803 3.436)"-->
            <!--                                fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round"-->
            <!--                                stroke-miterlimit="10" stroke-width="1.5"/>-->
            <!--                        </g>-->
            <!--                      </svg>-->
            <!--                    </div>-->
            <!--                    <div class="FarmInformationListTitle">{{ item.crop }}</div>-->
            <!--                  </div>-->
            <!--                  <div class="d-flex justify-content-between align-items-center">-->
            <!--                    <div class="d-flex flex-column align-items-center">-->
            <!--                      <div class="FarmInformationText">تاریخ ثبت-->
            <!--                        <span class="FarmInformationTextIcon">-->
            <!--                     <svg id="Iconly_Light_Calendar" data-name="Iconly/Light/Calendar" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">-->
            <!--  <g id="Calendar" transform="translate(2.25 1.5)">-->
            <!--    <path id="Line_200" d="M0,.473H13.368" transform="translate(0.069 5.08)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_201" d="M.459.473H.466" transform="translate(9.623 8.009)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_202" d="M.459.473H.466" transform="translate(6.295 8.009)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_203" d="M.459.473H.466" transform="translate(2.96 8.009)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_204" d="M.459.473H.466" transform="translate(9.623 10.924)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_205" d="M.459.473H.466" transform="translate(6.295 10.924)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_206" d="M.459.473H.466" transform="translate(2.96 10.924)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_207" d="M.463,0V2.468" transform="translate(9.32 0)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Line_208" d="M.463,0V2.468" transform="translate(3.261 0)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--    <path id="Path" d="M9.929,0H3.578A3.227,3.227,0,0,0,0,3.482V10.27a3.258,3.258,0,0,0,3.578,3.546H9.922A3.229,3.229,0,0,0,13.5,10.326V3.482C13.507,1.227,12.138,0,9.929,0Z" transform="translate(0 1.184)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>-->
            <!--  </g>-->
            <!--</svg>-->
            <!--                   </span>-->
            <!--                      </div>-->
            <!--                      <div class="FarmInformationValue d-flex justify-content-center">{{ $filter.moment(item.created_at, "jYYYY/jM/jD") }}</div>-->
            <!--                    </div>-->
            <!--                    <div class="d-flex flex-column align-items-center">-->
            <!--                      <div class="FarmInformationText">نوع محصول</div>-->
            <!--                      <div dir="rtl" class="FarmInformationValue d-flex justify-content-center">{{ item.crop }}</div>-->
            <!--                    </div>-->
            <!--                    <div class="d-flex flex-column align-items-center">-->
            <!--                      <div class="FarmInformationText">-->
            <!--                        مساحت-->
            <!--                        <span class="FarmInformationTextIcon">-->
            <!--                      <svg xmlns="http://www.w3.org/2000/svg" width="16.345" height="16.298" viewBox="0 0 16.345 16.298">-->
            <!--  <path id="area" d="M15.541,12.551a1.564,1.564,0,0,1,0,2.21l0,0L14.469,15.82a.625.625,0,1,1-.878-.889l.625-.618H4.186a2.5,2.5,0,0,1-2.5-2.5V1.767l-.624.615a.625.625,0,0,1-.878-.89L1.24.451a1.575,1.575,0,0,1,2.2,0L4.5,1.493a.625.625,0,0,1-.878.89l-.686-.677V11.813a1.251,1.251,0,0,0,1.25,1.25H14.279l-.689-.68a.625.625,0,1,1,.878-.889l1.069,1.056,0,0ZM14.123,0H6.03a.625.625,0,1,0,0,1.25h8.094a.625.625,0,0,1,.625.625V10A.625.625,0,1,0,16,10V1.875A1.875,1.875,0,0,0,14.123,0Z" transform="translate(0.146 0.198)" fill="#919294" stroke="#919294" stroke-width="0.2"/>-->
            <!--</svg>-->
            <!--                    </span>-->
            <!--                      </div>-->
            <!--                      <button data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" :data-bs-content="item.area" dir="rtl" class="FarmInformationValue d-flex justify-content-center border-0">-->
            <!--                        {{ shortener((item.area).toString(),4) }}-->
            <!--                        هکتار-->
            <!--                      </button>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div>-->

            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
        <div
            class="d-flex justify-content-center align-items-center empty-plants"
            v-else
        ></div>
      </div>
      <div class="d-flex justify-content-center">
        <div
            class="d-flex align-items-center AddNewPlantButton"
            @click="addNewPlant"
        >
          <span> افزودن قطعه جدید</span>
          <span class="plus-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
            >
              <g
                  id="Iconly_Light_Close_Square"
                  data-name="Iconly/Light/Close Square"
                  transform="translate(0.75 0.75)"
              >
                <g
                    id="Close_Square"
                    data-name="Close Square"
                    transform="translate(-0.75 -0.75)"
                >
                  <path
                      id="Stroke_1"
                      data-name="Stroke 1"
                      d="M4.792,0,0,4.792"
                      transform="translate(10 6.603) rotate(45)"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                  />
                  <path
                      id="Stroke_2"
                      data-name="Stroke 2"
                      d="M4.8,4.8,0,0"
                      transform="translate(9.999 6.6) rotate(45)"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                  />
                  <path
                      id="Stroke_3"
                      data-name="Stroke 3"
                      d="M13.584,0H4.915C1.894,0,0,2.139,0,5.166v8.168C0,16.361,1.885,18.5,4.915,18.5h8.668c3.031,0,4.917-2.139,4.917-5.166V5.166C18.5,2.139,16.614,0,13.584,0Z"
                      transform="translate(0.751 0.75)"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                  />
                </g>
              </g>
            </svg>
          </span>
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
import {Popover} from "bootstrap/dist/js/bootstrap.esm.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default {
  name: "PlantInformation",
  components: {ProgressPage, HomeLayout},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      plant: {},
      plants: [],
    };
  },
  props: ["serviceId"],
  methods: {
    plantInformationData() {
      let self = this;
      Api.getPlantInformationDataApi({self: this, id: this.serviceId})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data.plant;
              this.loading = false;
              this.plant = data;
              // this.plants = data.plantings;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },

    addNewPlant() {
      // this.$router.push({path: `/add-plant/${this.id}`})
      this.$router.push({name: "AddPlant", params: {serviceId: this.serviceId}});
    },
    goToFarmEditPage() {
      // this.$router.push({ path: `/edit-farm/${this.farm.id}` });
      this.$router.push({name: 'EditFarm', params: {serviceId: this.farm.id}});
    },
    // deleteFarm(){
    //   Api.deleteFarmApi({self: this, id: this.id}).then((response) => {
    //     if (response.status === 200) {
    //       $('#editModal').modal('hide');
    //       $(this.$refs.vuemodal).modal('hide')
    //       // $('#editModal').hide();
    //       // this.$root.$emit("bs::hide::modal", "editModal");
    //       // this.toastReturnTxt(response)
    //       this.$router.back();
    //     }
    //   }).catch((error) => {
    //     console.log(error)
    //     // this.toastReturnTxt(error.response)
    //   })
    // },
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.plantInformationData();
    Array.from(
        document.querySelectorAll('button[data-bs-toggle="popover"]')
    ).forEach((popoverNode) => new Popover(popoverNode));
  },
};
</script>

<style scoped>
</style>