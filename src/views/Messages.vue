<template>
  <home-layout>
    <div class="container" v-if="loading">
      <ProgressPage />
    </div>
    <div v-if="!loading" class="messages mb-5">
      <header class="header">پیغام ها</header>
      <div v-if="messages.data.length > 0">
        <div
          v-for="message in messages.data"
          :key="message.id"
          class="d-flex justify-content-between message"
          :class="{ unreadMessage: message.read_at == null }"
          @click="markAsRead(message)"
        >
          <h3 class="text">{{ message.data.message }}</h3>
          {{ $filter.moment(message.created_at, "jYYYY/jM/jD") }}
        </div>
      </div>
      <div v-else class="empty">پیغامی برای نمایش وجود ندارد</div>
      <pagination
        v-model="current_page"
        :records="total"
        :per-page="per_page"
        hideCount="true"
        @paginate="notificationData"
      />
    </div>
  </home-layout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout.vue";
import Api from "../common/api";
import { mapMixin } from "../mixins/mapMixin";
import { globalMixin } from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";

export default {
  name: "Messages",
  components: { HomeLayout, ProgressPage },
  inject: ["$axios"],
  mixins: [globalMixin, mapMixin],
  data() {
    return {
      messages: [],
      current_page: 1,
      total: 1,
      per_page: 1,
      filtered: {},
    };
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.current_page = this.$route.query.page ? this.$route.query.page : 1;
    this.notificationData();
  },
  methods: {
    notificationData(page = this.current_page) {
      let self = this;
      this.filtered.page = page;
      if (this.filtered.page === 1) delete this.filtered.page;
      Api.getNotificationApi({ self: this, page: this.filtered })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            this.loading = false;
            this.messages = data !== undefined && data !== null ? data : null;
            this.page = data.current_page;
            this.total = data.total;
            this.per_page = data.per_page;
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
      this.$router.push({ query: this.filtered }).catch(() => {});
    },
    markAsRead(msg) {
      this.notificationNavigate(msg);
      Api.MessageMarkAsReadApi({ self: this, id: msg.id })
        .then((response) => {
          if (response.status === 200) {
            this.getTotalUnReadMessages();
          }
        })
        .catch((error) => {
          this.toastReturnTxt(error.response);
        });
    },
    notificationNavigate(msg) {
      let noteType = msg.type !== undefined ? msg.type.split("\\")[3] : "";
      switch (noteType) {
        case "PlantUpdateStateNotification":
          this.$router.push(`/home`);
          break;
        case "ConsultingResponseNotification":
          msg.data.consulting_id !== undefined
            ? this.$router.push(`/show-consulting/${msg.data.consulting_id}`)
            : this.$router.push(`/home`);
          break;
        case "ConversationResponseNotification":
          this.$router.push("conversation");
          break;
        case "SoilExaminationConfirmNotification":
          msg.data.examination_id !== undefined
            ? this.$router.push(
                `/show-soil-examination/${msg.data.examination_id}`
              )
            : this.$router.push(`/home`);
          break;
        case "WeatherWarningNotification":
          this.$router.push(`/home`);
          break;
        default:
          this.$router.push(`/home`);
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/Messages/Messages";
</style>
<style>
.VuePagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.VuePagination__count {
  display: none;
}

.page-item.active .page-link {
  background-color: #4d7017;
  border-color: unset;
}

.page-link {
  color: #4d7017;
}

.page-link:hover {
  color: #4d7017;
}

.page-item:last-child .page-link {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.page-item:first-child .page-link {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
