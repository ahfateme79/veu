<template>
  <div class="header-layout">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gapClass">
        <div class="dropdown d-flex">
          <div
              class="dropdown-toggle header-layout-user-name"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          >
              <span class="d-none d-md-inline-block" v-if="userName!== null">
                {{ userName }}
              </span>
          </div>
          <ul
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
          >
            <li class="w-100">
              <a class="dropdown-item dropdownProfile" @click="profileNavigation('Profile')">
                پروفایل
                <span class="dropdown-item-icon">
                  <svg id="Iconly_Light_Profile" data-name="Iconly/Light/Profile" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24">
  <g id="Profile" transform="translate(4 2.5)">
    <circle id="Ellipse_736" cx="4.778" cy="4.778" r="4.778" transform="translate(2.801 0)" fill="none" stroke="#919294"
            stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Path_33945"
          d="M0,3.016a2.215,2.215,0,0,1,.22-.97A4.042,4.042,0,0,1,3.039.426,16.787,16.787,0,0,1,5.382.1,25.053,25.053,0,0,1,9.767.1a16.979,16.979,0,0,1,2.343.33c1.071.22,2.362.659,2.819,1.62a2.27,2.27,0,0,1,0,1.95c-.458.961-1.748,1.4-2.819,1.611a15.716,15.716,0,0,1-2.343.339A25.822,25.822,0,0,1,6.2,6a4.066,4.066,0,0,1-.815-.055,15.423,15.423,0,0,1-2.334-.339C1.968,5.4.687,4.957.22,4A2.279,2.279,0,0,1,0,3.016Z"
          transform="translate(0 13.185)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>

                </span>
              </a>
            </li>
            <li class="w-100">
              <a class="dropdown-item dropdownProfile" @click="profileNavigation('MyServices')">
                گیاهان من
                <span class="dropdown-item-icon">
                <svg id="Iconly_Light_Paper" data-name="Iconly/Light/Paper" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24">
  <g id="Paper" transform="translate(4.25 2.75)">
    <path id="Stroke_1" data-name="Stroke 1"
          d="M10.487,0H3.834A3.82,3.82,0,0,0,0,3.729V14.442a3.827,3.827,0,0,0,3.834,3.911h7.989a3.887,3.887,0,0,0,3.729-3.911V5.276Z"
          transform="translate(0 0.012)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M0,0V2.909A2.574,2.574,0,0,0,2.568,5.484c1.317,0,2.664,0,2.755,0"
          transform="translate(10.224)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_5" data-name="Stroke 5" d="M5.4.5H0" transform="translate(4.637 12.308)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_7" data-name="Stroke 7" d="M3.356.5H0" transform="translate(4.637 7.355)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>
                </span>
              </a>
            </li>

            <li class="w-100">
              <a
                  class="dropdown-item dropdownProfile"
                  @click="profileNavigation('MyAdvertisements')"
              >
                آگهی های من
                <span class="dropdown-item-icon">
                  <svg id="Iconly_Light_Paper" data-name="Iconly/Light/Paper" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24">
  <g id="Paper" transform="translate(4.25 2.75)">
    <path id="Stroke_1" data-name="Stroke 1"
          d="M10.487,0H3.834A3.82,3.82,0,0,0,0,3.729V14.442a3.827,3.827,0,0,0,3.834,3.911h7.989a3.887,3.887,0,0,0,3.729-3.911V5.276Z"
          transform="translate(0 0.012)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M0,0V2.909A2.574,2.574,0,0,0,2.568,5.484c1.317,0,2.664,0,2.755,0"
          transform="translate(10.224)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_5" data-name="Stroke 5" d="M5.4.5H0" transform="translate(4.637 12.308)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_7" data-name="Stroke 7" d="M3.356.5H0" transform="translate(4.637 7.355)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>

                </span>
              </a>
            </li>
            <li class="w-100">
              <a
                  class="dropdown-item dropdownProfile"
                  @click="profileNavigation('Messages')"
              >
                اعلانات
                <span class="dropdown-item-icon">
                  <svg id="Iconly_Light_Paper" data-name="Iconly/Light/Paper" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24">
  <g id="Paper" transform="translate(4.25 2.75)">
    <path id="Stroke_1" data-name="Stroke 1"
          d="M10.487,0H3.834A3.82,3.82,0,0,0,0,3.729V14.442a3.827,3.827,0,0,0,3.834,3.911h7.989a3.887,3.887,0,0,0,3.729-3.911V5.276Z"
          transform="translate(0 0.012)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M0,0V2.909A2.574,2.574,0,0,0,2.568,5.484c1.317,0,2.664,0,2.755,0"
          transform="translate(10.224)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_5" data-name="Stroke 5" d="M5.4.5H0" transform="translate(4.637 12.308)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_7" data-name="Stroke 7" d="M3.356.5H0" transform="translate(4.637 7.355)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>

                </span>
              </a>
            </li>
            <li class="border-bottom-item w-100">
              <a
                  class="dropdown-item dropdownProfile"
                  @click="profileNavigation('MyFavorites')"
              >علاقمندی های من
                <span class="dropdown-item-icon">
                  <svg id="Iconly_Light_Bookmark" data-name="Iconly/Light/Bookmark" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24">
  <g id="Bookmark" transform="translate(3.5 2)">
    <path id="Path_33968"
          d="M7.368,15.854,1.437,19.1a.989.989,0,0,1-1.318-.394h0A1.043,1.043,0,0,1,0,18.243V3.844C0,1.1,1.876,0,4.577,0H10.92C13.538,0,15.5,1.025,15.5,3.661V18.243a.979.979,0,0,1-.979.979,1.08,1.08,0,0,1-.476-.119L8.073,15.854A.741.741,0,0,0,7.368,15.854Z"
          transform="translate(0.796 0.778)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Line_209" d="M0,.458H7.3" transform="translate(4.87 6.865)" fill="none" stroke="#919294"
          stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </g>
