<template>
  <HomeLayout :withoutSideBar="true">
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div class="avd-create" v-if="!loading && !submitSuccess">
      <div class="adv-create-form">
        <header class="d-flex align-items-center header">
          <span>ثبت آگهی</span>
        </header>
        <Form @submit="onSubmit" :validation-schema="schema">
          <div class="row">
            <div class="main-category d-flex justify-content-between align-items-center col-12 mb-3">
              <div v-if="category">
                <span class="light-text">دسته بندی:</span>
                <span v-if="!editMode" class="black-text">{{category.name}}</span>
                <span v-else class="black-text">{{category.parent.name}}</span>
              </div>
              <div v-if="!editMode" @click="goAnotherPage('/advertisement-create-category-selection')" class="pointer">
                <span class="green-text">تغییر دسته بندی</span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(10) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.083 3.542)">
      <path id="Stroke_1" data-name="Stroke 1" d="M5.833,0,2.917,2.917,0,0" fill="none" stroke="#7fd2bc" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    </g>
  </g>
</svg>
                </span>
              </div>
            </div>
            <div v-if="!editMode && category && category.children.length >0" class="col-12 mb-3">
              <label class="label-add-plant-input" for="crop">انتخاب زیر دسته</label>
              <Field v-model="selectedSubcategory" name="selectedSubcategory" v-slot="{ field }">
              <VueMultiselect
                  v-bind="field"
                  class="text-end"
                  v-model="selectedSubcategory"
                  :options="category.children"
                  placeholder="انتخاب کنید"
                  track-by="name"
                  label="name"
                  dir="rtl"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :show-labels="false"
                  :allow-empty="false"
              >
              </VueMultiselect>
              </Field>
              <ErrorMessage class="text-danger fw-bold" name="selectedSubcategory"/>
            </div>
            <div v-if="editMode && category && category.parent.children && category.parent.children.length >0" class="col-12 mb-3">
              <label class="label-add-plant-input" for="crop">انتخاب زیر دسته</label>
              <Field  v-model="selectedSubcategory" name="selectedSubcategory" v-slot="{ field }">
              <VueMultiselect
                  class="text-end"
                  v-bind="field"
                  v-model="selectedSubcategory"
                  :options="category.parent.children"
                  placeholder="انتخاب کنید"
                  track-by="name"
                  label="name"
                  dir="rtl"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :show-labels="false"
                  :allow-empty="false"
              >
              </VueMultiselect>
              </Field>
              <ErrorMessage class="text-danger fw-bold" name="selectedSubcategory"/>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label class="label-add-plant-input" for="crop">استان</label>
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
                  @select="city=null"
              >
              </VueMultiselect>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label class="label-add-plant-input" for="crop">شهر</label>
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
                  @open="this.getCities"
              >
              </VueMultiselect>
            </div>
            <div class="col-12 mb-3">
              <div class="d-flex flex-column">
                <div class="HerbalAdviceText">
                  ثبت عکس آگهی
                  <span class="HerbalAdviceSubText ">
                   (برای بازدید بیشتر عکس آگهی خود را بارگذاری کنید)
                </span>
                </div>
                <div class="d-flex align-items-start gap-2">
                  <div>
                    <input @change="onFileChange" class="HerbalAdviceImageInput d-none" type="file"
                           id="imageFile" multiple="multiple"
                           accept="image/png, image/jpeg , image/jpg, image/gif" ref="fileInput"
                    >
                  </div>
                  <div class="d-flex flex-column justify-content-center align-items-center iconAddPic flex-shrink-0"
                       @click="callInputMethod">
               <span>
                 <svg id="Iconly_Bold_Camera" data-name="Iconly/Bold/Camera" xmlns="http://www.w3.org/2000/svg"
                      width="32" height="32" viewBox="0 0 32 32">
  <g id="Camera" transform="translate(2.667 4)">
    <path id="Camera-2" data-name="Camera"
          d="M20.854,24H5.813A5.816,5.816,0,0,1,0,18.193V10.282A5.816,5.816,0,0,1,5.813,4.475a.264.264,0,0,0,.254-.16l.079-.16.111-.233c.348-.734.742-1.564.982-2.044A3.244,3.244,0,0,1,10.187,0h6.28a3.254,3.254,0,0,1,2.96,1.878c.21.419.528,1.093.837,1.744l.189.4.134.293a.3.3,0,0,0,.266.16,5.816,5.816,0,0,1,5.813,5.807v7.912A5.816,5.816,0,0,1,20.854,24ZM13.333,8.537a5.229,5.229,0,0,0-3.72,1.546,5.156,5.156,0,0,0-1.52,3.689,5.232,5.232,0,0,0,5.24,5.234,5.194,5.194,0,0,0,3.694-1.531,5.221,5.221,0,0,0,.013-7.405A5.206,5.206,0,0,0,13.333,8.537Zm7.48-.319A1.205,1.205,0,1,0,22.027,9.43,1.207,1.207,0,0,0,20.813,8.218Zm-7.48,8.79a3.231,3.231,0,0,1-3.24-3.236v-.013a3.116,3.116,0,0,1,.934-2.264,3.24,3.24,0,1,1,2.306,5.514Z"
          fill="#bfc0c2"/>
  </g>
