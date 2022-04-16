<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div class="services" v-if="!loading">
      <header class="d-flex flex-column header">
        <div class="d-md-none d-flex align-items-center justify-content-between search-bar-wrapper">
          <div>
            <span @click="searchData">
              <svg
                  id="Iconly_Light_Search"
                  data-name="Iconly/Light/Search"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
              >
                <g id="Search" transform="translate(2 2)">
                  <circle
                      id="Ellipse_739"
                      cx="8.989"
                      cy="8.989"
                      r="8.989"
                      transform="translate(0.778 0.778)"
                      fill="none"
                      stroke="#cbcdd1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                  />
                  <path
                      id="Line_181"
                      d="M0,0,3.524,3.515"
                      transform="translate(16.018 16.485)"
                      fill="none"
                      stroke="#cbcdd1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                  />
                </g>
              </svg>
            </span>
            <input
                v-on:keyup.enter="searchData"
                class="search-bar-input"
                placeholder="جستجو آگهی"
                type="text"
                v-model="searchedText"
            />
          </div>
          <div class="d-md-none">
            <span class="border-right">
              <svg id="Iconly_Light_Location" data-name="Iconly/Light/Location" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Location" transform="translate(3.5 2)">
    <path id="Path_33958" d="M0,7.652A7.678,7.678,0,1,1,15.357,7.7v.087a11.338,11.338,0,0,1-3.478,7.3,20.183,20.183,0,0,1-3.591,2.957.93.93,0,0,1-1.217,0,19.817,19.817,0,0,1-5.052-4.73A9.826,9.826,0,0,1,0,7.678Z" transform="translate(0.739 0.739)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <circle id="Ellipse_740" cx="2.461" cy="2.461" r="2.461" transform="translate(5.957 6.078)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
            </span>
            <span @click="showSelectStateModal"  class="user-location" v-if="submitState === null">
              همه استان ها
              </span>
            <span @click="showSelectStateModal" class="user-location pointer" v-else>{{submitState.name}}</span>
          </div>
        </div>
        <div v-if="showFiltersSwiper === false" class="row mx-0 categories-swiper">
          <div :class="{ activeCategoryItemBox: selectedCategory.id === -1}" @click="deleteFilters" class="category-item-box d-flex justify-content-center align-items-center category-name col-2 col-md-1 text-center">همه</div>
          <div class="col-10 col-md-11">
            <swiper
                :slidesPerView="3.2"
                :spaceBetween="40"
                :breakpoints="{
                '768': {
                  slidesPerView: 6.3,
                  spaceBetween: 24,
                },
              }"
            >
              <swiper-slide v-for="category in categories" :key="category.id">
                <div @click="categoryBoxClicked(category)" class="d-flex justify-content-center align-items-center category-item-box" :class="{ activeCategoryItemBox: selectedCategory.id === category.id }">
                  <div class="d-none d-md-block">{{category.name}}</div>
                </div>
                <div class="d-flex d-md-none category-name text-center">{{category.name}}</div>
              </swiper-slide>
            </swiper>
            <div
                class="modal fade"
                id="subCatModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                   <span v-if="selectedCategory">{{selectedCategory.name}}</span>
                    <button
                        type="button"
                        class="btn-close m-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div v-if="selectedCategory && selectedCategory.children && selectedCategory.children.length > 0">
                      <div @click="subCatClicked(subCat)" class="sub-cat-box" v-for="subCat in selectedCategory.children" :key="subCat.id">
                        {{subCat.name}}
                      </div>
                    </div>
                    <div class="text-right" v-else>لیستی برای نمایش وجود ندارد</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  v-if="showFiltersSwiper === true"  class="categories-swiper">
          <div>
            <swiper
                :slidesPerView="3.6"
                :spaceBetween="16"
            >
              <swiper-slide>
                <div v-if="selectedSubCategory !== null" class="d-flex justify-content-center align-items-center category-item-box activeCategoryItemBox">
                {{selectedSubCategory.name}}
                </div>
              </swiper-slide>
              <swiper-slide>
                <div @click="priceModalShow" :class="{ activeCategoryItemBox: filtered.min_price || filtered.max_price}"  class="d-flex justify-content-center align-items-center category-item-box">
                  تعیین قیمت
                </div>
              </swiper-slide>
              <swiper-slide>
                <div :class="{ activeCategoryItemBox: filtered.min_date || filtered.max_date}" @click="dateModalShow" class="d-flex justify-content-center align-items-center category-item-box">
                  تعیین تاریخ
                </div>
              </swiper-slide>
              <swiper-slide>
                <div @click="setOnlyHasImageFilter" :class="{ activeCategoryItemBox: onlyHasImage == 1}" class="d-flex justify-content-center align-items-center category-item-box">
                  عکس دار ها
                </div>
              </swiper-slide>
            </swiper>
            <div
                class="modal fade"
                id="priceModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <span>قیمت</span>
                    <button
                        type="button"
                        class="btn-close m-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="deletePriceFilter"
                    >حذف فیلتر</button>
                  </div>
                  <div class="modal-body">
                    <div class="d-flex align-items-center mb-4">
                      <span class="input-label">از</span>
                      <div class="d-flex align-items-center justify-content-between price-input">
                        <Field
                            class="input"
                            id="price"
                            autocomplete=off
                            name="price"
                            type="text"
                            v-model="minPrice"
                        />
                        <span>تومان</span>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="input-label">تا</span>
                      <div class="d-flex align-items-center justify-content-between price-input">
                        <Field
                            class="input"
                            id="price"
                            autocomplete=off
                            name="price"
                            type="text"
                            v-model="maxPrice"
                        />
                        <span>تومان</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <div @click="setPriceFilter" class="d-flex justify-content-center align-items-center adv-add-btn"> اعمال فیلتر</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
                class="modal fade"
                id="dateModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <span>تاریخ</span>
                    <button
                        type="button"
                        class="btn-close m-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="deleteDateFilter"
                    >حذف فیلتر</button>
                  </div>
                  <div class="modal-body">
                    <div class="d-flex align-items-center mb-4">
                      <span class="input-label">از</span>
                      <div class="d-flex align-items-center justify-content-between price-input">
                        <date-picker auto-submit="true" v-model="minDate" />
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="input-label">تا</span>
                      <div class="d-flex align-items-center justify-content-between price-input">
                        <date-picker auto-submit="true" v-model="maxDate" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <div @click="setDateFilter" class="d-flex justify-content-center align-items-center adv-add-btn"> اعمال فیلتر</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center gap-1">
          <div class="d-none d-md-flex align-items-center justify-content-between search-bar-wrapper">
            <div>
            <span @click="searchData">
              <svg
                  id="Iconly_Light_Search"
                  data-name="Iconly/Light/Search"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
              >
                <g id="Search" transform="translate(2 2)">
                  <circle
                      id="Ellipse_739"
                      cx="8.989"
                      cy="8.989"
                      r="8.989"
                      transform="translate(0.778 0.778)"
                      fill="none"
                      stroke="#cbcdd1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                  />
                  <path
                      id="Line_181"
                      d="M0,0,3.524,3.515"
                      transform="translate(16.018 16.485)"
                      fill="none"
                      stroke="#cbcdd1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                  />
                </g>
              </svg>
            </span>
              <input
                  v-on:keyup.enter="searchData"
                  class="search-bar-input"
                  placeholder="جستجو آگهی"
                  type="text"
                  v-model="searchedText"
              />
            </div>
            <div class="d-md-none">
            <span class="border-right">
              <svg id="Iconly_Light_Location" data-name="Iconly/Light/Location" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Location" transform="translate(3.5 2)">
    <path id="Path_33958" d="M0,7.652A7.678,7.678,0,1,1,15.357,7.7v.087a11.338,11.338,0,0,1-3.478,7.3,20.183,20.183,0,0,1-3.591,2.957.93.93,0,0,1-1.217,0,19.817,19.817,0,0,1-5.052-4.73A9.826,9.826,0,0,1,0,7.678Z" transform="translate(0.739 0.739)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <circle id="Ellipse_740" cx="2.461" cy="2.461" r="2.461" transform="translate(5.957 6.078)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
            </span>
              <span class="user-location pointer">{{userLocation}}</span>
            </div>
          </div>
          <VueMultiselect
              class="d-none d-md-block text-end"
              v-model="selectedSubCategory"
              :options="selectedCategorySubCategories"
              placeholder="انتخاب زیر دسته"
              track-by="id"
              label="name"
              dir="rtl"
              :close-on-select="true"
              :clear-on-select="false"
              :show-labels="false"
              :allow-empty="true"
            
          >
          </VueMultiselect>
          <div
              class="modal fade"
              id="selectStateModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <span>انتخاب استان مورد نظر</span>
                  <button
                      type="button"
                      class="btn-close m-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      @click="deleteDateFilter"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="d-flex justify-content-between">
                    <VueMultiselect
                        class="text-end w-100 mb-3"
                        v-model="selectedState"
                        :options="states"
                        placeholder="انتخاب کنید"
                        track-by="id"
                        label="name"
                        dir="rtl"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :show-labels="false"
                        :allow-empty="false"
                        @open="this.getStates"
                    >
                    </VueMultiselect>
                    <div class="d-flex justify-content-center">
                      <div @click="setStateFilter" class="d-flex justify-content-center align-items-center adv-add-btn"> اعمال فیلتر</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none d-md-block">
            <span>
              <svg id="Iconly_Light_Location" data-name="Iconly/Light/Location" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Location" transform="translate(3.5 2)">
    <path id="Path_33958" d="M0,7.652A7.678,7.678,0,1,1,15.357,7.7v.087a11.338,11.338,0,0,1-3.478,7.3,20.183,20.183,0,0,1-3.591,2.957.93.93,0,0,1-1.217,0,19.817,19.817,0,0,1-5.052-4.73A9.826,9.826,0,0,1,0,7.678Z" transform="translate(0.739 0.739)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <circle id="Ellipse_740" cx="2.461" cy="2.461" r="2.461" transform="translate(5.957 6.078)" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
            </span>
            <span @click="showSelectStateModal"  class="user-location pointer" v-if="submitState === null">
          همه استان ها
              
