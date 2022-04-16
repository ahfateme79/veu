<template>
  <HomeLayout>
    <template v-if="loading">
      <ProgressPage/>
    </template>
    <template v-else>
      <div class="Subscription">
        <div class="d-flex flex-column align-items-center" v-if="plan.plan === null">
          <p class="SubscriptionTitle">
            شما در حال حاضر هیچ اشتراکی ندارید
          </p>
          <p class="SubscriptionText m-0">
            لطفا برای استفاده از ویژگی های جالیزان استراک خریداری نمایید
          </p>
        </div>
        <div class="d-flex flex-column align-items-end" v-else>
          <div v-for="item in plan" :key="item.id">
            <p class="SubscriptionOption">
              اشتراک
              {{ item.invoice_period }}
              {{ item.name }}
              تا تاریخ
              {{ item.trial_period }}
              برای شما فعال است
            </p>
          </div>
        </div>
      </div>
      <div class="SubscriptionList">
        <div class="border-bottom">
          <p class="SubscriptionText">
            لیست اشتراک ها
          </p>
        </div>
        <div class="grid">
          <div class="SubscriptionOptions" v-for="item in plans" :key="item.id">
            <div class="d-flex flex-column align-items-center">
              <div class="SubscriptionListTitle">
                <p class="mb-0">
                  {{ item.name }}
                </p>
              </div>
              <div class="SubscriptionListPrice">
                {{ item.price }}
                تومان
              </div>
              <div class="">
                <button class="btn SubscriptionListButton" @click="buyPlans(item.id)">
                  خرید
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import {globalMixin} from "@/mixins/globalMixin";
import Api from "../common/api";
import ProgressPage from "../components/UI/ProgressPage";

export default {
  name: "Subscription",
  components: {ProgressPage, HomeLayout},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      plan: {},
      plans: []
    };
  },
  methods: {
    SubscriptionData() {
      let self = this;
      Api.getSubscriptionApi({self: this}).then((response) => {
        if (response.status === 200) {
          let data = response.data;
          this.loading = false;
          this.plan = data;

        }
      }).catch((error) => {
        self.handleError(self, error);
      })
      Api.getMyPlansListSubscriptionApi({self: this}).then((response) => {
        if (response.status === 200) {
          let data = response.data;
          this.loading = false;
          this.plans = data;
        }
      }).catch((error) => {
        self.handleError(self, error);
      })
    },
    buyPlans(planId) {
      let self = this;
      Api.getBuySubscriptionApi({self: this, id: planId}).then((response) => {
        if (response.status === 200) {
          alert('aaaa')
        }
      }).catch((error) => {
        self.handleError(self, error);
      })
    }
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.SubscriptionData();
  }
}
</script>

<style lang="scss">
@import "src/styles/modules/Subscription/Subscription";
</style>