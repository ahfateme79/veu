<template>
  <form class="HerbalAdvice">
    <div>
      <div
        class="d-flex flex-column align-items-center"
        v-if="plant && showEmptyHerbalAdvice === true"
      >
        <div class="HerbalAdviceTitle">هیچ درخواستی ثبت نشده است</div>
        <div class="HerbalAdviceSubText">
          شما می توانید با ثبت مشکل خود، از مشاوران ما کمک بگیرید
        </div>
        <div>
          <button
            class="btn HerbalAdviceSubmit"
            @click="goToPlantConsultingPage"
          >
            ثبت درخواست مشاوره گیاه
          </button>
        </div>
      </div>
      <div
        class="d-flex flex-column align-items-center"
        v-if="showSuccessPlantConsulting === true"
      >
        <div class="examination-success-image"></div>
        <div class="examination-empty-title">
          درخواست مشاوره گیاه شما با موفقیت ثبت شد
        </div>
        <div class="examination-empty-description text-center">
          بزودی از جالیزان جهت هماهنگی مراجعه کارشناس با شما تماس گرفته می شود
        </div>
        <div
          class="d-flex align-items-center examination-back"
          @click="goToSoilConsultingReq"
        >
          <font-awesome-icon
            class="me-2"
            icon="chevron-left"
          ></font-awesome-icon>
          <span> ارجاع به صفحه لیست مشاوره</span>
        </div>
      </div>
      <div v-if="plant !== null && showRequestHerbalAdvice === true">
        <div class="border-bottom">
          <div class="d-flex">
            <div v-if="!editMode" class="ms-auto HerbalAdviceTitle">
              درخواست مشاوره گیاهی
            </div>
            <div v-else class="ms-auto HerbalAdviceTitle">
              درخواست ویرایش مشاوره گیاهی
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex flex-column text-end">
            <div class="HerbalAdviceText">
              توضیحات
              <span class="HerbalAdviceSubText"> (مشکل را توضیح دهید) </span>
            </div>
            <div class="">
              <textarea
                dir="rtl"
                class="w-100 HerbalAdvice-textarea"
                v-model.trim="description"
              />
            </div>
            <div class="HerbalAdviceText">
              ثبت عکس گیاه
              <span class="HerbalAdviceSubText">
                (تصویر گیاه خود را بارگذاری کنید)
              </span>
            </div>
            <div
              class="mt-2 d-flex justify-content-end align-items-start gap-2"
            >
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
                  <div :id="url" class="d-flex flex-column">
                    <div class="preview">
                      <img
                        style="object-fit: cover"
                        class="w-100 h-100"
                        :src="img.url"
                      />
                    </div>
                    <span
                      @click="deleteImgOnSelectTime(img)"
                      class="img-delete-btn d-flex justify-content-center"
                      >حذف</span
                    >
                  </div>
                </div>
              </div>
              <!--            <div class="d-flex gap-2 flex-wrap" v-if="deleteableImages.length>0 && editMode">-->
              <!--              <div v-for="image in deleteableImages" :key="image.id">-->
              <!--                <div class="d-flex flex-column">-->
              <!--                  <div class="preview">-->
              <!--                    <img class="img-fluid" :src="image.url"/>-->
              <!--                  </div>-->
              <!--                  <span @click="deleteImage(image.id)" class="img-delete-btn d-flex justify-content-center">حذف</span>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--            </div>-->
            </div>
          </div>
        </div>
        <div class="privacy text-end">
          با ورود و یا ثبت نام در جالیزان شما
          <span class="privacy-text" @click="showedPrivacy"
            >شرایط و قوانین</span
          >
          استفاده از آن را می پذیرید
        </div>
        <BaseDialog
          :show="showPrivacy"
          title="شرایط و قوانین استفاده از جالیزان"
          @close="closePrivacy"
        >
          <p class="text-right">{{ $t("message.textPrivacy") }}</p>
        </BaseDialog>
        <div class="text-center">
          <button
            v-if="!loading && !editMode"
            type="button"
            class="btn HerbalAdviceSubmit"
            @click="HerbalAdviceSubmit"
          >
            ثبت و ادامه
          </button>
          <button
            v-if="!loading && editMode"
            type="button"
            class="btn HerbalAdviceSubmit"
            @click="editHerbalAdviceSubmit"
          >
            ویرایش
          </button>
          <Loading v-if="loading" />
        </div>
      </div>
      <div v-if="showPlantConsultingList === true">
        <div class="grid-container" style="direction: rtl">
          <div
            class="justify-content-end"
            v-for="item in consultings"
            :key="item.id"
          >
            <button
              class="d-flex flex-column PlantCounselingListBox"
              @click="navigateSingleConsulting(item)"
            >
              <div class="PlantCounselingListBoxHeader">
                <div
                  v-if="description != null"
                  class="text-right PlantCounselingListDescription"
                >
                  {{ shortener(item.user_description, 100) }}
                </div>
              </div>
              <div class="d-flex flex-row-reverse justify-content-between">
                <div class="text-right">
                  <span class="PlantCounselingText">وضعیت درخواست : </span>
                  <span class="PlantCounselingvalue">
                    {{ item.status.title_fa }}</span
                  >
                </div>
                <div class="text-left">
                  <span class="PlantCounselingText">تاریخ درخواست :</span>
                  <span class="PlantCounselingvalue">
                    {{ $filter.moment(item.created_at, "jYYYY/jM/jD") }}</span
                  >
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="col-12 text-center mt-md-5 mt-3">
          <button class="btn PlantCounselingNewRequest" @click="makeNewReq">
            ثبت درخواست جدید
            <font-awesome-icon icon="plus-square" size="x" color="#fff" />
          </button>
        </div>
      </div>
      <div class="text-center" v-if="!plant">گیاهی انتخاب نشده</div>
    </div>
  </form>
