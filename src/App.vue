<template>
  <router-view :key="$route.path"/>
</template>
<script>
import {globalMixin} from "./mixins/globalMixin";

export default {
  name: 'App',
  mixins: [globalMixin],
}
</script>

<style scoped>

</style>
