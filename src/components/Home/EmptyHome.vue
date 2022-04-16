<template>
  <div class="margin-at-mobile emptyHome">
    <div class="d-flex flex-column align-items-center">
      <div class="emptyHomeImage">
        <img class="img-fluid" src="../../assets/icon/emptyHome.png">
      </div>
      <div>
      <span class="emptyHomeDescription">
        تاکنون محصولی ثبت نکرده اید، اولین محصول خود را ثبت کنید
      </span>
      </div>
      <div class="d-flex">
        <button class="btn text-white emptyHomeButton" @click="goToServiceSelectionPage">
          <span class="me-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
  <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(12) rotate(90)">
    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2" transform="translate(2.5 4.25)">
      <path id="Stroke_1" data-name="Stroke 1" d="M7,0,3.5,3.5,0,0" fill="none" stroke="#fff" stroke-linecap="round"
            stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    </g>
  </g>
</svg>
          </span>
          ثبت محصول
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyHome",
  methods: {
    goToServiceSelectionPage() {
      this.$router.push({name: 'ServiceSelection'})
    }
  }

}
</script>

<style lang="scss">
@import "src/styles/modules/Home/EmptyHome";
</style>