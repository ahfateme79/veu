<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div class="MyAdvertisements" v-if="!loading">
    <header class="d-flex align-items-center justify-content-between header">
      <span>آگهی های من</span>
      <div @click="goAnotherPage('/advertisement-create-category-selection')" class="d-none d-md-flex justify-content-center align-items-center adv-add-btn">ثبت آگهی جدید</div>
    </header>
      <div  v-if="MyAdvertisements.length === 0">آیتمی برای نمایش وجود ندارد</div>
      <div v-else class="d-flex flex-column MyAdvertisementsList">
        <div class="adv-box d-flex " v-for="adv in MyAdvertisements" :key="adv.id">
          <div class="d-flex justify-content-center adv-img">
            <img v-if="adv && adv.images.length > 0"  class="w-100 h-100" :src="adv.images[0].url" />
          </div>
          <div class="d-flex flex-column justify-content-around flex-grow-1">
          <div class="d-flex justify-content-between align-items-center">
            <div class="adv-name">{{adv.name}}</div>
            <div class="date"> {{ $filter.moment(adv.created_at, "jYYYY/jM/jD") }}</div>
          </div>
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div class="align-self-start adv-price">
                <span>قیمت: </span>
                <span>{{adv.price.toLocaleString()}}</span>
                <span>تومان</span>
              </div>
              <div class="align-self-end d-flex align-items-center">
                <div @click="goAnotherPage(`/advertisement/${adv.id}/edit`)" class="d-flex align-items-center pointer">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.333" height="17.269" viewBox="0 0 17.333 17.269">
  <g id="Edit" transform="translate(0.007 0.121)">
    <path id="Stroke_1" data-name="Stroke 1" d="M0,.5H6.377" transform="translate(10.2 15.898)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M8.6.706A1.947,1.947,0,0,1,11.473.553l1.39,1.09A1.946,1.946,0,0,1,13.4,4.464L5.11,15.039a1.481,1.481,0,0,1-1.15.568l-3.2.041L.039,12.533a1.486,1.486,0,0,1,.277-1.252Z" transform="translate(0.75 0.75)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_5" data-name="Stroke 5" d="M0,0,4.794,3.758" transform="translate(7.803 3.436)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
                  </span>
                  <span class="edit-delete me-2 ms-2 ms-md-5">ویرایش آگهی</span>
                </div>
                <div @click="showDeleteAdvModal(adv)" class="d-flex align-items-center pointer">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.458" height="19.999" viewBox="0 0 18.458 19.999">
  <g id="Delete" transform="translate(0 -0.001)">
    <path id="Stroke_1" data-name="Stroke 1" d="M14.191,0s-.543,6.735-.858,9.572a2.238,2.238,0,0,1-2.358,2.174c-2.609.047-5.221.05-7.829-.005A2.214,2.214,0,0,1,.857,9.579C.54,6.717,0,0,0,0" transform="translate(2.134 7.468)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M16.958.5H0" transform="translate(0.75 3.74)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_5" data-name="Stroke 5" d="M10.423,3.489A1.648,1.648,0,0,1,8.808,2.165L8.565.949A1.28,1.28,0,0,0,7.328,0H3.1A1.28,1.28,0,0,0,1.858.949L1.615,2.165A1.648,1.648,0,0,1,0,3.489" transform="translate(4.018 0.751)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>

                  </span>
                  <span class="edit-delete me-2">حذف آگهی</span>
                </div>
                <div
                    class="modal fade"
                    id="deleteAdvModal"
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
                          حذف {{ adv.name }}
                        </h5>
                        <button
                            type="button"
                            class="btn-close m-0"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>آیا {{ adv.name }} حذف شود؟</p>
                      </div>
                      <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                          خیر
                        </button>
                        <button
                            @click="deleteAdv"
                            type="button"
                            class="btn btn-primary"
                        >
                          بله
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <div @click="goAnotherPage('/advertisement-create-category-selection')" class="d-flex d-md-none justify-content-center align-items-center adv-add-btn">ثبت آگهی جدید</div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { globalMixin } from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";
import Api from "../common/api";
import {Modal} from "bootstrap";
export default {
  name: "MyAdvertisements",
  components: { ProgressPage, HomeLayout },
  mixins: [globalMixin],
  inject: ["$axios"],
  data(){
    return{
      MyAdvertisements:[],
      deleteAdvModal:null,
      advToDelete:null,
    }
  },
  methods:{
    getMyAdvertisements(){
      let self = this;
      this.loading=true
      Api.getMyAdvertisementsApi({ self: this,id:this.id })
          .then((response) => {
            if (response.status === 200) {
              self.MyAdvertisements = response.data;
              this.loading=false
            }
          })
          .catch((error) => {
            self.handleError(self, error);
            this.loading=false
          });
    },
    showDeleteAdvModal(adv){
      this.deleteAdvModal = new Modal(
          document.getElementById("deleteAdvModal"),
          {}
      );
      this.advToDelete=adv
      this.deleteAdvModal.show();
    },
    deleteAdv(){
      this.loading=true
      Api.DeleteMyAdvertisementApi({ self: this,id:this.advToDelete.id })
          .then((response) => {
            if (response.status === 200) {
              this.toastReturnTxt(response);
              this.deleteAdvModal.hide();
              this.loading=false
              this.getMyAdvertisements()
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
            this.loading=false
          });
    }

  },
  mounted() {
    this.getMyAdvertisements()
  }
}
</script>

<style lang="scss">
@import "src/styles/modules/MyAdvertisements/MyAdvertisements";
</style>