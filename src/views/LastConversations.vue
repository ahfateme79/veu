<template>
  <div class="overflow">
    <div
        v-for="userConversation in userConversations"
        :key="userConversation.id"
    >
      <last-conversation
          @lastCanversationActivate="setActivelastCanversation"
          @click="setRoom(userConversation)"
          :userConversation="userConversation"
          :activeConversation="activeConversation"
      />
    </div>
  </div>
</template>

<script>
import {globalMixin} from "../mixins/globalMixin";
import LastConversation from "./LastConversation.vue";

export default {
  props: ["userConversations"],
  inject: ["$axios"],
  mixins: [globalMixin],
  components: {LastConversation},
  data() {
    return {
      activeConversation: null,
    }
  },
  methods: {
    setRoom(userConversation) {
      this.$emit("setRoom", userConversation);
    },
    setActivelastCanversation(id) {
      this.activeConversation = id;
    }
  },
};
</script>
<style scoped>
.overflow {
  height: 572px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 767px) {
  .overflow {
    height: 420px;
  }
}

.overflow::-webkit-scrollbar {
  display: none;
}
</style>
