<template>
  <div class="margin-at-mobile form-background" style="margin-left: 10px;
    margin-top: 5px;">
    <Form>
      <div class="row">
        <div class="col-md-3 col-3 mb-3">
          <label class="label-add-plant-input" for="name">عنوان </label>
          <Field
            id="name"
            class="add-farm-input w-100"
            type="text"
            v-model="name"
            name="name"
          />
          <ErrorMessage
            class="text-danger pt-1 fw-bold text-end"
            name="gardenTitle"
          />
        </div>
        <div class="col-md-3 col-3 mb-3">
          <label class="label-add-plant-input" for="direction">جهت</label>
          <VueMultiselect
            class="select-input"
            v-model="direction"
            :options="directions"
            placeholder="انتخاب کنید"
            track-by="name_en"
            label="name_fa"
            dir="rtl"
            :close-on-select="true"
            :clear-on-select="false"
            :show-labels="false"
            :allow-empty="true"
          ></VueMultiselect>
        </div>
        <div class="col-md-3 col-3 mb-3">
          <label class="label-add-plant-input" for="trees_count"
            >تعداد درختان</label
          >
          <Field
            id="trees_count"
            class="add-farm-input w-100"
            type="text"
            v-model="trees_count"
            name="trees_count"
          />
          <ErrorMessage
            class="text-danger pt-1 fw-bold text-end"
            name="gardenTitle"
          />
        </div>
        <div class="col-md-3 col-3 mb-3">
          <label class="label-add-plant-input" for="prefix"
            >پیشوند درختان</label
          >
          <Field
            id="prefix"
            class="add-farm-input w-100"
            type="text"
            v-model="prefix"
            name="prefix"
          />
          <ErrorMessage
            class="text-danger pt-1 fw-bold text-end"
            name="gardenTitle"
          />
        </div>
      </div>
    </Form>
    <div>
      <div class="d-flex justify-content-center">
        <button class="btn add-plant-button btn-success btn-" @click="submit">ثبت</button>
      </div>
    </div>
  </div>
</template>

<script>
import { globalMixin } from "../../mixins/globalMixin";
import { mapMixin } from "../../mixins/mapMixin";
import VueMultiselect from "vue-multiselect";

export default {
  name: "LineForm",
  inject: ["$axios"],
  mixins: [globalMixin, mapMixin],
  components: { VueMultiselect },
  data() {
    return {
      name: "",
      direction: null,
      trees_count: "",
      prefix: "",
    };
  },
  props: ["serviceId", "id", "directions", "submitLine", "lineData"],
  mounted() {
    if (this.lineData !== null) {
      this.name = this.lineData.name;
      (this.direction = this.lineData.direction),
        (this.trees_count = this.lineData.trees_count),
        (this.prefix = this.lineData.prefix);
    }
  },
  methods: {
    submit() {
      let data = {
        name: this.name,
        direction: this.direction,
        trees_count: this.trees_count,
        prefix: this.prefix,
      };
      this.submitLine(data);
    },
  },
};
</script>

<style lang="scss">
@import "~ol/ol.css";
@import "~ol-geocoder/dist/ol-geocoder.min.css";
@import "../../styles/modules/LandAndPlantRegistration/AddPlant";
@import "../../styles/modules/LandAndPlantRegistration/AddFarm";

</style>