</template>

<script>
import BaseDialog from "../UI/BaseDialog";
import { globalMixin } from "../../mixins/globalMixin";
import Api from "../../common/api";

export default {
  name: "HerbalAdvice",
  components: { BaseDialog },
  props: {
    plant: {
      type: Object,
    },
    service: {
      type: Object,
    },
  },
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      description: "",
      showPrivacy: false,
      showEmptyHerbalAdvice: false,
      showRequestHerbalAdvice: false,
      showSuccessPlantConsulting: false,
      showPlantConsultingList: false,
      editMode: false,
      images: [],
      imageToDelete: null,
      urls: [],
      selected_consulting: null,
      filesSelected: 0,
      consultings: [],
      deleteableImages: [],
    };
  },
  watch: {
    plant() {
      this.onChangePlant();
    },
  },
  mounted() {
    this.onChangePlant();
  },
  methods: {
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
    closePrivacy() {
      this.showPrivacy = false;
    },
    showedPrivacy() {
      this.showPrivacy = true;
    },
    deleteImgOnSelectTime(img) {
      this.images = this.images.filter((item) => item !== img);
    },
    goToPlantConsultingPage() {
      this.showRequestHerbalAdvice = true;
      this.showEmptyHerbalAdvice = false;
    },
    HerbalAdviceSubmit() {
      let formData = new FormData();
      this.images.map((item) => {
        formData.append("images[]", item.file);
      });
      formData.append("plant_id", this.plant.id);
      formData.append("type", this.plant.service_type);
      formData.append("description", this.description);
      this.loading = true;
      Api.submitHerbalAdvice({
        formData,
        self: this,
      })
        .then((response) => {
          if (response.status === 201) {
            this.loading = false;
            this.toastReturnTxt(response);
            this.description = "";
            this.images = [];
            this.showSuccessPlantConsulting = true;
            this.showRequestHerbalAdvice = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.toastReturnTxt(error.response);
        });
    },
    editHerbalAdviceSubmit() {
      let formData = new FormData();
      this.images.map((item) => {
        formData.append("images[]", item);
      });
      formData.append("plant_id", this.plant.id);
      formData.append("type", this.plant.service_type);
      formData.append("description", this.description);
      formData.append("_method", "PATCH");
      this.loading = true;
      Api.submitEditHerbalAdvice({
        formData,
        self: this,
      })
        .then((response) => {
          if (response.status === 200) {
            this.loading = false;
            this.showSuccessPlantConsulting = true;
            this.showRequestHerbalAdvice = false;
            this.description = "";
            this.images = [];
            this.toastReturnTxt(response);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.toastReturnTxt(error.response);
        });
    },
    navigatePlantCounseling() {
      this.$router.push(`/show-plant-consulting/${this.plant.id}`);
    },
    makeNewReq() {
      this.showPlantConsultingList = false;
      this.showRequestHerbalAdvice = true;
    },
    goToSoilConsultingReq() {
      this.loading = true;
      let reqUrl;
      if (this.plant.service_type === "farm") {
        reqUrl = "plants";
      } else if (this.plant.service_type === "garden") {
        reqUrl = "garden-blocks";
      } else if (this.plant.service_type === "greenhouse") {
        reqUrl = "greenhouses/plants";
      } else if (this.plant.service_type === "apartment") {
        reqUrl = "house-plants";
      }
      Api.getPlantCounselingApi({
        id: this.plant.id,
        self: this,
        reqUrl,
      })
        .then((response) => {
          if (response.status === 200) {
            this.loading = false;
            if (this.plant.service_type === "farm")
              this.consultings = response.data.plant.consultings;
            else this.consultings = response.data.consultings;
            this.showSuccessPlantConsulting = false;
            this.showPlantConsultingList = true;
          }
        })
        .catch((error) => {
          this.loading = false;
          self.handleError(error, self);
        });
    },
    editPlantConsulting(item) {
      this.selected_consulting = item;
      this.showPlantConsultingList = false;
      this.showRequestHerbalAdvice = true;
      this.description = item.description;
      this.deleteableImages = item.images;
      this.editMode = true;
    },
    onChangePlant() {
      if (
        this.plant != null &&
        (this.plant.consultings === null || this.plant.consultings.length === 0)
      ) {
        this.showEmptyHerbalAdvice = true;
        this.showPlantConsultingList = false;
      } else if (
        this.plant &&
        this.plant.consultings &&
        this.plant.consultings.length > 0
      ) {
        this.consultings = this.plant.consultings;
        this.showPlantConsultingList = true;
        this.showEmptyHerbalAdvice = false;
      }
    },
    deleteImage(id) {
      Api.DeleteMyAdvertisementImgApi({ self: this, id: id })
        .then((response) => {
          if (response.status === 200) {
            this.toastReturnTxt(response);
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
        });
    },
    navigateSingleConsulting(item) {
      event.preventDefault();
      this.$router.push(`/show-consulting/${item.id}`);
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/HerbalAdvice";
@import "src/styles/modules/PlantCounseling/PlantCounseling";
</style>