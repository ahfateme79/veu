<template>
  <HomeLayout>
    <div class="home" v-if="loading">
      <ProgressPage />
    </div>
    <div class="flower-type-box margin-at-mobile" v-if="!loading">
      <header v-if="flowerType" class="header d-flex">
        <span class="pointer ms-2" @click="backToPrevPage">
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
        <span>{{ flowerType.name }}</span>
      </header>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="age">سن (سال)</label>
            <Field
              class="controlled-input"
              name="age"
              type="text"
              v-model="age"
              autocomplete="off"
            >
            </Field>
            <ErrorMessage class="text-danger fw-bold mt-2" name="age" />
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="height"
              >ارتفاع (سانتی متر)</label
            >
            <Field
              class="controlled-input"
              name="height"
              type="text"
              v-model="height"
              autocomplete="off"
            >
            </Field>
            <ErrorMessage class="text-danger fw-bold mt-2" name="height" />
          </div>
          <div v-if="lightings != null" class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="lighting">نورگیری</label>
             <Field v-model="lighting" name="lighting" v-slot="{ field }">
              <VueMultiselect
                v-bind="field"
                class="text-end"
                v-model="lighting"
                :options="lightings"
                placeholder="انتخاب کنید"
                track-by="id"
                label="name"
                dir="rtl"
                :close-on-select="true"
                :clear-on-select="false"
                :show-labels="false"
                :allow-empty="false"
              >
              </VueMultiselect>
            </Field>
            <ErrorMessage class="text-danger fw-bold" name="lighting" />
          </div>
          <div class="col-md-6 col-12 mb-3"></div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="state">استان</label>
            <VueMultiselect
              class="text-end"
              v-model="state"
              :options="states"
              placeholder="انتخاب کنید"
              track-by="id"
              label="name"
              dir="rtl"
              :close-on-select="true"
              :clear-on-select="false"
              :show-labels="false"
              :allow-empty="false"
              @select="city = null"
            >
            </VueMultiselect>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <label class="controlled-input-label" for="city">شهر</label>
            <VueMultiselect
              class="text-end"
              v-model="city"
              :options="cities"
              placeholder="انتخاب کنید"
              track-by="id"
              label="name"
              dir="rtl"
              :close-on-select="true"
              :clear-on-select="false"
              :show-labels="false"
              :allow-empty="false"
            >
            </VueMultiselect>
          </div>
          <div class="col-12 mb-3">
            <div>
              <span class="add-img-txt">ثبت عکس گل</span>
              <span class="add-img-light-txt">
                (تصویر گیاه خود را بارگذاری کنید)
              </span>
            </div>
            <div class="mt-2 d-flex align-items-start gap-2">
              <div>
                <input
                  @change="onFileChange"
                  class="HerbalAdviceImageInput d-none"
                  type="file"
                  id="imageFile"
                  multiple="multiple"
                  accept="image/png, image/jpeg , image/jpg, image/gif"
                  ref="fileInput"
                />
              </div>
              <div
                class="
                  d-flex
                  flex-column
                  justify-content-center
                  align-items-center
                  iconAddPic
                "
                @click="callInputMethod"
              >
                <span>
                  <svg
                    id="Iconly_Bold_Camera"
                    data-name="Iconly/Bold/Camera"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <g id="Camera" transform="translate(2.667 4)">
                      <path
                        id="Camera-2"
                        data-name="Camera"
                        d="M20.854,24H5.813A5.816,5.816,0,0,1,0,18.193V10.282A5.816,5.816,0,0,1,5.813,4.475a.264.264,0,0,0,.254-.16l.079-.16.111-.233c.348-.734.742-1.564.982-2.044A3.244,3.244,0,0,1,10.187,0h6.28a3.254,3.254,0,0,1,2.96,1.878c.21.419.528,1.093.837,1.744l.189.4.134.293a.3.3,0,0,0,.266.16,5.816,5.816,0,0,1,5.813,5.807v7.912A5.816,5.816,0,0,1,20.854,24ZM13.333,8.537a5.229,5.229,0,0,0-3.72,1.546,5.156,5.156,0,0,0-1.52,3.689,5.232,5.232,0,0,0,5.24,5.234,5.194,5.194,0,0,0,3.694-1.531,5.221,5.221,0,0,0,.013-7.405A5.206,5.206,0,0,0,13.333,8.537Zm7.48-.319A1.205,1.205,0,1,0,22.027,9.43,1.207,1.207,0,0,0,20.813,8.218Zm-7.48,8.79a3.231,3.231,0,0,1-3.24-3.236v-.013a3.116,3.116,0,0,1,.934-2.264,3.24,3.24,0,1,1,2.306,5.514Z"
                        fill="#bfc0c2"
                      />
                    </g>
                  </svg>
                </span>
                <div class="iconAddPicText">افزودن عکس</div>
              </div>
              <div
                class="d-flex gap-2 flex-wrap"
                v-if="images.length > 0"
                id="preview"
              >
                <div v-for="img in images" :key="img">
                  <div class="d-flex flex-column">
                    <div class="preview">
                      <img :src="img.url" />
                    </div>
                    <span
                      @click="deleteImgOnSelectTime(img)"
                      class="img-delete-btn d-flex justify-content-center"
                      >حذف</span
                    >
                  </div>
                </div>
              </div>
              <div
                class="d-flex gap-2 flex-wrap"
                v-if="deleteableImages.length > 0 && editMode"
              >
                <div v-for="image in deleteableImages" :key="image.id">
                  <div class="d-flex flex-column">
                    <div class="preview">
                      <img :src="image.url" />
                    </div>
                    <span
                      @click="deleteImage(image.id)"
                      class="img-delete-btn d-flex justify-content-center"
                      >حذف</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              v-if="!loading2 && !editMode"
              type="submit"
              class="
                d-flex
                justify-content-center
                align-items-center
                border-0
                submit-btn
              "
            >
              <span>ادامه</span>
              <span class="me-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <g
                    id="Iconly_Light_Arrow_-_Down_2"
                    data-name="Iconly/Light/Arrow - Down 2"
                    transform="translate(12) rotate(90)"
                  >
                    <g
                      id="Arrow_-_Down_2"
                      data-name="Arrow - Down 2"
                      transform="translate(2.5 4.25)"
                    >
                      <path
                        id="Stroke_1"
                        data-name="Stroke 1"
                        d="M7,0,3.5,3.5,0,0"
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
            </button>
            <button
              v-if="!loading2 && editMode"
              type="submit"
              class="
                d-flex
                justify-content-center
                align-items-center
                border-0
                submit-btn
              "
            >
              <span>ویرایش</span>
            </button>
            <Loading v-if="loading2" />
          </div>
        </div>
      </Form>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout";
