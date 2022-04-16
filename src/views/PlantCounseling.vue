<template>
  <HomeLayout>
    <div class="container" v-if="loading">
      <ProgressPage/>
    </div>
    <div class="container PlantCounseling" v-if="!loading">
      <div class="row">
        <div class="col-12 border-bottom">
          <div class="d-flex">
            <div class="d-md-block d-none me-auto PlantCounselingLink" @click="navigateHome">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
              بازگشت به صفحه خانه
            </div>
            <div class="ms-auto PlantCounselingTitle">
              مزرعه {{ consultList.farm }}
              <span class="PlantCounselingSubTitle">(
                {{ consultList.area }}
              هکتار
              )</span>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="col-12 text-end PlantCounselingListTitle">
            درخواست مشاوره گیاهی
          </div>
        </div>
        <div class="row justify-content-end">
          <div class="col-md-6 col-12 justify-content-end " v-for="item in consultList"
               :key="item.id">
            <div class="d-flex flex-column PlantCounselingListBox">
              <div class="p-2 ">
                <div class="d-flex flex-row justify-content-end">
                  <div class="text-left me-auto">
                    <!--                    <font-awesome-icon color="#4c4d4e" icon="edit" size="x"></font-awesome-icon>-->
                  </div>
                  <div class="text-right PlantCounselingListDescription">{{ item.farmer_description }}</div>
                </div>
              </div>
              <div class="p-2 ">
                <div class="d-flex flex-row-reverse justify-content-between">
                  <div class="text-right">
                    <span class="PlantCounselingText">وضعیت درخواست : </span>
                    {{ item.status.title_fa }}
                  </div>
                  <div class="text-left">
                    <span class="PlantCounselingText">تاریخ درخواست :</span>
                    {{ $filter.moment(item.created_at, "jYYYY/jM/jD") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-md-5 mt-3">
          <button class="btn PlantCounselingNewRequest" @click="navigateHome">
            ثبت درخواست جدید
            <font-awesome-icon
                icon="plus-square"
                size="x"
                color="#fff"
            />
          </button>
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
  name: "PlantCounseling",
  components: {HomeLayout, ProgressPage},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      plant_id: null,
      consultList: []
    };
  },
  methods: {
    navigateHome() {
      this.$router.push({
        name: 'home'
      })
    },
    PlantCounselingData() {
      let self = this;
      Api.getPlantCounselingApi({self: this, id: this.plant_id}).then((response) => {
        if (response.status === 200) {
          let data = response.data.plant.plant_examinations;
          this.loading = false;
          this.consultList = data;
        }
      }).catch((error) => {
        self.handleError(self, error);
      })
    },
  },
  created() {
    this.loading = true;
    this.plant_id = this.$route.query.plant_is;
  },
  mounted() {
    this.PlantCounselingData();
  },
}
</script>

<style lang="scss">
@import "src/styles/modules/PlantCounseling/PlantCounseling";
</style>