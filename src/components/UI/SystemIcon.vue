<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center justify-content-end">
      <div class="system-icon-title d-md-block d-none">جالیزان</div>
      <div class="system-icon-image"></div>
      <div class="d-md-none">
        <nav dir="rtl" class="navbar navbar-light">
          <div>
            <button class="navbar-toggler border-0 p-0" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                  >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                 aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                  <div class="d-flex align-items-center">
                    <div class="system-icon-image"></div>
                    <div class="system-icon-title">جالیزان</div>
                  </div>
                </h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div dir="rtl" class="d-flex justify-content-between flex-column p-0 h-100  sideBarMenuLayout">
                  <div class="sideBar-nav-items">
<!--                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"-->
<!--                         @click="activate('home')"-->
<!--                    >-->
<!--                      <font-awesome-icon-->
<!--                          icon="home"-->
<!--                          size="x"-->
<!--                          color="#ccccb3"-->
<!--                          class="mobile-icon"-->
<!--                      >-->
<!--                      </font-awesome-icon>-->
<!--                      خانه-->
<!--                    </div>-->
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('meteorology')"
                    >
                      <font-awesome-icon
                          icon="tint"
                          size="x"
                          color="#ccccb3"
                          class="mobile-icon"
                      >
                      </font-awesome-icon>
                      هواشناسی
                    </div>
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('subscription')"
                    >
                      <span class="mobile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.254" height="18.5" viewBox="0 0 14.254 18.5">
  <g id="medal" transform="translate(-59.305 0.1)">
    <path id="Path_988" data-name="Path 988"
          d="M71.248,17.4A7.026,7.026,0,0,0,68.126,5.472a.357.357,0,0,0-.172.694,6.312,6.312,0,1,1-3.045,0,.357.357,0,0,0-.172-.694A7.062,7.062,0,0,0,60.923,7.93a7.021,7.021,0,0,0,.693,9.474l-1.871,3.579a.357.357,0,0,0,.15.482l.013.007a.358.358,0,0,0,.26.029l2.593-.7.9,2.53a.357.357,0,0,0,.312.236H64a.357.357,0,0,0,.317-.192l2.114-4.043,2.114,4.043a.357.357,0,0,0,.317.192h.025a.357.357,0,0,0,.312-.236l.9-2.53,2.593.7a.357.357,0,0,0,.26-.029l.013-.007a.357.357,0,0,0,.15-.482Zm-7.185,4.915-.74-2.072a.357.357,0,0,0-.43-.225l-2.143.58,1.424-2.723a6.99,6.99,0,0,0,3.48,1.4Zm5.908-2.3a.357.357,0,0,0-.43.225l-.74,2.072L67.21,19.276a6.99,6.99,0,0,0,3.48-1.4L72.113,20.6Z"
          transform="translate(0 -5.266)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_989" data-name="Path 989"
          d="M109.4,55.24a5.24,5.24,0,1,0,5.24-5.24A5.246,5.246,0,0,0,109.4,55.24Zm9.765,0a4.525,4.525,0,1,1-4.525-4.525A4.53,4.53,0,0,1,119.17,55.24Z"
          transform="translate(-48.213 -48.213)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_990" data-name="Path 990"
          d="M182.637,124.265l-.442.854a.359.359,0,0,1-.259.188l-.949.157a.608.608,0,0,0-.334,1.026l.676.685a.359.359,0,0,1,.1.3l-.144.951a.608.608,0,0,0,.873.634l.86-.431a.359.359,0,0,1,.32,0l.86.431a.608.608,0,0,0,.873-.634l-.144-.951a.359.359,0,0,1,.1-.3l.676-.685a.608.608,0,0,0-.334-1.026l-.949-.156a.359.359,0,0,1-.259-.188l-.442-.854a.608.608,0,0,0-1.079,0Zm1.664,1.748.745.123-.53.537a1.077,1.077,0,0,0-.3.914l.113.746-.675-.338a1.077,1.077,0,0,0-.962,0l-.675.338.113-.746a1.077,1.077,0,0,0-.3-.914l-.53-.537.745-.123a1.077,1.077,0,0,0,.778-.565l.347-.67.347.67A1.077,1.077,0,0,0,184.3,126.013Z"
          transform="translate(-116.745 -119.507)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <circle id="Ellipse_736" data-name="Ellipse 736" cx="0.357" cy="0.357" r="0.357" transform="translate(66.074)"
            fill="#919294" stroke="#919294" stroke-width="0.2"/>
  </g>