</svg>
               </span>
                    <div class="iconAddPicText">افزودن عکس</div>
                  </div>
                  <div class="d-flex flex-column">
                    <div class="d-flex gap-2 flex-wrap mb-2" v-if="images && images.length>0" id="preview">
                      <div v-for="img in images" :key="img">
                        <div class="d-flex flex-column">
                          <div class="preview">
                            <img style="object-fit: cover" class="w-100 h-100" :src="img.url"/>
                          </div>
                          <span @click="deleteImgOnSelectTime(img)" class="img-delete-btn d-flex justify-content-center">حذف</span>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex gap-2 flex-wrap" v-if="deleteAbleImages && deleteAbleImages.length>0 && editMode">
                      <div v-for="image in deleteAbleImages" :key="image.id">
                        <div class="d-flex flex-column position-relative">
                          <img class="preview" :src="image.url"/>
                          <span @click="deleteImage(image.id)" class="img-delete-btn d-flex justify-content-center">حذف</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-12 mb-3 d-flex flex-column">
              <label class="label-add-plant-input" :for="phone">شماره موبایل</label>
              <Field
                  class="add-farm-input"
                  name="phone"
                  type="text"
                  v-model="phone"
              />
              <ErrorMessage class="text-danger fw-bold" name="phone"/>
            </div>
            <div class="col-12 mb-3 d-flex flex-column">
              <label class="label-add-plant-input" :for="price">قیمت</label>
              <div class="d-flex justify-content-between add-farm-input price">
                <Field
                    class="input"
                    id="price"
                    name="price"
                    type="text"
                    v-model="price"
                />
                <span>تومان</span>
              </div>
              <ErrorMessage class="text-danger fw-bold" name="price"/>
            </div>
            <div class="col-12 mb-3 d-flex flex-column">
              <label class="label-add-plant-input" :for="name">عنوان آگهی</label>
              <Field
                  class="add-farm-input"
                  name="name"
                  type="text"
                  v-model="name"
              />
              <ErrorMessage class="text-danger fw-bold" name="name"/>
            </div>
            <div class="col-12 mb-3 d-flex flex-column">
              <label class="label-add-plant-input" :for="description">توضیحات آگهی</label>
              <Field
                  name="description"
                  v-slot="{ field }"
                  v-model.trim="description"
              >
              <textarea
                  v-bind="field"
                  dir="rtl"
                  class="w-100 HerbalAdvice-textarea"
                  v-model.trim="description"
              />
              </Field>
              <ErrorMessage class="text-danger fw-bold" name="description"/>
            </div>
            <div class="d-flex justify-content-center">
              <button v-if="!loading2 && !editMode"  type="submit" class="btn submit-btn">
                ثبت آگهی
              </button>
              <button v-if="!loading2 && editMode"  type="submit" class="btn submit-btn">
               ویرایش
              </button>
              <Loading v-if="loading2" />
            </div>
          </div>
        </Form>
      </div>
    </div>
    <div v-if="submitSuccess" class="d-flex flex-column align-items-center  success-box" >
         <div>آگهی شما با موفقیت انجام شد</div>
      <div class="success-img">
        <img class="img-fluid" src="../assets/icon/success-2.png"/>
      </div>
      <div class="d-flex" @click="goAnotherPage('/my-advertisements')">
        <div class="pointer">
          <span class="green-text ms-2">مشاهده آگهی های من</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(12) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.5 4.25)">
      <path id="Stroke_1" data-name="Stroke 1" d="M7,0,3.5,3.5,0,0" fill="none" stroke="#7fd2bc" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    </g>
  </g>
</svg>
          </span>
        </div>
        <div class="pointer" @click="goAnotherPage('/Services')">
          <span class="gray-text ms-2">بازگشت به خدمات</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(12) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.5 4.25)">
      <path id="Stroke_1" data-name="Stroke 1" d="M7,0,3.5,3.5,0,0" fill="none" stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    </g>
  </g>
