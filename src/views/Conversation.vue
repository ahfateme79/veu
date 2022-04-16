<template>
  <div>
    <home-layout v-if="chatHomeOnMobile === false">
      <div v-if="loading">
        <ProgressPage />
      </div>
      <div v-if="!loading" class="margin-at-mobile conversation">
        <div v-if="!hasError">
          <div class="new_conversation_create">
            <header class="header">ایجاد گفت و گو جدید</header>
            <div class="contacts">
              <swiper
                :slidesPerView="3.8"
                :spaceBetween="16"
                :breakpoints="{
                  '400': {
                    slidesPerView: 3.9,
                    spaceBetween: 16,
                  },
                  '768': {
                    slidesPerView: 8,
                    spaceBetween: 24,
                  },
                  '1024': {
                    slidesPerView: 9,
                    spaceBetween: 24,
                  },
                }"
              >
                <swiper-slide v-for="contact in chatRooms" :key="contact.id">
                  <div
                    @click="setRoom(contact)"
                    class="
                      d-flex
                      flex-column
                      align-items-center
                      cursor-pointer
                      contact
                    "
                  >
                    <div
                      class="
                        d-flex
                        justify-content-center
                        align-items-center
                        w-100
                        avatar
                      "
                      :style="[
                        contact.id === currentRoom.id
                          ? {
                              background: '#a8a9ab',
                            }
                          : { background: '#F5F6F8' },
                      ]"
                    >
                      <img
                        v-if="contact.avatar === null"
                        src="../assets/avatar.png"
                        alt=""
                      />
                      <img
                        class="avatar-img"
                        v-else
                        :src="contact.avatar"
                        alt=""
                      />
                    </div>
                    <h3 class="name">{{ contact.name }}</h3>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="chatBox row mx-0">
            <div class="d-none d-md-block last_conversations col-12 col-md-4">
              <header class="header">گفتوگو های اخیر</header>
              <last-conversations
                @setRoom="setRoom"
                :userConversations="userConversations"
              />
            </div>
            <div class="d-none d-md-block chatRoom col-md-8">
              <div class="d-flex current_room_header">
                <div
                  class="
                    d-flex
                    justify-content-center
                    align-items-center
                    currntRoomAvatar
                  "
                >
                  <img
                    v-if="currentRoom.avatar === null"
                    src="../assets/avatar.png"
                    alt=""
                  />
                  <img v-else :src="currentRoom.avatar" alt="" />
                </div>
                <div
                  class="
                    d-flex
                    flex-column
                    justify-content-center
                    align-items-start
                  "
                >
                  <h3 class="name">{{ currentRoom.name }}</h3>
                  <h3 v-if="currentRoom.role !== undefined" class="name">
                    {{ currentRoom.role[0].name }}
                  </h3>
                </div>
              </div>
              <!--            <div v-if="messagesLoading">-->
              <!--              <div class="d-flex justify-content-center align-items-center">-->
              <!--                <div class="spinner-grow text-secondary" role="status">-->
              <!--                  <span class="visually-hidden">Loading...</span>-->
              <!--                </div>-->
              <!--                <div class="spinner-grow text-secondary" role="status">-->
              <!--                  <span class="visually-hidden">Loading...</span>-->
              <!--                </div>-->
              <!--                <div class="spinner-grow text-secondary" role="status">-->
              <!--                  <span class="visually-hidden">Loading...</span>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--            </div>-->
              <div>
                <conversation-message-container
                  :messages="messages"
                  @deleteMessage="messageDelete"
                />
                <conversation-input-message
                  :room="currentRoom"
                  @messageSent="addToMessages"
                />
              </div>
            </div>
            <div
              v-if="showLastConversation === true"
              class="d-md-none last_conversations"
            >
              <header class="header">گفتگو های اخیر</header>
              <last-conversations
                @setRoom="setRoom"
                :userConversations="userConversations"
              />
            </div>
          </div>
        </div>
        <div
          v-if="hasError"
          style="
            display: flex;
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
          "
        >
          <span
            class="d-block p-2"
            style="text-align: center; font-size: 20px; padding: 20px"
            >خطایی رخ داده است</span
          >

          <img
            src="../assets/icon/Jalizan.png"
            alt=""
            style="height: 100px; width: 100px"
          />
        </div>
      </div>
    </home-layout>
    <div class="chat-home-onMobile" v-else>
      <div class="d-flex align-items-center current_room_header">
        <div @click="backArrow" class="d-md-none pointer">
          <svg
            id="Iconly_Light_Arrow_-_Right"
            data-name="Iconly/Light/Arrow - Right"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              id="Arrow_-_Right"
              data-name="Arrow - Right"
              transform="translate(4.75 17.75) rotate(-90)"
            >
              <path
                id="Stroke_1"
                data-name="Stroke 1"
                d="M0,15V0"
                transform="translate(6.025)"
                fill="none"
                stroke="#919294"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <path
                id="Stroke_3"
                data-name="Stroke 3"
                d="M12.049,0,6.025,6.05,0,0"
                transform="translate(0 8.95)"
                fill="none"
                stroke="#919294"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
            </g>
          </svg>
        </div>
        <div
          class="
            d-flex
            justify-content-center
            align-items-center
            currntRoomAvatar
          "
        >
          <img
            v-if="currentRoom.avatar === null"
            src="../assets/avatar.png"
            alt=""
          />
          <img v-else :src="currentRoom.avatar" alt="" />
        </div>
        <div
          class="d-flex flex-column justify-content-center align-items-start"
        >
          <h3 class="name">{{ currentRoom.name }}</h3>
          <h3 v-if="currentRoom.role !== undefined" class="name">
            {{ currentRoom.role[0].name }}
          </h3>
        </div>
      </div>
      <!--      <div v-if="messagesLoading">-->
      <!--        <div class="d-flex justify-content-center align-items-center">-->
      <!--          <div class="spinner-grow text-secondary" role="status">-->
      <!--            <span class="visually-hidden">Loading...</span>-->
      <!--          </div>-->
      <!--          <div class="spinner-grow text-secondary" role="status">-->
      <!--            <span class="visually-hidden">Loading...</span>-->
      <!--          </div>-->
      <!--          <div class="spinner-grow text-secondary" role="status">-->
      <!--            <span class="visually-hidden">Loading...</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div>
        <conversation-message-container
          @deleteMessage="messageDelete"
          :messages="messages"
        />
        <conversation-input-message
          :room="currentRoom"
          @messageSent="addToMessages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeLayout from "../layout/HomeLayout.vue";
