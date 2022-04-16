<template>
  <HomeLayout :withoutSideBar="true">
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div v-if="service &&  !loading">
      <div v-if="service.breadcrumbs" class="d-md-none d-flex align-items-center justify-content-end breadcrumbs">
        <span @click="goToServicesPageWithQuery(service.breadcrumbs.parent.id)" class="pointer" v-if="service.breadcrumbs.parent">{{service.breadcrumbs.parent.name}}</span>
        <span class="ms-3 me-2" v-if="service.breadcrumbs.parent">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(12) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.5 4.25)">
      <path id="Stroke_1" data-name="Stroke 1" d="M7,0,3.5,3.5,0,0" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    </g>
  </g>
</svg>
        </span>
        <span @click="goToServicesPageWithQuery(service.breadcrumbs.category_id)" class="pointer" v-if="service.breadcrumbs">{{service.breadcrumbs.category_name}}</span>
      </div>
      <div class="show-service d-flex flex-column flex-md-row">
        <div class="d-md-none d-flex align-items-center justify-content-between mb-2">
          <h2 class="product-name mb-0">{{service.product.name}}</h2>
          <span @click="addToFavorite" v-if="isFavoriteService===0"  class="pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.997" height="20.784" viewBox="0 0 16.997 20.784">
  <g id="Bookmark" transform="translate(-0.046 -0.028)">
    <path id="Path_33968" d="M7.368,15.854,1.437,19.1a.989.989,0,0,1-1.318-.394h0A1.043,1.043,0,0,1,0,18.243V3.844C0,1.1,1.876,0,4.577,0H10.92C13.538,0,15.5,1.025,15.5,3.661V18.243a.979.979,0,0,1-.979.979,1.08,1.08,0,0,1-.476-.119L8.073,15.854A.741.741,0,0,0,7.368,15.854Z" transform="translate(0.796 0.778)" fill="none" stroke="#4c4d4e" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Line_209" d="M0,.458H7.3" transform="translate(4.87 6.865)" fill="none" stroke="#4c4d4e" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
          </span>
          <span v-if="isFavoriteService===1"  @click="addToFavorite"  class="pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.997" height="20.784" viewBox="0 0 16.997 20.784">
  <g id="Bookmark" transform="translate(-0.046 -0.028)">
    <path id="Path_33968" d="M7.368,15.854,1.437,19.1a.989.989,0,0,1-1.318-.394h0A1.043,1.043,0,0,1,0,18.243V3.844C0,1.1,1.876,0,4.577,0H10.92C13.538,0,15.5,1.025,15.5,3.661V18.243a.979.979,0,0,1-.979.979,1.08,1.08,0,0,1-.476-.119L8.073,15.854A.741.741,0,0,0,7.368,15.854Z" transform="translate(0.796 0.778)" fill="#7fd2bc" stroke="#7fd2bc" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Line_209" d="M0,.458H7.3" transform="translate(4.87 6.865)" fill="#7fd2bc" stroke="#7fd2bc" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
          </span>
        </div>
        <div class="d-md-none date">17 ساعت پیش در تهران</div>
        <div class="d-md-none">
          <swiper
              dir="ltr"
              :pagination="{
              clickable: true,
            }"
          >
            <swiper-slide class="d-flex justify-content-center" v-for="image in service.product.images" :key="image.id" >
            <div class="at-mobile-product-image">
              <img :src="image.url"/>
            </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="price d-md-none">
          <span>قیمت: </span>
          <span>{{service.product.price}}</span>
          <span>تومان</span>
        </div>
        <div @click="showCallInfo=!showCallInfo" v-if="!showCallInfo" class="d-flex justify-content-center align-items-center d-md-none call-info">
          اطلاعات تماس
        </div>
        <div v-if="showCallInfo" class="phone d-md-none">
          <span>شماره موبایل:</span>
          <span>{{service.product.phone}}</span>
        </div>
        <div class="d-flex flex-column description d-md-none">
          <span>توضیحات</span>
          <span>{{service.product.description}}</span>
        </div>
        <div class="d-none d-md-block">
          <div class="d-flex justify-content-center selected-img">
            <img v-if="selectedImg" :src="selectedImg.url"/>
          </div>
          <div class="d-flex product-images" v-if="service && service.product.images.length > 0">
            <div @click="selectedImg=image" class="d-flex justify-content-center product-image" v-for="image in service.product.images" :key="image.id">
              <img :src="image.url"/>
            </div>
          </div>
        </div>
        <div v-if="service" class="product-info d-none d-md-block flex-grow-1">
          <div v-if="service.breadcrumbs" class="d-none d-md-flex align-items-center breadcrumbs">
            <span @click="goToServicesPageWithQuery(service.breadcrumbs.parent.id)" class="pointer" v-if="service.breadcrumbs.parent">{{service.breadcrumbs.parent.name}}</span>
            <span class="ms-3 me-2" v-if="service.breadcrumbs.parent">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(12) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.5 4.25)">
      <path id="Stroke_1" data-name="Stroke 1" d="M7,0,3.5,3.5,0,0" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    </g>
  </g>
