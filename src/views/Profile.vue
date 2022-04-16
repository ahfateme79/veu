<template>
  <HomeLayout>
    <div v-if="loading">
      <ProgressPage/>
    </div>
    <div v-if="!loading">
      <div class="Profile margin-at-mobile">
        <div>
          <div class=" border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-md-block d-none pointer ProfileLink" @click="backToHome">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
                بازگشت به صفحه خانه
              </div>
              <div class="ms-auto ProfileTitle">
                پروفایل
              </div>
            </div>
          </div>
          <div>
            <form v-if="user" dir="rtl">
              <div
                  class="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start edit-profile">
                <div class="ProfileAvatar d-flex justify-content-center align-items-center">
                  <img class="w-100 h-100" style="border-radius: 8px;object-fit: cover" v-if="url" :src="url"/>
                  <img style="border-radius: 8px; padding: 8px" class=" img-fluid" v-else src="../assets/avatar.png"/>
                </div>
                <div>
                  <div class="d-flex flex-row-reverse align-items-center pointer" @click="callInputMethod">
                    <div class="d-inline-block EditProfileText">تغییر عکس پروفایل</div>
                    <div class="d-inline-block IconEdit"></div>
                    <div class="">
                      <input name="avatar" ref="fileInput" type="file"
                             accept="image/png, image/jpeg , image/jpg, image/gif"
                             class="d-none upload-image" @change="changePicture"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <label class="profile-label-input d-block" for="name">نام</label>
                  <input name="name" v-model="user.name" class="profile-form-text-input" id="name"
                         type="text"/>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <label class="profile-label-input d-block" for="nationalCode">کد ملی</label>
                  <input name="national_code" v-model="user.national_code" class="profile-form-text-input"
                         id="nationalCode" type="text"/>
                </div>
                <div class="col-12 col-md-6">
                  <label class="d-block profile-label-input" for="phoneNumber">شماره تلفن همراه</label>
                  <input disabled name="cellphone" v-model="user.cellphone" class="profile-form-text-input"
                         id="phoneNumber"
                         type="tel"/>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <label class="profile-label-input d-block">استان</label>
                  <VueMultiselect
                      class="text-end"
                      v-model="user.state"
                      :options="states"
                      placeholder="انتخاب کنید"
                      track-by="name"
                      label="name"
                      dir="rtl"
                      :preserve-search="true"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :show-labels="false"
                      :allow-empty="false"
                      @select="user.city=null"
                  ></VueMultiselect>
                </div>
                <div class="col-12 col-md-6">
                  <label class=" profile-label-input d-block">شهر</label>
                  <VueMultiselect
                      id="city"
                      class="text-end "
                      v-model="user.city"
                      :options="cities"
                      placeholder="انتخاب کنید"
                      track-by="name"
                      label="name"
                      dir="rtl"
                      :preserve-search="true"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :show-labels="false"
                      :allow-empty="false"
                  ></VueMultiselect>
                </div>
              </div>
              <div>
                <div class="d-flex justify-content-center">
                  <button v-if="!loading2" @click="editProfile" type="button" class="btn text-white profile-submit-button">
                    ثبت اطلاعات
                  </button>
                  <Loading v-if="loading2"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import Api from "../common/api";
import {globalMixin} from "../mixins/globalMixin";
import {loginValidation} from "../mixins/loginValidation";
import VueMultiselect from "vue-multiselect";
import ProgressPage from "../components/UI/ProgressPage.vue";
import _ from 'lodash'

export default {
  name: "Profile",
  components: {HomeLayout, VueMultiselect, ProgressPage},
  mixins: [globalMixin, loginValidation],
  inject: ["$axios"],
  data() {
    return {
      user: null,
      city: null,
      cities: [],
      states: [],
      avatar: null,
      url: null
    };
  },
  created() {
    this.getStates();
    this.loading = true;
  },
  mounted() {
    this.getUserProfile();
  },
  computed: {
    state() {
      return this.user !== null ? this.user.state : null
    },
  },
  watch: {
    state(value) {
      Api.getCitiesApi({self: this, state_id: value.id})
          .then((response) => {
            if (response.status === 200) {
              this.cities = response.data.data;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
  },
  methods: {
    getUserProfile() {
      let self = this;
      Api.getUserProfileApi({self: this})
          .then((response) => {
            if (response.status === 200) {
              this.user = response.data;
              this.url = response.data.avatar
              this.loading = false;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    editProfile() {
      this.loading2=true
      this.user = _.pickBy(this.user, _.identity);
      let formData = new FormData();
      if (this.user.state) formData.append("state_id", this.user.state.id);
      if (this.user.city) formData.append("city_id", this.user.city.id);
      if (this.user.name) formData.append("name", this.user.name);
      if (this.user.cellphone) formData.append("cellphone", this.user.cellphone);
      if (this.user.national_code) formData.append("national_code", this.user.national_code);
      formData.append("_method", 'patch')
      if (this.avatar) formData.append("avatar", this.avatar);

      Api.editProfileApi({self: this, user: formData})
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem('user', JSON.stringify(response.data.user))
              localStorage.setItem('userName', response.data.user.name);
              localStorage.setItem('userAvatar', response.data.user.avatar !== null? response.data.user.avatar : '')
              this.toastReturnTxt(response)
              this.goAnotherPage('/home')
              this.loading2=false
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response)
            this.loading2=false
          });
    },
    getCities(value) {
      let self = this;
      Api.getCitiesApi({
        state_id: value.id,
        self: this,
      })
          .then((response) => {
            if (response.status === 200) {
              self.cities = response.data.data;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getStates() {
      let self = this;
      Api.getStates({self: this})
          .then((response) => {
            if (response.status === 200) {
              this.states = response.data.data;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    callInputMethod() {
      document.querySelector('.upload-image').click();
    },
    changePicture(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      const file = e.target.files[0];
      this.url = URL.createObjectURL(file)
      this.avatar = file;
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/modules/Profile/Profile";
</style>
<style>
.multiselect{
  width: 100%;
}
.multiselect__tags {
  background-color: #F5F6F8;
}

.multiselect__input, .multiselect__single {
  background-color: unset;
}

@media (max-width: 767px) {
  .multiselect {
    margin-bottom: 14px;
  }
}
</style>