</span>
            <span @click="showSelectStateModal" class="user-location pointer" v-else>{{submitState.name}}</span>
          </div>
          <div
              class="d-none d-md-flex justify-content-between align-items-center filter-btn"
              @click="showFilterModal"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="19.5" height="19.5" viewBox="0 0 19.5 19.5">
  <g id="Iconly_Light_Filter_2" data-name="Iconly/Light/Filter 2" transform="translate(0.75 0.75)">
    <g id="Filter_2" data-name="Filter 2">
      <path id="Filter_2-2" data-name="Filter 2" d="M6.564,18l4.3-2.023v-5.3L17.6,3.838a1.385,1.385,0,0,0,.4-.976v-1.5A1.345,1.345,0,0,0,16.677,0H1.323A1.345,1.345,0,0,0,0,1.366V2.9a1.389,1.389,0,0,0,.357.934l6.207,6.843Z" fill="none" stroke="#29bb89" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    </g>
  </g>
</svg>
            </span>
            <span>پالایش</span>
            <span class="d-flex justify-content-center align-items-center filter-nums">{{filterItemNums()}}</span>
          </div>
          <div
              class="modal fade"
              id="filterModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                      class="modal-title"
                      id="exampleModalLabel"
                  >
                   فیلتر
                  </h5>
                  <button
                      type="button"
                      class="btn-close m-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="d-flex flex-column mb-4">
                    <label class="filter-form-label text-right">محدوده قیمت:</label>
                    <div class="row">
                      <div class="col-1 align-self-center">
                        <button @click="deletePriceFilter" type="button" class="btn btn-danger text-nowrap">حذف فیلتر</button>
                      </div>
                      <div class="col">
                        <div class="d-flex align-items-center">
                          <span class="input-label">حداقل:</span>
                          <div class="d-flex align-items-center justify-content-between price-input">
                            <Field
                                class="input"
                                autocomplete=off
                                id="price"
                                name="price"
                                type="text"
                                v-model="minPrice"
                            />
                            <span>تومان</span>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="d-flex align-items-center">
                          <span class="input-label">حداکثر:</span>
                          <div class="d-flex align-items-center justify-content-between price-input">
                            <Field
                                class="input"
                                id="price"
                                autocomplete=off
                                name="price"
                                type="text"
                                v-model="maxPrice"
                            />
                            <span>تومان</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-column mb-4">
                    <label class="filter-form-label text-right">محدوده تاریخ:</label>
                    <div class="row">
                      <div class="col-1 align-self-center">
                        <button @click="deleteDateFilter" type="button" class="btn btn-danger text-nowrap">حذف فیلتر</button>
                      </div>
                      <div class="col-5">
                        <div class="d-flex align-items-center">
                          <span class="input-label text-nowrap"> تاریخ شروع:</span>
                          <div class="d-flex align-items-center justify-content-between price-input">
                            <date-picker auto-submit="true" v-model="minDate" />
                          </div>
                        </div>
                      </div>
                      <div class="col-5">
                        <div class="d-flex align-items-center">
                          <span class="input-label text-nowrap">تاریخ پایان:</span>
                          <div class="d-flex align-items-center justify-content-between price-input">
                            <date-picker auto-submit="true" v-model="maxDate" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center form-check">
                    <input class="form-check-input" type="checkbox" v-model="onlyHasImage" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                     فقط عکس دارها
                    </label>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                      type="button"
                      class="btn btn-primary"
                      @click="setFilters"
                  >
                    اعمال فیلتر
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="d-flex flex-column main-box">
        <header class="d-flex justify-content-between align-items-center header">
          <div class="d-flex align-items-center">
            <div class="header-title">آگهی های جالیزان</div>
          </div>
          <div class="d-flex gap-1">
            <div @click="deleteFilters" class="d-flex d-md-none justify-content-center align-items-center adv-add-btn">حذف فیلترها</div>
            <div @click="goAnotherPage('/advertisement-create-category-selection')" class="d-flex justify-content-center align-items-center adv-add-btn">ثبت آگهی</div>
          </div>
        </header>
        <div>
          <div class="advs-list" v-if="products.length > 0">
            <div v-for="product in products" :key="product.id" class="adv-box" @click="goAnotherPage(`/Services/${product.id}`)">
              <div v-if="product.images.length > 0" class="d-flex justify-content-center adv-box-img">
                <img :src="product.images[0].url" class="img-fluid"/>
              </div>
              <div v-else class="adv-box-img"></div>
              <h3 class="adv-box-name">{{product.name}}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <div class="adv-box-location">
                  <span>در</span>
                  <span>{{product.city.name}}</span>
                </div>
                <div class="adv-box-price">
                  <span>{{product.price.toLocaleString()}}</span>
                  <span>تومان</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>آیتمی برای نمایش وجود ندارد</div>

        </div>
        <div v-if="current_page && total && per_page">
          <pagination
              v-model="current_page"
              :records="total"
              :per-page="per_page"
              hideCount="true"
              @paginate="getProducts"
          />
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import { globalMixin } from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";
import VueMultiselect from "vue-multiselect";
import Api from "../common/api";
import {Modal} from "bootstrap";
import _ from "lodash";
import qs from "qs";
import moment from "moment-jalaali";
import getObject from '../common/helper';