</svg>
          </span>
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
import VueMultiselect from "vue-multiselect";
import * as yup from "yup";
export default {
  name: "AdvCreate",
  components: { ProgressPage, HomeLayout, VueMultiselect },
  mixins: [globalMixin],
  inject: ["$axios"],
  data(){
    return{
      category:null,
      selectedSubcategory:null,
      state: null,
      city: null,
      cities: [],
      states: [],
      images: [],
      urls: [],
      phone:null,
      price:null,
      name:null,
      description:null,
      submitSuccess:false,
      product:null,
      editMode:false,
      deleteAbleImages: [],
      schema: yup.object({
        selectedSubcategory:yup.object().required().typeError( 'پر کردن فیلد الزامی است'),
        phone: yup.number().required().typeError('مقدار باید عدد باشد'),
        price: yup.number().required().integer().positive().typeError('مقدار باید عدد باشد'),
        description: yup.string().required().typeError('مقدار باید متشکل از حروف باشد'),
        name: yup.string().required().typeError('مقدار باید متشکل از حروف باشد'),
      }),
    }
  },
  props:['selectedCategoryId','id'],
  watch: {
    state(newValue) {
      this.getCities(newValue);
    }
  },
  methods:{
    onSubmit() {
      this.editMode ? this.editProduct() : this.advCreateSubmit()
    },
    getCategory(){
      let self = this;
      this.loading=true
      Api.getCategoryApi({ self: this, id:this.selectedCategoryId })
          .then((response) => {
            if (response.status === 200) {
              self.category = response.data;
              this.loading=false
            }
          })
          .catch((error) => {
            self.handleError(self, error);
            this.loading=false
          });
    },
    getStates() {
      let self = this;
      Api.getStates({self: this})
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
        let obj={
          file:e.target.files[i],
          url:URL.createObjectURL(e.target.files[i])
        }
        this.images.push(obj)
      }
    },
    callInputMethod() {
      document.querySelector('.HerbalAdviceImageInput').click();
    },
    deleteImgOnSelectTime(img){
      this.images=this.images.filter(item => item !== img)
    },
    advCreateSubmit(){
      let formData = new FormData();
      this.images.map((item) => {
        formData.append("images[]", item.file)
      })
      if(this.name){
        formData.append("name", this.name)
      }
      if(this.description){
        formData.append("description", this.description)
      }
      if(this.price){
        formData.append("price", this.price)
      }
      if(this.phone){
        formData.append("phone", this.phone)
      }
     if( this.state){
       formData.append("state_id", this.state.id)
     }
      if( this.city){
        formData.append("city_id", this.city.id)
      }
      if( this.selectedSubcategory){
        formData.append("category_id", this.selectedSubcategory.id)
      }
      this.loading2 = true;
      Api.submitAdvCreate({
        formData,
        self: this,
      }).then((response) => {
        if (response.status === 200) {
          this.toastReturnTxt(response)
          this.loading2 = false;
          this.submitSuccess=true
        }
      }).catch((error) => {
        this.toastReturnTxt(error.response);
        this.loading2 = false;
      });
    },
    getProduct(){
      let self = this;
      this.loading=true
      Api.getProductApi({ self: this, id:this.id })
          .then((response) => {
            if (response.status === 200) {
              self.product = response.data.product;
              this.category=response.data.product.category
              this.selectedSubcategory=response.data.product.category.parent.children[0]
              this.city=response.data.product.city
              this.state=response.data.product.state
              this.name=response.data.product.name
              this.phone=response.data.product.phone
              this.price=response.data.product.price
              this.description=response.data.product.description
              this.deleteAbleImages=response.data.product.images
              this.loading=false
            }
          })
          .catch((error) => {
            self.handleError(self, error);
            this.loading=false
          });
    },
    deleteImage(id){
      this.deleteAbleImages=this.deleteAbleImages.filter(item => item.id !== id)
      Api.DeleteMyAdvertisementImgApi({ self: this,id:id })
          .then((response) => {
            if (response.status === 200) {
              this.toastReturnTxt(response);
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
          });
    },
    editProduct(){
      let formData = new FormData();
      this.images.map((item) => {
        formData.append("images[]", item.file)
      })
      formData.append("name", this.name)
      formData.append("description", this.description)
      formData.append("price", this.price)
      formData.append("phone", this.phone)
      formData.append("state_id", this.state.id)
      formData.append("city_id", this.city.id)
      formData.append("category_id", this.category.id)
      formData.append("_method", 'PATCH')
      this.loading2 = true;
      Api.editProductApi({self: this, data: formData, id: this.product.id})
          .then((response) => {
            if (response.status === 200) {
              this.loading2 = false;
              this.toastReturnTxt(response)
              this.backToPrevPage()
            }
          })
          .catch((error) => {
            this.loading2 = false;
            this.toastReturnTxt(error.response);
          });
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('user'))
    this.city = user.city
    this.state = user.state
    let path = this.$route.fullPath;
    let sections = path.split("/");
    let lastSection = sections[(sections.length - 1)];
    if (lastSection === 'edit') {
      this.getProduct()
      this.editMode = true
    }else{
      this.getCategory()
    }
    this.getStates()

  }
}
</script>

<style lang="scss">
@import "../styles/modules/AdvCreate/AdvCreate";
</style>