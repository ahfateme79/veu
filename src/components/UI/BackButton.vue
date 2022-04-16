<template>
  <router-link class="d-flex align-items-center back-to-first" to="/login">
    بازگشت به صفحه نخست
    <font-awesome-icon
        class="ms-2"
        icon="arrow-right">
    </font-awesome-icon>
  </router-link>
</template>

<script>
export default {
  name: "BackButton"
}
</script>

<style lang="scss">
@import "src/styles/modules/UI/BackButton";
</style>