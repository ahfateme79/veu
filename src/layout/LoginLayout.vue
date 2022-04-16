<template>
  <div class="LoginLayout">
    <header>
      <div>
        <LoginHeader/>
      </div>
    </header>
    <main class="container">
      <div class="row">
        <div :class="{ 'col-md-4': withRightImg,'col-md-12': !withRightImg }" class="order-md-0 order-1  col-12">
          <slot></slot>
        </div>
        <div v-if="withRightImg===true" class="order-md-1 order-0 col-md-8 col-12">
          <Banner/>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Banner from "../components/UI/Banner";
import Footer from "../components/UI/Footer";
import LoginHeader from "./LoginHeader";

export default {
  name: "LoginLayout",
  components: {LoginHeader, Footer, Banner},
  props: ['withRightImg']
}
</script>

<style lang="scss">
@import "src/styles/modules/Layout/LoginLayout";
</style>