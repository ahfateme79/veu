<template>
  <div @click="activate" class="d-flex pointer last_conversation"
       :style="[
      activeConversation !== null && activeConversation === userConversation.id
        ? {
            background: '#7FD2BC',
          }
        : { background: 'transparent' },
    ]">
    <div class="d-flex justify-content-center align-items-center last_conversation_avatar">
      <img
          v-if="userConversation.avatar === null"
          src="../assets/avatar.png"
          alt=""
      />
      <img v-else :src="userConversation.avatar" alt=""/>
    </div>
    <div
        class="d-flex flex-column flex-grow-1 gap-3 justify-content-center border-bottom pe-3"
    >
      <div class="d-flex justify-content-between">
        <h3 class="mb-0 last_conversation_name">{{ userConversation.name }}</h3>
        <span class="time">
          {{
            $filter.moment(
                userConversation.last_message.created_at,
                "jYYYY/jM/jD"
            )
          }}</span
        >
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="mb-0 message">
          {{ shortenLastMessage(userConversation.last_message.message, 20) }}
        </h3>
        <span class="d-flex ms-2"
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.828"
            height="9.746"
            viewBox="0 0 13.828 9.746"
        >
            <path
                id="Stroke_3"
                data-name="Stroke 3"
                d="M0,3.666,3.668,7.332,11,0"
                transform="translate(1.414 1.414)"
                fill="none"
                :stroke="
                userConversation.last_message.read_at !== null
                  ? '#29bb89'
                  : '#A8A9AB'
              "
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userConversation", "activeConversation"],
  data() {
    return {
      aciveRoom: null,
    }
  },
  methods: {
    shortenLastMessage(message, number) {
      return message !== null && message.length > number
          ? `${message.slice(0, number)}...`
          : message;
    },
    activate() {
      this.$emit('lastCanversationActivate', this.userConversation.id)
    }
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/LastConversation/LastConversation";
</style>