</svg>

                      </span>
                      اشتراک
                    </div>
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('conversation')"
                    >
                      <span class="mobile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18.167" height="18.167"
                             viewBox="0 0 18.167 18.167">
  <g id="Iconly_Light_Chat" data-name="Iconly/Light/Chat" transform="translate(0.75 0.75)">
    <g id="Chat">
      <path id="Combined_Shape" data-name="Combined Shape"
            d="M7.571.972a.974.974,0,1,1,.974.974A.974.974,0,0,1,7.571.972Zm-3.785,0a.974.974,0,1,1,.974.974A.974.974,0,0,1,3.786.972ZM0,.972a.974.974,0,1,1,.974.974A.974.974,0,0,1,0,.972Z"
            transform="translate(3.772 7.546)" fill="#919294"/>
      <path id="Stroke_7" data-name="Stroke 7"
            d="M8.35,0A8.339,8.339,0,0,0,0,8.346,8.82,8.82,0,0,0,1.125,12.51a.876.876,0,0,1,.058.752L.625,15.131a.52.52,0,0,0,.683.65l1.683-.5a1.414,1.414,0,0,1,1.242.3A8.331,8.331,0,1,0,8.35,0Z"
            fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
            stroke-width="1.5"/>
    </g>
  </g>
</svg>

                      </span>
                      گفتگو
                    </div>
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('Store')"
                    >
                      <font-awesome-icon
                          icon="shopping-bag"
                          size="x"
                          color="#ccccb3"
                          class="mobile-icon"
                      >
                      </font-awesome-icon>
                      فروشگاه
                    </div>
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('Services')"
                    >
                      <font-awesome-icon
                          icon="list-alt"
                          size="x"
                          color="#ccccb3"
                          class="mobile-icon"
                      >
                      </font-awesome-icon>
                      آگهی ها
                    </div>
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('Articles')"
                    >
                     <span class="mobile-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18.842" height="18.766"
                                                    viewBox="0 0 18.842 18.766">
  <g id="edit" transform="translate(0.1 0.1)">
    <path id="Path_110" data-name="Path 110"
          d="M11.781,21.146a.39.39,0,0,1-.274-.113.386.386,0,0,1-.106-.349l.547-2.735a.379.379,0,0,1,.106-.2l6.017-6.017a1.163,1.163,0,0,1,1.641,0l1.094,1.094a1.161,1.161,0,0,1,0,1.641l-6.017,6.017a.385.385,0,0,1-.2.106l-2.735.547A.411.411,0,0,1,11.781,21.146Zm.9-2.931-.41,2.051,2.051-.41,5.934-5.934a.387.387,0,0,0,0-.547l-1.094-1.094a.387.387,0,0,0-.547,0Zm1.831,2h.008Z"
          transform="translate(-2.58 -2.58)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_111" data-name="Path 111"
          d="M7.349,16.924H1.934A1.936,1.936,0,0,1,0,14.99V4.934A1.936,1.936,0,0,1,1.934,3H3.481a.387.387,0,1,1,0,.774H1.934a1.162,1.162,0,0,0-1.16,1.16V14.99a1.162,1.162,0,0,0,1.16,1.16H7.349a.387.387,0,1,1,0,.774Z"
          transform="translate(0 -0.679)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_112" data-name="Path 112"
          d="M15.481,9.962a.387.387,0,0,1-.387-.387V4.934a1.162,1.162,0,0,0-1.16-1.16H12.387a.387.387,0,1,1,0-.774h1.547a1.936,1.936,0,0,1,1.934,1.934V9.575A.387.387,0,0,1,15.481,9.962Z"
          transform="translate(-2.717 -0.679)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_113" data-name="Path 113"
          d="M9.8,4.641H5.16A1.162,1.162,0,0,1,4,3.481V1.934a.387.387,0,0,1,.387-.387h1.2a1.934,1.934,0,0,1,3.791,0h1.2a.387.387,0,0,1,.387.387V3.481A1.162,1.162,0,0,1,9.8,4.641ZM4.774,2.321v1.16a.388.388,0,0,0,.387.387H9.8a.388.388,0,0,0,.387-.387V2.321H9.028a.387.387,0,0,1-.387-.387,1.16,1.16,0,1,0-2.321,0,.387.387,0,0,1-.387.387Z"
          transform="translate(-0.906)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_114" data-name="Path 114" d="M11.123,8.774H3.387a.387.387,0,1,1,0-.774h7.736a.387.387,0,1,1,0,.774Z"
          transform="translate(-0.679 -1.811)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_115" data-name="Path 115" d="M11.123,11.774H3.387a.387.387,0,1,1,0-.774h7.736a.387.387,0,1,1,0,.774Z"
          transform="translate(-0.679 -2.491)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_116" data-name="Path 116" d="M11.123,14.774H3.387a.387.387,0,1,1,0-.774h7.736a.387.387,0,1,1,0,.774Z"
          transform="translate(-0.679 -3.17)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
  </g>
