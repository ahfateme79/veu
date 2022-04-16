<template>
  <HomeLayout>
    <div class="home" v-if="loading">
      <ProgressPage/>
    </div>
    <div class="house-plants-box margin-at-mobile" v-if="!loading">
      <header class="header d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <span @click="backButtonClicked" class="ms-2 pointer">
            <svg
                id="Iconly_Light_Arrow_-_Right"
                data-name="Iconly/Light/Arrow - Right"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <g
                  id="Arrow_-_Right"
                  data-name="Arrow - Right"
                  transform="translate(4.75 17.75) rotate(-90)"
              >
                <path
                    id="Stroke_1"
                    data-name="Stroke 1"
                    d="M0,15V0"
                    transform="translate(6.025)"
                    fill="none"
                    stroke="#919294"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                />
                <path
                    id="Stroke_3"
                    data-name="Stroke 3"
                    d="M12.049,0,6.025,6.05,0,0"
                    transform="translate(0 8.95)"
                    fill="none"
                    stroke="#919294"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                />
              </g>
            </svg>
          </span>
          <span class="txt">افزودن گل های آپارتمانی</span>
        </div>
        <div
            @click="goAnotherPage('/flower-type')"
            class="
            d-none d-md-flex
            justify-content-center
            align-items-center
            unknown-flower
          "
        >
          نوع گل رو نمیدونم
        </div>
      </header>
      <div>
        <div
            class="
            d-flex
            flex-column flex-md-row
            search-bar-section
            align-items-md-center
          "
        >
          <span class="text">انتخاب نوع گل</span>
          <div class="d-flex align-items-center search-bar-wrapper">
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
                placeholder="جستجو گل"
                type="text"
                v-model="searchedText"
            />
          </div>
        </div>
        <div class="minimum-height">
          <div v-if="flowerTypes.length > 0">
            <div class="grid">
              <div
                  @click="goAnotherPage(`/flower-type/${flowerType.id}`)"
                  v-for="flowerType in flowerTypes"
                  :key="flowerType.id"
                  class="d-flex flex-column align-items-center house-plant-box"
              >
                <div class="house-plant-img w-100">
                  <img class="img-fluid" :src="flowerType.image"/>
                </div>
                <span class="house-plant-name">{{ flowerType.name }}</span>
              </div>
            </div>
          </div>
          <div style="fontsize: '14px'" v-else>موردی برای نمایش وجود ندارد</div>
        </div>

        <pagination
            v-model="current_page"
            :records="total"
            :per-page="per_page"
            hideCount="true"
            @paginate="getHousePlantsData"
        />
        <div
            class="d-flex justify-content-between d-md-none stick-bottom-section"
        >
          <div
              class="
              d-flex
              justify-content-center
              align-items-center
              create-flower-type
            "
          >
            ثبت نوع گل
          </div>
          <div
              @click="goAnotherPage('/flower-type')"
              class="
              d-flex
              justify-content-center
              align-items-center
              unknown-flower
            "
          >
            نوع گل رو نمیدونم
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import Api from "../common/api";
import ProgressPage from "../components/UI/ProgressPage";
import {globalMixin} from "../mixins/globalMixin";
import qs from "qs";
import _ from "lodash";

export default {
  name: "FlowerTypes",
  components: {ProgressPage, HomeLayout},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      flowerTypes: [],
      current_page: 1,
      total: 1,
      per_page: 1,
      filtered: {},
      searchedText: null,
      refreshData: false,
    };
  },
  watch:{
    searchedText(newValue){
      if(newValue == ""){
        this.getHousePlantsData()
      }
    }
  },
  mounted() {
    this.current_page = this.$route.query.page ? this.$route.query.page : 1;
    this.getHousePlantsData();
  },
  methods: {
    getHousePlantsData(page = this.current_page) {
      this.loading = true;
      let self = this;
      if (!_.isEmpty(this.$route.query)) {
        if (this.refreshData === true) {
          this.filtered = {};
        } else {
          this.filtered = _.clone(this.$route.query);
        }
      } else {
        this.filtered = {
          page: "",
        };
      }
      this.filtered.page = page;
      let filteredClone = _.clone(this.filtered);
      if (filteredClone.page === 1) delete filteredClone.page;
      filteredClone = _.pickBy(filteredClone, _.identity);
      let urlQuery = !_.isEmpty(filteredClone)
          ? `?${qs.stringify(filteredClone)}`
          : "";
      Api.getFlowerTypesDataApi({self: this, page: urlQuery})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.flowerTypes = data.flowerTypes.data;
              this.page = data.flowerTypes.current_page;
              this.total = data.flowerTypes.total;
              this.per_page = data.flowerTypes.per_page;
              window.scrollTo(0, 0)
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
      this.$router.push({query: filteredClone}).catch(() => {
      });
    },
    searchData() {
      const obj = {};
      if (this.searchedText !== null) obj.q = this.searchedText;
      // this.filtered=obj
      this.filtered.page = this.current_page;
      let filteredClone = _.clone(this.filtered);
      if (filteredClone.page === 1) delete filteredClone.page;
      filteredClone = _.pickBy(filteredClone, _.identity);
      this.loading = true;
      const str = qs.stringify(obj);
      let urlQuery;
      if (this.current_page === 1) {
        urlQuery = `/search?${str}`;
      } else {
        urlQuery = `/search?${str}`;
      }

      Api.getFlowerTypesDataApi({self: this, page: urlQuery})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.flowerTypes = data.flowerTypes.data;
              this.page = data.flowerTypes.current_page;
              this.total = data.flowerTypes.total;
              this.per_page = data.flowerTypes.per_page;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
      this.$router.push({query: filteredClone}).catch(() => {
      });
    },
    backButtonClicked() {
      this.getHousePlantsData();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/FlowerTypes/FlowerTypes";
</style>
<style>
@media (max-width: 767px) {
  .VuePagination {
    margin-bottom: 60px;
    /*border-top: 0.3px solid #bfc0c2 !important;*/
    /*padding-top: 16px !important;*/
  }
}

.pagination {
  padding-left: 0;
  padding-right: 0;
  gap: 12px;
}

.page-link {
  border: unset;
  font-weight: normal;
  font-size: 16px;
  color: #a8a9ab;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-link:hover {
  background-color: unset;
}

.page-link:focus {
  box-shadow: unset;
}

.page-item.active .page-link {
  background-color: #7fd2bc;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-item:first-child .page-link,
.page-item:last-child .page-link {
  display: none;
}

.page-link:nth-last-child(3) {
  border-left: 1px solid #a8a9ab;
}

.page-link:nth-last-child(2),
.page-link:nth-child(2) {
  border: 1px solid #a8a9ab !important;
  border-radius: 3px !important;
}
</style>