import ConversationMessageContainer from "./ConversationMessageContainer.vue";
import ConversationInputMessage from "./ConversationInputMessage.vue";
import LastConversations from "./LastConversations.vue";
import Api from "../common/api";
import { mapMixin } from "../mixins/mapMixin";
import { globalMixin } from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";
import Pusher from "pusher-js";

export default {
  name: "Conversation",
  components: {
    HomeLayout,
    ConversationMessageContainer,
    ConversationInputMessage,
    ProgressPage,
    LastConversations,
  },
  inject: ["$axios"],
  mixins: [globalMixin, mapMixin],
  data() {
    return {
      chatRooms: [],
      currentRoom: [],
      messages: [],
      userConversations: [],
      user: null,
      pusher: null,
      showChatRoom: true,
      showLastConversation: false,
      showNewConversation: true,
      chatHomeOnMobile: false,
      hasError: false,
    };
  },
  mounted() {
    this.loading = true;
    this.getRooms();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.pusher = new Pusher("c846d7a08419c92aaca1", {
      cluster: "eu",
      forceTLS: false,
    });
    // this.pusher = new Pusher({
    //   appId: "1326007",
    //   key:  "116fe997815154b613c5",
    //   secret: "ac25c0119dc6a3f23209",
    //   cluster: "eu",
    //   forceTLS: false,
    // });
  },
  watch: {
    currentRoom(val, oldVal) {
      if (oldVal.id) {
        this.disconnect(oldVal);
      }
      this.connect();
    },
  },
  methods: {
    connect() {
      if (this.currentRoom.id) {
        let vm = this;
        this.getMessages();
        const channel = this.pusher.subscribe(`App.User.${this.user.id}`);
        this.pusher.subscribe(`read-message`);
        channel.bind("chat-message", (data) => {
          vm.messages.push(data.message);
        });
      }
    },
    disconnect() {
      this.pusher.unsubscribe("App.User." + this.user.id);
    },
    getRooms() {
      let self = this;
      Api.getMessagesUsersApi({ self: this })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.loading = false;
            this.chatRooms =
              data.contacts !== undefined && data.contacts !== null
                ? data.contacts
                : null;
            this.mountedSetRoom(this.chatRooms[0]);
            this.userConversations =
              data.messages !== undefined && data.messages !== null
                ? data.messages
                : null;
            this.hasError = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.hasError = true;
          self.toastReturnTxt(error);
        });
    },
    addToMessages(message) {
      this.messages.push(message);
      this.getUserConversations();
      let element = document.getElementById("conversation-messages-container");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    },
    getMessages() {
      let self = this;
      this.messagesLoading = true;
      Api.getMessagesApi({ self: this, currentRoomId: this.currentRoom.id })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.messagesLoading = false;
            this.messages = data;
            let element = document.getElementById(
              "conversation-messages-container"
            );
            if (element) {
              element.scrollTop = element.scrollHeight;
            }
          }
        })
        .catch((error) => {
          this.messagesLoading = false;
          self.handleError(self, error);
        });
      this.getUserConversations();
    },
    getUserConversations() {
      let self = this;
      Api.getMessagesUsersApi({ self: this })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.userConversations =
              data.messages !== undefined && data.messages !== null
                ? data.messages
                : null;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    setRoom(room) {
      window.scrollTo(0, 470);
      this.currentRoom = room;
      this.showChatRoom = !this.showChatRoom;
      this.showLastConversation = !this.showLastConversation;
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        this.chatHomeOnMobile = true;
      }
    },
    mountedSetRoom(room) {
      this.currentRoom = room;
      this.showChatRoom = !this.showChatRoom;
      this.showLastConversation = !this.showLastConversation;
    },
    backArrow() {
      this.showChatRoom = false;
      this.showLastConversation = true;
      this.chatHomeOnMobile = false;
    },
    messageDelete(message) {
      let self = this;
      Api.deleteMessageApi({ self: this, id: message.id })
        .then(() => {})
        .catch((error) => {
          self.handleError(self, error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/Conversation/Conversation";
</style>