</svg>
</span>
                      مقالات
                    </div>
                  </div>
                  <div class="sideBar-nav-items">
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('UsageTips')"
                    >
                      <span class="mobile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18.533" height="20.2" viewBox="0 0 18.533 20.2">
  <g id="copy" transform="translate(-0.9 0.1)">
    <path id="Path_126" data-name="Path 126"
          d="M18.083,20.667h-10A2.086,2.086,0,0,1,6,18.583V6.083A2.086,2.086,0,0,1,8.083,4h10a2.086,2.086,0,0,1,2.083,2.083v12.5A2.086,2.086,0,0,1,18.083,20.667Zm-10-15.833a1.252,1.252,0,0,0-1.25,1.25v12.5a1.252,1.252,0,0,0,1.25,1.25h10a1.252,1.252,0,0,0,1.25-1.25V6.083a1.252,1.252,0,0,0-1.25-1.25Z"
          transform="translate(-0.833 -0.667)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_127" data-name="Path 127"
          d="M3.917,17.5H3.083A2.086,2.086,0,0,1,1,15.417V2.083A2.086,2.086,0,0,1,3.083,0h10a2.086,2.086,0,0,1,2.083,2.083.417.417,0,0,1-.833,0,1.252,1.252,0,0,0-1.25-1.25h-10a1.252,1.252,0,0,0-1.25,1.25V15.417a1.252,1.252,0,0,0,1.25,1.25h.833a.417.417,0,0,1,0,.833Z"
          fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_128" data-name="Path 128"
          d="M17.083,16.833H10.417a.417.417,0,1,1,0-.833h6.667a.417.417,0,1,1,0,.833Z"
          transform="translate(-1.5 -2.667)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_129" data-name="Path 129"
          d="M17.083,20.833H10.417a.417.417,0,1,1,0-.833h6.667a.417.417,0,1,1,0,.833Z"
          transform="translate(-1.5 -3.333)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_130" data-name="Path 130"
          d="M17.083,12.833H10.417a.417.417,0,1,1,0-.833h6.667a.417.417,0,1,1,0,.833Z" transform="translate(-1.5 -2)"
          fill="#919294" stroke="#919294" stroke-width="0.2"/>
    <path id="Path_131" data-name="Path 131" d="M17.083,8.833H10.417a.417.417,0,1,1,0-.833h6.667a.417.417,0,1,1,0,.833Z"
          transform="translate(-1.5 -1.333)" fill="#919294" stroke="#919294" stroke-width="0.2"/>
  </g>
