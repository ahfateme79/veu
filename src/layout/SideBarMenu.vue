<template>
  <div dir="rtl" class="sideBarMenuLayout d-flex flex-column justify-content-between w-100">
    <div class="sideBar-nav-items">
      <div class="sideBar-nav-item"
           :class="{ active : active_el === 'home' }"
           @click="activate('home')"
      >
        <div class="d-flex">
          <div :class="active_el === 'home'?'LightHomeIcon':'homeIcon'"></div>
          <div class="p-1 pe-3 text-nowrap">خانه</div>
        </div>
      </div>
      <div class="sideBar-nav-item"
           :class="{ active : active_el === 'meteorology' }"
           @click="activate('meteorology')"
      >
        <div class="d-flex flex-row">
          <div :class="active_el === 'meteorology'?'LightMeteorologyIcon':'meteorologyIcon'"></div>
          <div class="p-1 pe-3 text-nowrap">هواشناسی</div>
        </div>
      </div>
      <div class="sideBar-nav-item"
           :class="{ active : active_el === 'Subscription' }"
           @click="activate('Subscription')"
      >
        <div class="d-flex flex-row">
          <div :class="active_el === 'Subscription'?'LightSubscriptionIcon':'SubscriptionIcon'"></div>
          <div class="p-1 pe-3 text-nowrap">اشتراک</div>
        </div>
      </div>
      <div class="sideBar-nav-item"
           :class="{ active : active_el === 'Conversation' }"
           @click="activate('conversation')"
      >
        <div class="d-flex flex-row">
          <div :class="active_el === 'Conversation'?'LightConversationIcon':'conversationIcon'"></div>
          <div class="p-1 pe-3 text-nowrap">گفتگو</div>
        </div>
      </div>
      <div class="sideBar-nav-item"
           :class="{ active : active_el === 'Store' }"
           @click="activate('Store')"
      >
        <div class="d-flex flex-row">
          <a href="jalizan/shop"/>
          <div :class="active_el === 'Store'?'LightStoreIcon':'StoreIcon'"></div>
          <div class="p-1 pe-3 text-nowrap">فروشگاه</div>
        </div>
      </div>
      <div class="sideBar-nav-item"
           :class="{ active : active_el === 'Services' }"
           @click="activate('Services')"
      >
        <div class="d-flex flex-row">
          <div :class="active_el === 'Services'?'LightStoreIcon':'StoreIcon'"></div>
          <div class="p-1 pe-3 text-nowrap">آگهی ها</div>
        </div>
      </div>
      <div class="sideBar-nav-item"
           :class="{ active : active_el === 'Articles' }"
           @click="activate('Articles')"
      >
        <div class="d-flex flex-row">
          <div :class="active_el === 'Articles'?'LightArticlesIcon':'ArticlesIcon'"></div>
          <div class="p-1 pe-3 text-nowrap">مجله جالیزان</div>
        </div>
      </div>
    </div>
    <div class="border-top sideBar-nav-items">
      <div class="sideBar-nav-item d-flex align-items-center"
           :class="{ active : active_el === 'UsageTips' }"
           @click="activate('UsageTips')"
      >
       <span>
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
        <span class="pe-3 text-nowrap">راهنمای استفاده</span>
      </div>
      <div class="sideBar-nav-item d-flex align-items-center"
           :class="{ active : active_el === 'Questions' }"
           @click="activate('Questions')"
      >
       <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="19.459" height="19.459" viewBox="0 0 19.459 19.459">
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
        <span class="pe-3 text-nowrap">  سوالی دارید؟</span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarMenu",
  data() {
    return {
      active_el: ''
    };
  },
  mounted() {
    this.active_el = this.$route.name
  },
  methods: {
    activate(el) {
      if (el === 'home') {
        this.active_el = el;
        this.$router.push({name: 'home'})
      } else if (el === 'meteorology') {
        this.active_el = el;
        this.$router.push({name: 'meteorology'})
      } else if (el === 'Subscription') {
        this.active_el = el;
        this.$router.push({name: 'Subscription'})
      } else if (el === 'conversation') {
        this.active_el = el;
        this.$router.push({name: 'Conversation'})
      } else if (el === 'Store') {
        this.active_el = el;
        window.open('https://jalizan.com/shop', '_blank');
      } else if (el === 'Services') {
        this.active_el = el;
        this.$router.push({name: 'Services'})
      } else if (el === 'Articles') {
        this.active_el = el;
        window.open('https://jalizan.com/mag', '_blank');
      } else if (el === 'UsageTips') {
        this.active_el = el;
        this.$router.push({name: 'UsageTips'})
      } else if (el === 'Questions') {
        this.active_el = el;
        this.$router.push({name: 'Questions'})
      }
    }
  },
}
</script>

<style lang="scss">
@import "src/styles/modules/Layout/SideBarMenu";
</style>