import ProgressPage from "../components/UI/ProgressPage";
import { globalMixin } from "../mixins/globalMixin";
import Api from "../common/api";
import VueMultiselect from "vue-multiselect";
import * as yup from "yup";

export default {
  name: "FlowerType",
  components: { ProgressPage, HomeLayout, VueMultiselect },
  mixins: [globalMixin],
  inject: ["$axios"],
  props: ["flower_id", "id"],
  data() {
    return {
      flowerType: null,
      age: null,
      name: null,
      height: null,
      lighting: null,
      urls: [],
      images: [],
      state: null,
      city: null,
      cities: [],
      states: [],
      userCity: null,
      lightings: null,
      editMode: false,
      deleteableImages: [],
      schema: yup.object({
        age: yup
          .number()
          .required()
          .integer()
          .positive()
          .typeError("مقدار باید عدد باشد"),
        height: yup
          .number()
          .required()
          .positive()
          .typeError("مقدار باید عدد باشد"),
        // lighting: yup.object().required().typeError("پر کردن فیلد الزامی است"),
      }),
    };
  },
  created() {
    this.getStates();
    this.getLightings();
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.city = user.city;
    this.state = user.state;
    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[sections.length - 1];
    if (lastSection === "edit") {
      this.getHousePlant();
      this.editMode = true;
    }
  },
  watch: {
    state(newValue) {
      this.getCities(newValue);
    },
  },
  methods: {
    onSubmit() {
    this.submitFlowerType();
    },
    getStates() {
      let self = this;
      Api.getStates({ self: this })
        .then((response) => {
          if (response.status === 200) {
            self.states = response.data.data;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
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
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      for (let i = 0; i < e.target.files.length; i++) {
        let obj = {
          file: e.target.files[i],
          url: URL.createObjectURL(e.target.files[i]),
        };
        this.images.push(obj);
      }
    },
    callInputMethod() {
      document.querySelector(".HerbalAdviceImageInput").click();
    },
    deleteImgOnSelectTime(img) {
      this.images = this.images.filter((item) => item !== img);
    },
    submitFlowerType() {
      this.loading2 = true;
      let formData = new FormData();
      if (this.images.length > 0) {
        this.images.map((item) => {
          formData.append("images[]", item.file);
        });
      }
      formData.append("state_id", this.state !== null ? this.state.id : null);
      formData.append("city_id", this.city !== null ? this.city.id : null);
      formData.append("age", this.age !== null ? this.age : "");
      formData.append("height", this.height !== null ? this.height : "");
      formData.append(
        "lighting_id",
        this.lighting !== null ? this.lighting.id : ""
      );
      if (this.editMode) {
        formData.append("flower_type_id", this.flowerType !== null ? this.flowerType.id : '');
        formData.append("_method", 'patch');
        Api.editHousePlantApi({ self: this, id: this.id, data: formData })
          .then((response) => {
            if (response.status === 200) {
              this.loading2 = false;
              this.toastReturnTxt(response);
              this.$router.push(
                `/flower-type/${response.data.house_plant.service_id}/information`
              );
            }
          })
          .catch((error) => {
            this.loading2 = false;
            this.toastReturnTxt(error.response);
          });
      } else {
        formData.append("flower_type_id", this.flower_id);
        Api.AddHousePlantApi({ self: this, data: formData })
          .then((response) => {
            if (response.status === 200) {
              this.loading2 = false;
              this.toastReturnTxt(response);
              this.$router.push(
                `/flower-type/${response.data.house_plant.service_id}/information`
              );
            }
          })
          .catch((error) => {
            this.loading2 = false;
            this.toastReturnTxt(error.response);
          });
      }
    },
    getLightings() {
      let self = this;
      Api.getLightings({ self: this })
        .then((response) => {
          if (response.status === 200) {
            this.lightings = response.data.lightings;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    getHousePlant() {
      this.loading = true;
      let self = this;
      Api.getHousePlantApi({ self: this, id: this.id })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.loading = false;
            this.age = data.age;
            this.height = data.height;
            this.lighting = data.lighting;
            this.state = data.state;
            this.city = data.city;
            this.deleteableImages = data.images;
            this.flowerType = data.flower_type
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    deleteImage(id) {
      this.deleteableImages = this.deleteableImages.filter(
        (item) => item.id !== id
      );
      Api.deleteHousePlantImgApi({ self: this, id: id })
        .then((response) => {
          if (response.status === 200) {
            this.toastReturnTxt(response);
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
        });
    }
  },
};
</script>

<style lang="scss">
@import "../styles/modules/FlowerType/FlowerType";
</style>
