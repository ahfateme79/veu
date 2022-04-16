<template>
  <div>
    <div id="conversation-messages-container" class="overflow">
      <div v-for="(message, index) in messages" :key="index">
        <conversation-message-item
          @messageDelete="deleteItem"
          :message="message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ConversationMessageItem from "./ConversationMessageItem.vue";

export default {
  components: { ConversationMessageItem },
  props: ["messages"],
  mounted() {
    const content = document.querySelector("#conversation-messages-container");

    // var position = content.offsetTop;
    // var scrolled = document.scrollingElement.scrollTop;
    // console.log(position);
    // console.log("++++++++++=");
    // console.log(scrolled);
    content.addEventListener("scroll", function () {
      let scrolled = document.scrollingElement.scrollHeight;
      let position = content.offsetTop;
      console.log(scrolled + "++++++++++++==")
      console.log(position + "++++++++++++++++=")
      if(scrolled === 0) {
        console.log("000000000000000000000000")
      }
      if (scrolled < position) {
        console.log('hgjhdghd')
        // content.classList.add("curtain-in");
      }
    });
  },
  methods: {
    deleteItem(message) {
      this.$emit("deleteMessage", message);
    },
  },
};
</script>
<style scoped>
.overflow {
  height: 444px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow::-webkit-scrollbar {
  display: none;
}
</style>