</svg>
        </span>
            <span @click="goToServicesPageWithQuery(service.breadcrumbs.category_id)" class="pointer" v-if="service.breadcrumbs">{{service.breadcrumbs.category_name}}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h2 class="product-name mb-0">{{service.product.name}}</h2>
            <span v-if="favorite_id === null" @click="addToFavorite" class="pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.997" height="20.784" viewBox="0 0 16.997 20.784">
  <g id="Bookmark" transform="translate(-0.046 -0.028)">
    <path id="Path_33968" d="M7.368,15.854,1.437,19.1a.989.989,0,0,1-1.318-.394h0A1.043,1.043,0,0,1,0,18.243V3.844C0,1.1,1.876,0,4.577,0H10.92C13.538,0,15.5,1.025,15.5,3.661V18.243a.979.979,0,0,1-.979.979,1.08,1.08,0,0,1-.476-.119L8.073,15.854A.741.741,0,0,0,7.368,15.854Z" transform="translate(0.796 0.778)" fill="none" stroke="#4c4d4e" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Line_209" d="M0,.458H7.3" transform="translate(4.87 6.865)" fill="none" stroke="#4c4d4e" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
          </span>
            <span v-else  @click="addToFavorite"  class="pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.997" height="20.784" viewBox="0 0 16.997 20.784">
  <g id="Bookmark" transform="translate(-0.046 -0.028)">
    <path id="Path_33968" d="M7.368,15.854,1.437,19.1a.989.989,0,0,1-1.318-.394h0A1.043,1.043,0,0,1,0,18.243V3.844C0,1.1,1.876,0,4.577,0H10.92C13.538,0,15.5,1.025,15.5,3.661V18.243a.979.979,0,0,1-.979.979,1.08,1.08,0,0,1-.476-.119L8.073,15.854A.741.741,0,0,0,7.368,15.854Z" transform="translate(0.796 0.778)" fill="#7fd2bc" stroke="#7fd2bc" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Line_209" d="M0,.458H7.3" transform="translate(4.87 6.865)" fill="#7fd2bc" stroke="#7fd2bc" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
          </span>
          </div>
          <div class="date">
            <span>{{$filter.moment(service.product.created_at, "from")}}</span>
            <span class="mx-2">در</span>
            <span>{{service.product.city.name}}</span>
          </div>
          <div class="price">
            <span>قیمت: </span>
            <span>{{service.product.price}}</span>
            <span>تومان</span>
          </div>
          <div @click="showCallInfo=!showCallInfo" v-if="!showCallInfo" class="d-flex justify-content-center align-items-center call-info">
            اطلاعات تماس
          </div>
          <div v-if="showCallInfo" class="phone">
            <span>شماره موبایل:</span>
            <span>{{service.product.phone}}</span>
          </div>
          <div class="d-flex flex-column description">
            <span>توضیحات</span>
            <span>{{service.product.description}}</span>
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { globalMixin } from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";
import {Swiper, SwiperSlide} from "swiper/vue";
import SwiperCore, {Autoplay, Lazy, Pagination} from "swiper";
import Api from "../common/api";
SwiperCore.use([Autoplay, Pagination, Lazy]);
export default {
  name: "ShowService",
  components: { ProgressPage, HomeLayout, Swiper, SwiperSlide },
  mixins: [globalMixin],
  inject: ["$axios"],
  props:['id'],
  data(){
    return{
      service:null,
      selectedImg:null,
      showCallInfo:false,
      favorite_id:null

    }
  },
  methods:{
    getService(){
        let self = this;
        this.loading=true
        Api.getServiceApi({ self: this,id:this.id })
            .then((response) => {
              if (response.status === 200) {
                self.service = response.data;
                this.favorite_id=response.data.product.favorite_id !== null ? response.data.product.favorite_id : null
                response.data.product.images.length > 0 ? this.selectedImg=response.data.product.images[0]:null
                this.loading=false
              }
            })
            .catch((error) => {
              self.handleError(self, error);
              this.loading=false
            });
      },
    addToFavorite(){
      if(this.favorite_id !== null){
        Api.DeleteFavoriteApi({ self: this,id:this.favorite_id})
            .then((response) => {
              if (response.status === 200) {
                this.favorite_id=null
                this.toastReturnTxt(response);
              }
            })
            .catch((error) => {
              this.toastReturnTxt(error.response);
            });
      }else{
        Api.addFavoriteApi({ self: this,data:{product_id:this.id}})
            .then((response) => {
              if (response.status === 200) {
                this.favorite_id=response.data.favorite.id
                this.toastReturnTxt(response);
              }
            })
            .catch((error) => {
              this.toastReturnTxt(error.response);
            });
      }
    },
    goToServicesPageWithQuery(id){
      this.$router.push({path:'/Services',query:{category_id:id}})
    }
    },
    mounted() {
    this.getService()
    }
}
</script>

<style lang="scss">
@import "src/styles/modules/ShowService/ShowService";
</style>
