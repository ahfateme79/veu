<template>
  <div
    class="input_container d-flex align-items-center justify-content-between"
  >
    <div @click="sendMessage()" class="d-flex pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.517"
        height="19.517"
        viewBox="0 0 19.517 19.517"
      >
        <g id="Send" transform="translate(0.755 0.762)">
          <path
            id="Send-2"
            data-name="Send"
            d="M12.855,5.121l-5.664,5.7L.561,6.741A1.182,1.182,0,0,1,.847,4.6L16.5.047a1.176,1.176,0,0,1,1.447,1.471L13.3,17.158a1.168,1.168,0,0,1-2.123.274l-3.989-6.61"
            fill="none"
            stroke="#a8a9ab"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
          />
        </g>
      </svg>
    </div>
    <input
      type="text"
      v-model="message"
      @keyup.enter="sendMessage()"
      placeholder="متن پیام"
      class="text_input"
    />
    <div class="d-flex pointer">
      <div>
        <input
          @change="onFileChange"
          class="HerbalAdviceImageInput d-none"
          type="file"
          id="imageFile"
          multiple="multiple"
          accept="image/png, image/jpeg , image/jpg, image/gif"
          ref="fileInput"
        />
      </div>
      <div
        class="d-flex flex-column justify-content-center align-items-center"
        @click="callInputMethod"
      >
        <span>
          <svg
            id="Iconly_Bold_Camera"
            data-name="Iconly/Bold/Camera"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <g id="Camera" transform="translate(2.667 4)">
              <path
                id="Camera-2"
                data-name="Camera"
                d="M20.854,24H5.813A5.816,5.816,0,0,1,0,18.193V10.282A5.816,5.816,0,0,1,5.813,4.475a.264.264,0,0,0,.254-.16l.079-.16.111-.233c.348-.734.742-1.564.982-2.044A3.244,3.244,0,0,1,10.187,0h6.28a3.254,3.254,0,0,1,2.96,1.878c.21.419.528,1.093.837,1.744l.189.4.134.293a.3.3,0,0,0,.266.16,5.816,5.816,0,0,1,5.813,5.807v7.912A5.816,5.816,0,0,1,20.854,24ZM13.333,8.537a5.229,5.229,0,0,0-3.72,1.546,5.156,5.156,0,0,0-1.52,3.689,5.232,5.232,0,0,0,5.24,5.234,5.194,5.194,0,0,0,3.694-1.531,5.221,5.221,0,0,0,.013-7.405A5.206,5.206,0,0,0,13.333,8.537Zm7.48-.319A1.205,1.205,0,1,0,22.027,9.43,1.207,1.207,0,0,0,20.813,8.218Zm-7.48,8.79a3.231,3.231,0,0,1-3.24-3.236v-.013a3.116,3.116,0,0,1,.934-2.264,3.24,3.24,0,1,1,2.306,5.514Z"
                fill="#bfc0c2"
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
    <div
      class="modal fade"
      id="imagesModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div
            v-if="images.length > 0"
            class="d-flex flex-wrap gap-2 modal-body"
          >
            <div v-for="image in images" :key="image">
              <img class="img-fluid" :src="image.url" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              لغو
            </button>
            <button @click="sendMessage" type="button" class="btn btn-primary">
              ارسال
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../common/api";
import { globalMixin } from "../mixins/globalMixin";
import { Modal } from "bootstrap";

export default {
  props: ["room"],
  inject: ["$axios"],
  mixins: [globalMixin],
  data: function () {
    return {
      message: "",
      images: [],
      imagesSelected: false,
      imagesModal: null,
    };
  },
  watch: {
    imagesSelected(newValue) {
      if (newValue === true) {
        this.imagesModal = new Modal(
          document.getElementById("imagesModal"),
          {}
        );
        this.imagesModal.show();
      }
    },
  },
  methods: {
    sendMessage() {
      if (this.message == " ") {
        return;
      }
      this.messagesLoading = true;
      let formData = new FormData();
      if (this.images.length > 0) {
        this.images.map((item) => {
          formData.append("images[]", item.file);
        });
      }
      if (this.message !== "") {
        formData.append("message", this.message);
      }
      formData.append("receiver_id", this.room.id);
      Api.sendMessageApi({
        formData,
        self: this,
      })
        .then((response) => {
          if (response.status === 200) {
            this.messagesLoading = false;
            this.message = "";
            this.images = [];
            if (this.imagesModal) {
              this.imagesModal.hide();
            }
            this.$emit("messageSent", response.data.message);
          }
        })
        .catch((error) => {
          self.handleError(self, error);
        });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      for (let i = 0; i < e.target.files.length; i++) {
        let obj = {
          file: e.target.files[i],
          url: URL.createObjectURL(e.target.files[i]),
        };
        this.images.push(obj);
        this.imagesSelected = true;
      }
    },
    callInputMethod() {
      document.querySelector(".HerbalAdviceImageInput").click();
    }
  },
};
</script>
<style scoped>
.text_input {
  width: 607px;
  height: 48px;
  border-radius: 10px;
  background: #f5f6f8;
  border: 0.5px solid #eaecf1;
  font-weight: normal;
  font-size: 14px;
  text-align: right;
  color: #a8a9ab;
  padding: 14px 16px 16px 14px;
  margin: 0px 16px 0px 16px;
}

@media (max-width: 767px) {
  .text_input {
    background: #fff;
  }
}

.text_input:focus-visible {
  outline: unset;
}

.image-upload > input {
  display: none;
}
</style>
