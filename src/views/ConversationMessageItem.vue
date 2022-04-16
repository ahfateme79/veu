<template>
  <div :style="[
      user !== null && message.from === user.id
        ? {
            display: 'block',
          }
        : { display: 'flex', justifyContent: 'start',direction:'ltr' },
    ]" v-if="messageToDelete.id !== message.id">
    <div class="d-flex message-container"  v-if="message.message != null">
      <!-- <div class="align-self-end ms-2 pointer" @click="deleteMessage">
        <svg xmlns="http://www.w3.org/2000/svg" width="18.458" height="19.999" viewBox="0 0 18.458 19.999">
          <g id="Delete" transform="translate(0 -0.001)">
            <path id="Stroke_1" data-name="Stroke 1"
                  d="M14.191,0s-.543,6.735-.858,9.572a2.238,2.238,0,0,1-2.358,2.174c-2.609.047-5.221.05-7.829-.005A2.214,2.214,0,0,1,.857,9.579C.54,6.717,0,0,0,0"
                  transform="translate(2.134 7.468)" fill="none" stroke="#a8a9ab" stroke-linecap="round"
                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
            <path id="Stroke_3" data-name="Stroke 3" d="M16.958.5H0" transform="translate(0.75 3.74)" fill="none"
                  stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                  stroke-width="1.5"/>
            <path id="Stroke_5" data-name="Stroke 5"
                  d="M10.423,3.489A1.648,1.648,0,0,1,8.808,2.165L8.565.949A1.28,1.28,0,0,0,7.328,0H3.1A1.28,1.28,0,0,0,1.858.949L1.615,2.165A1.648,1.648,0,0,1,0,3.489"
                  transform="translate(4.018 0.751)" fill="none" stroke="#a8a9ab" stroke-linecap="round"
                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
          </g>
        </svg>
      </div> -->
      <div
      >
        <div
            class="message text-wrap mb-2"
            v-if="user !== null"
            :style="[
        message.from === user.id
          ? {
              background: '#c8e8de',
              borderRadius: '10px 4px 10px 10px',
            }
          : { background: '#EAECF1', borderRadius: '4px 10px 10px 10px' },
      ]"
        >
          <div class="text">{{ message.message }}</div>
          <div class="d-flex align-items-center">
        <span
            :style="[
            user !== null && message.from === user.id
              ? {
                  display: 'flex',
                }
              : { display: 'none' },
          ]"
            class="ms-2"
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
                :stroke="message.read_at !== null ? '#29bb89' : '#A8A9AB'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
            />
          </svg>
        </span>
            <span class="time">
          {{ $filter.moment(message.created_at, "H:SS") }}</span
            >
          </div>
        </div>
      </div>
    </div>


    <div v-if="message.images.length > 0" class="d-flex message-container">
      <div class="align-self-end ms-2 pointer" @click="deleteMessage">
        <svg xmlns="http://www.w3.org/2000/svg" width="18.458" height="19.999" viewBox="0 0 18.458 19.999">
          <g id="Delete" transform="translate(0 -0.001)">
            <path id="Stroke_1" data-name="Stroke 1"
                  d="M14.191,0s-.543,6.735-.858,9.572a2.238,2.238,0,0,1-2.358,2.174c-2.609.047-5.221.05-7.829-.005A2.214,2.214,0,0,1,.857,9.579C.54,6.717,0,0,0,0"
                  transform="translate(2.134 7.468)" fill="none" stroke="#a8a9ab" stroke-linecap="round"
                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
            <path id="Stroke_3" data-name="Stroke 3" d="M16.958.5H0" transform="translate(0.75 3.74)" fill="none"
                  stroke="#a8a9ab" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                  stroke-width="1.5"/>
            <path id="Stroke_5" data-name="Stroke 5"
                  d="M10.423,3.489A1.648,1.648,0,0,1,8.808,2.165L8.565.949A1.28,1.28,0,0,0,7.328,0H3.1A1.28,1.28,0,0,0,1.858.949L1.615,2.165A1.648,1.648,0,0,1,0,3.489"
                  transform="translate(4.018 0.751)" fill="none" stroke="#a8a9ab" stroke-linecap="round"
                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
          </g>
        </svg>
      </div>
      <div :style="[
      user !== null && message.from === user.id
        ? {
            display: 'block',
          }
        : { display: 'flex', justifyContent: 'flex-end' },
    ]">
        <div class="message text-wrap mb-2"
             v-if="user !== null"
             :style="[
        message.from === user.id
          ? {
              background: '#c8e8de',
              borderRadius: '10px 4px 10px 10px',
            }
          : { background: '#EAECF1', borderRadius: '4px 10px 10px 10px' },
      ]">
          <div class="d-flex align-items-center flex-wrap gap-2 mb-2">
            <div class="image" v-for="image in message.images" :key="image">
              <img class="img-fluid" :src="image.url"/>
            </div>
          </div>
          <div class="d-flex align-items-center">
        <span
            :style="[
            user !== null && message.from === user.id
              ? {
                  display: 'flex',
                }
              : { display: 'none' },
          ]"
            class="ms-2"
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
                :stroke="message.read_at !== null ? '#29bb89' : '#A8A9AB'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
            />
          </svg>
        </span>
            <span class="time">
          {{ $filter.moment(message.created_at, "H:SS") }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  data() {
    return {
      user: null,
      messageToDelete: {id: -1}
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    deleteMessage() {
      this.messageToDelete = this.message
      this.$emit("messageDelete", this.message);
    }
  }
};
</script>
<style scoped>
.message-container {
  max-width: 50%;
  width: max-content;
}

.message {
  height: max-content;
  padding: 8px 8px 12px 16px;
  border: 0.5px solid #eaecf1;
  box-shadow: 0px 2px 12px rgba(160, 219, 200, 0.2);
  word-wrap: break-word;
}

.text {
  margin-bottom: 13px;
  font-size: 14px;
  color: #151617;
}

.time {
  font-weight: normal;
  font-size: 12px;
  text-align: left;
  color: #919294;
}

.image img {
  border-radius: 5px;
}
</style>