export default {
  name: "Services",
  components: { HomeLayout,ProgressPage, VueMultiselect },
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      selectedCategory:{
        id:-1,
        name:'همه'
      },
      userLocation:null,
      states:[],
      allCategories: [],
      selectedState:null,
      submitState: null,
      categories:[],
      selectedCategorySubCategories:[],
      selectedSubCategory:null,
      searchedText:null,
      products:[],
      filterModal: null,
      subCatModal: null,
      selectStateModal:null,
      current_page:null,
      total:null,
      per_page:null,
      minPrice:null,
      maxPrice:null,
      minDate:null,
      maxDate:null,
      onlyHasImage:0,
      showFiltersSwiper:false,
      priceModal:null,
      dateModal:null,
      routerQuery:null,
      filtered: {
        page:''
      },
    };
  },
  watch:{
    selectedCategory(newValue){
      if(newValue.id !== -1 && newValue.children.length > 0){
        this.selectedSubCategory=null
        this.selectedCategorySubCategories=this.categories.find(item=>item.id===newValue.id).children
      }
      else if (newValue.id === -1 || newValue.children.length === 0){
        this.selectedCategorySubCategories=[]
        this.selectedSubCategory=null
      }
    },
    selectedSubCategory(newValue){
      if(newValue !== null){
        this.filtered.category_id=newValue.id
        if(this.subCatModal !== null) this.subCatModal.hide()
        this.getProducts();
      }
    },
    searchedText(newValue){
      if(newValue == ""){
        this.filtered.search=null
        this.getProducts()
      }
    }
  },
  computed:{

  },
  methods: {
    ...getObject,
    getStates() {
      let self = this;
      Api.getStates({self: this})
          .then((response) => {
            if (response.status === 200) {
              self.states = response.data.data;
              self.states.unshift({id:0,name:'همه'})
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getCategories() {
        let self = this;
        let categories = [];
        let children = [];
      Api.getCategoriesApi({self: this})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data
              categories = data ;
              data.map(item => {if(item.children.length > 0) children.concat(item.children)});
              self.allCategories = categories.concat(children);
              console.log(self.allCategories)

              
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });

    },
    showSelectStateModal(){
      this.selectStateModal = new Modal(
          document.getElementById("selectStateModal"),
          {}
      );
      this.selectStateModal.show();
    },
    getProducts(page = this.current_page){
      this.loading = true;
      let self = this;
      if (!_.isEmpty(this.routerQuery)) {
        this.filtered = {...this.filtered,...this.routerQuery}
      }
      this.filtered.page = page;
      let filteredClone = _.clone(this.filtered);
      if (filteredClone.page === 1) delete filteredClone.page;
      filteredClone = _.pickBy(filteredClone, _.identity);
      let urlQuery = !_.isEmpty(filteredClone)
          ? `?${qs.stringify(filteredClone)}`
          : "";
      Api.getProductsApi({self: this, page: urlQuery})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.products = data.products.data;
              this.categories=data.categories
              this.current_page = data.products.pagination.current_page;
              this.total = data.products.pagination.total;
              this.per_page = data.products.pagination.per_page;
              this.submitState = this.routerQuery['state_id'] !== undefined && data.products.data.length >0 
              ? data.products.data[0].state : self.getObject(self.states,self.routerQuery['state_id'])
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
      this.$router.push({path:'/Services',query: filteredClone}).catch(() => {});
    },
    getCategory(id){
      let self = this;
      Api.getCategoryApi({ self: this,id:id })
          .then((response) => {
            if (response.status === 200) {
              let data = response.data.children;
              this.selectedCategorySubCategories=data;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    showFilterModal(){
      this.filterModal = new Modal(
          document.getElementById("filterModal"),
          {}
      );
      this.filterModal.show();
    },
    showSubCatModal(){
      this.subCatModal = new Modal(
          document.getElementById("subCatModal"),
          {}
      );
      this.subCatModal.show();
    },
    priceModalShow(){
      this.priceModal = new Modal(
          document.getElementById("priceModal"),
          {}
      );
      this.priceModal.show();
    },
    dateModalShow(){
      this.dateModal = new Modal(
          document.getElementById("dateModal"),
          {}
      );
      this.dateModal.show();
    },
    searchData(){
     this.filtered.search=this.searchedText
      this.getProducts()
    },
    setFilters(){
      this.filtered.only_has_image=this.onlyHasImage === true ? 1 : 0
      this.filtered.min_price=this.minPrice
      this.filtered.max_price=this.maxPrice
      this.filtered.min_date=this.minDate ? moment(this.minDate, "jYYYY/jM/jD").format("YYYY-MM-DD") : null
      this.filtered.max_date=this.maxDate ? moment(this.maxDate, "jYYYY/jM/jD").format("YYYY-MM-DD") : null
      this.filterModal.hide();
      this.getProducts()
    },
    setPriceFilter(){
      this.filtered.min_price=this.minPrice
      this.filtered.max_price=this.maxPrice
      this.priceModal.hide();
      this.getProducts();
    },
    setDateFilter(){
      this.filtered.min_date=this.minDate ? moment(this.minDate, "jYYYY/jM/jD").format("YYYY-MM-DD") : null
      this.filtered.max_date=this.maxDate ? moment(this.maxDate, "jYYYY/jM/jD").format("YYYY-MM-DD") : null
      this.dateModal.hide();
      this.getProducts();
    },
    deleteFilters(){
      this.selectedCategory={
        id:-1,
        name:'همه'
      }
      for (const prop of Object.getOwnPropertyNames(this.routerQuery)) {
        delete this.routerQuery[prop];
      }
      for (const prop of Object.getOwnPropertyNames(this.filtered)) {
        delete this.filtered[prop];
      }
      this.current_page=1
      this.selectedSubCategory=null
      this.showFiltersSwiper=false,
      this.$router.push({path:'/Services',query: {}}).catch(() => {});
      // window.location='/Services'
      this.getProducts()

    },
    categoryBoxClicked(cat){
      let windowWidth=window.innerWidth
      if(windowWidth < 767){
        this.selectedCategory=cat
        this.showSubCatModal()
      }else{
        this.selectedCategory=cat
        this.filtered.category_id=cat.id
        this.getProducts()
      }
    },
    subCatClicked(cat){
      this.selectedSubCategory=cat;
      let windowWidth=window.innerWidth
      if(windowWidth < 767){
        this.showFiltersSwiper=true
      }

    },
    deletePriceFilter(){
      delete this.filtered.min_price
      delete this.filtered.max_price
      delete this.routerQuery.min_price
      delete this.routerQuery.max_price
      this.maxPrice=null
      this.minPrice=null
      this.priceModal && this.priceModal.hide()
      this.filterModal && this.filterModal.hide()
      this.filterItemNums()
      this.getProducts()
    },
    filterItemNums(){
      let num=0
      if(this.minDate || this.maxDate) num ++
      if(this.minPrice || this.maxPrice) num ++
      if(this.onlyHasImage) num ++
      return num
    },
    deleteDateFilter(){
      delete this.filtered.min_date
      delete this.filtered.max_date
      delete this.routerQuery.min_date
      delete this.routerQuery.max_date
      this.maxDate=null
      this.minDate=null
      this.dateModal && this.dateModal.hide()
      this.filterModal && this.filterModal.hide()
      this.getProducts()
    },
    setOnlyHasImageFilter(){
      if(this.onlyHasImage == 0){
        this.filtered.only_has_image=1
        this.routerQuery.only_has_image=1
        this.onlyHasImage=1
        this.getProducts();
      }else{
        this.onlyHasImage=0
        delete this.filtered.only_has_image
        delete this.routerQuery.only_has_image
        this.getProducts();
      }
    },
    setStateFilter(event){
    event.preventDefault();
      
      this.filtered.state_id=this.selectedState.id
      this.submitState = this.selectedState;
      this.routerQuery = {state_id: this.selectedState.id}
      this.getProducts()
      this.selectStateModal.hide()
    }
  },
  created() {
    this.current_page = this.$route.query.page ? this.$route.query.page : 1;
    this.routerQuery=this.$route.query
    if(this.$route.query.category_id){
      let windowWidth=window.innerWidth
      if(windowWidth < 767){
        this.showFiltersSwiper=true
      }
      this.getCategory(this.$route.query.category_id)
    }
    if(this.$route.query.only_has_image){
      this.onlyHasImage=this.$route.query.only_has_image
    }
    this.getProducts()
  },
  mounted() {
   let user = JSON.parse(localStorage.getItem('user'))
    this.userLocation=user.city.name
    this.getStates();
    // this.getCategories()
    

  },
};
</script>

<style lang="scss">
@import "src/styles/modules/Services/Services";
</style>
<style>
.multiselect{
  width: 200px !important;
  height: 48px;
}
.multiselect__tags{
  height: 100%;
}
.multiselect__select{
  top: 6px;
}
</style>