</svg>

                </span>
              </a>
            </li>
            <li class="w-100">
              <a @click="logoutUser" class="dropdown-item dropdownProfile mb-0">
                خروج از حساب کاربری
                <span class="dropdown-item-icon">
                <svg id="Iconly_Light_Logout" data-name="Iconly/Light/Logout" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24">
  <g id="Logout" transform="translate(2.772 2.772)">
    <path id="Stroke_1" data-name="Stroke 1"
          d="M12.244,4.618V3.685A3.685,3.685,0,0,0,8.559,0H3.684A3.685,3.685,0,0,0,0,3.685v11.13A3.685,3.685,0,0,0,3.684,18.5H8.569a3.675,3.675,0,0,0,3.675-3.674v-.943"
          transform="translate(0)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M12.041.5H0" transform="translate(6.997 8.75)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path id="Stroke_5" data-name="Stroke 5" d="M0,0,2.928,2.915,0,5.831" transform="translate(16.109 6.335)"
          fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
          stroke-width="1.5"/>
  </g>
</svg>


                </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="ProfileAvatar d-flex justify-content-center align-items-center">
          <img  class="w-100 h-100" style="border-radius: 8px;object-fit: cover" v-if="userAvatar != ''" :src="userAvatar">
          <img style="border-radius: 8px; padding: 8px;object-fit: cover" v-else src="../assets/avatar.png">
        </div>
        <div @click="goAnotherPage('/messages')" class="position-relative">
          <div class="notificationIcon d-inline-block"></div>
          <span v-if="totalUnReadMessages !== null" class="number-notification">{{ shortenerPlus(totalUnReadMessages) }}</span>
        </div>
      </div>
      <SystemIcon/>
    </div>

  </div>
</template>

<script>
import SystemIcon from "../components/UI/SystemIcon";
import {globalMixin} from "../mixins/globalMixin";

export default {
  name: "Header",
  components: {SystemIcon},
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      user: null,
      total: null,
      userName: null,
      userAvatar: ''
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = localStorage.getItem("userName");
    let userAvatar = localStorage.getItem("userAvatar");
    this.user = user;
    this.userName = userName;
    this.userAvatar = userAvatar;
    this.getTotalUnReadMessages();
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
       localStorage.removeItem('userName');
      localStorage.removeItem('userAvatar');
      window.location.replace('/login')
      // this.$router.replace('/login');
    },
    profileNavigation(el) {
      if (el === "Profile") {
        this.$router.push({name: "Profile"});
      } else if (el === "MyServices") {
        this.$router.push({name: "MyServices"});
      } else if (el === "MyOrders") {
        this.$router.push({name: "MyOrders"});
      } else if (el === "Messages") {
        this.$router.push({name: "Messages"});
      } else if (el === "MyAdvertisements") {
        this.$router.push({name: "MyAdvertisements"});
      } else if (el === "MyFavorites") {
        this.$router.push({name: "MyFavorites"});
      }
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/Layout/Header";
</style>