</svg>

                      </span>
                      راهنمای استفاده
                    </div>
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="activate('Questions')"
                    >
                      <span class="mobile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.459" height="19.459"
                             viewBox="0 0 19.459 19.459">
  <g id="Group_8407" data-name="Group 8407" transform="translate(-1328 -976)">
    <g id="Question_10_" transform="translate(1328 976)">
      <g id="Group_8404" data-name="Group 8404" transform="translate(0)">
        <path id="Path_119" data-name="Path 119"
              d="M9.729,16a6.269,6.269,0,0,1-5.6-3.452,4.548,4.548,0,0,1,0-9.057,6.234,6.234,0,0,1,11.2,0,4.548,4.548,0,0,1,0,9.057A6.269,6.269,0,0,1,9.729,16Zm0-14.86a5.15,5.15,0,0,0-4.7,3.125L4.882,4.6l-.364.009A3.457,3.457,0,0,0,1.14,8.019,3.457,3.457,0,0,0,4.518,11.43l.364.009.145.334a5.124,5.124,0,0,0,9.4,0l.145-.334.364-.009a3.457,3.457,0,0,0,3.378-3.411,3.457,3.457,0,0,0-3.378-3.411L14.577,4.6l-.145-.334a5.15,5.15,0,0,0-4.7-3.125Z"
              transform="translate(0)" fill="#919294"/>
      </g>
      <g id="Group_8405" data-name="Group 8405" transform="translate(2.318 16.038)">
        <path id="Path_120" data-name="Path 120"
              d="M62.71,425.42a1.71,1.71,0,1,1,1.71-1.71A1.712,1.712,0,0,1,62.71,425.42Zm0-2.28a.57.57,0,1,0,.57.57A.571.571,0,0,0,62.71,423.14Z"
              transform="translate(-61 -422)" fill="#919294"/>
      </g>
    </g>
    <g id="Group_8406" data-name="Group 8406" transform="translate(13.658 65.641)">
      <path id="Path_124" data-name="Path 124"
            d="M235.98,363.324a.656.656,0,1,1-.656-.656A.656.656,0,0,1,235.98,363.324Zm0,0"
            transform="translate(1088.748 559.428)" fill="#919294"/>
      <path id="Path_125" data-name="Path 125"
            d="M168.12,92.384a.492.492,0,0,1-.492-.492V91.23a1.479,1.479,0,0,1,.985-1.392,2.035,2.035,0,0,0,1.311-1.718,1.8,1.8,0,1,0-3.608,0,.492.492,0,0,1-.984,0,2.788,2.788,0,1,1,5.576,0,3.019,3.019,0,0,1-1.967,2.646.492.492,0,0,0-.329.464v.662A.492.492,0,0,1,168.12,92.384Zm0,0"
            transform="translate(1155.952 828.236)" fill="#919294"/>
    </g>
  </g>
</svg>

                      </span>
                      سوالی دارید؟
                    </div>
                    <div data-bs-dismiss="offcanvas" class="sideBar-nav-item"
                         @click="logoutUser"
                    >
                      <span class="mobile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.065" height="16.617"
                             viewBox="0 0 17.065 16.617">
  <g id="Logout" transform="translate(0.6 0.6)">
    <path id="Stroke_1" data-name="Stroke 1"
          d="M10.2,3.848V3.071A3.071,3.071,0,0,0,7.132,0H3.07A3.071,3.071,0,0,0,0,3.071v9.275a3.071,3.071,0,0,0,3.07,3.071H7.141A3.062,3.062,0,0,0,10.2,12.355v-.786"
          transform="translate(0)" fill="none" stroke="#919294" stroke-linecap="round" stroke-linejoin="round"
          stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Stroke_3" data-name="Stroke 3" d="M10.034.5H0" transform="translate(5.83 7.208)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
    <path id="Stroke_5" data-name="Stroke 5" d="M0,0,2.44,2.429,0,4.859" transform="translate(13.424 5.279)" fill="none"
          stroke="#919294" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.2"/>
  </g>
</svg>

                      </span>
                      خروج
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="system-icon-description d-md-block d-none">پلتفرم پایش هوشمند مزرعه</div>
  </div>
</template>

<script>
export default {
  name: "SystemIcon",
  methods: {
    logoutUser() {
      this.$store.dispatch("logout", {self: this});
    },
    activate(el) {
      if (el === 'home') {
        this.$router.push({name: 'home'})
      } else if (el === 'meteorology') {
        this.$router.push({name: 'meteorology'})
      } else if (el === 'subscription') {
        this.$router.push({name: 'Subscription'})
      } else if (el === 'conversation') {
        this.$router.push({name: 'Conversation'})
      } else if (el === 'Store') {
        this.$router.push({name: 'Store'})
      } else if (el === 'Services') {
        this.$router.push({name: 'Services'})
      } else if (el === 'Articles') {
        this.$router.push({name: 'Articles'})
      } else if (el === 'UsageTips') {
        this.$router.push({name: 'UsageTips'})
      } else if (el === 'Questions') {
        this.$router.push({name: 'Questions'})
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/modules/UI/SystemIcon";
</style>