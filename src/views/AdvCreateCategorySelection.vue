<template>
  <HomeLayout :withoutSideBar="true">
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
      <div v-if="!loading" class="AdvCategorySelection">
        <header class="d-flex align-items-center header">
       <span class="pointer" @click="backToPrevPage">
         <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14.877" viewBox="0 0 17 14.877">
  <g id="Arrow_-_Right" data-name="Arrow - Right" transform="translate(1 13.463) rotate(-90)">
    <path id="Stroke_1" data-name="Stroke 1" d="M0,15V0" transform="translate(6.025)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M12.049,0,6.025,6.05,0,0" transform="translate(0 8.95)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
  </g>
</svg>
       </span>
          <span class="me-3">ثبت آگهی</span>
        </header>
        <div class="d-flex flex-column align-items-center">
          <div>انتخاب دسته آگهی</div>
          <div class="categories">
            <div class="d-flex flex-column align-items-center" v-for="category in categories" :key="category.id">
              <div @click="setSelectedCategory(category)" class="p-2 d-flex justify-content-center align-items-center category">
                <img class="img-fluid" :src="category.icon.url"/>
            </div>
              <div class="text-center mt-2">{{category.name}}</div>
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
import Api from "../common/api";
export default {
  name: "AdvCreateCategorySelection",
  components: { ProgressPage, HomeLayout },
  mixins: [globalMixin],
  inject: ["$axios"],
  data(){
    return{
      categories:[],
    }
  },
  methods:{
    getCategories(){
      let self = this;
      this.loading=true
      Api.getCategoriesApi({ self: this })
          .then((response) => {
            if (response.status === 200) {
              self.categories = response.data;
              this.loading=false
            }
          })
          .catch((error) => {
            self.handleError(self, error);
            this.loading=false
          });
    },
    setSelectedCategory(cat){
      this.goAnotherPage(`/advertisement/${cat.id}/create`)
    },
  },
  mounted() {
    this.getCategories()
  }
}
</script>

<style lang="scss">
@import "../styles/modules/AdvCreateCategorySelection/AdvCreateCategorySelection";
</style>