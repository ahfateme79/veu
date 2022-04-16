<template>
  <home-layout>
    <template v-if="loading">
      <ProgressPage/>
    </template>
    <template v-else>
      <div class="articles">
        <div class="slides">
          <swiper
              :slides-per-view="'1.3'"
              :centeredSlides="true"
              :loop="true"
              :space-between="16"
              dir="ltr"
              :breakpoints="{
              '768': {
                slidesPerView: 2.3,
                spaceBetween: 50,
              },
            }"
              :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
              :pagination="{
              clickable: true,
            }"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
          >
            <swiper-slide v-for="slide in sliders" :key="slide.id">
              <div class="image_wraper">
                <a :href="`https://jalizan.com/${slide.slug}`" target="_blank">
                  <img class="image" :src="slide.img" :alt="slide.title"/>
                </a>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="categories">
          <h2 class="header">دسته بندی</h2>
          <div class="slider">
            <swiper
                :slides-per-view="3.6"
                :loop="false"
                :space-between="10"
                dir="ltr"
                :breakpoints="{
                '768': {
                  slidesPerView: 5.3,
                  spaceBetween: 24,
                },
                '930': {
                  slidesPerView: 6.3,
                  spaceBetween: 24,
                },
                '1024': {
                  slidesPerView: 7.3,
                  spaceBetween: 24,
                },
              }"
                @slideChange="swiperOnTouchStart"
            >
              <swiper-slide v-for="category in categories" :key="category.id">
                <div class="category_wraper">
                  <a
                      :href="`https://jalizan.com/category/${category.slug}`"
                      target="_blank"
                  >
                    <img class="image" :src="category.img" alt=""/>
                  </a>
                  <h3 class="name">
                    <a
                        :href="`https://jalizan.com/category/${category.slug}`"
                        target="_blank"
                        :title="category.title"
                        v-html="category.title"
                    >
                    </a>
                  </h3>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="lastArticle">
          <h2 class="header">آخرین مطالب</h2>
          <div class="row">
            <div class="col-6 col-md-4">
              <article class="article">
                <a
                    :href="`https://jalizan.com/${lastArticle.slug}`"
                    target="_blank"
                >
                  <img class="image" :src="lastArticle.img" alt=""/>
                </a>
                <div class="row title-date-wraper">
                  <h3 class="col-12 col-md-8 title">
                    <a
                        :href="`https://jalizan.com/${lastArticle.slug}`"
                        target="_blank"
                    >
                      {{ shortenTitle(lastArticle.title, 40) }}
                    </a>
                  </h3>
                  <h3
                      class="
                      col-12 col-md-4
                      d-flex
                      justify-content-end
                      d-md-block
                      date
                    "
                  >
                    {{ $filter.moment(lastArticle.date, "jYYYY/jM/jD") }}
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div class="popularArticles">
          <h2 class="header">محبوب ترین مطالب</h2>
          <div class="slider">
            <swiper
                :slides-per-view="1.9"
                :loop="true"
                :space-between="10"
                :breakpoints="{
                '768': {
                  slidesPerView: 3.3,
                  spaceBetween: 24,
                },
              }"
            >
              <swiper-slide
                  v-for="popularArticle in popularArticles"
                  :key="popularArticle.id"
              >
                <article class="article">
                  <a
                      :href="`https://jalizan.com/${popularArticle.slug}`"
                      target="_blank"
                  >
                    <img class="image" :src="popularArticle.img" alt=""/>
                  </a>
                  <div class="row title-date-wraper">
                    <h3 class="col-12 col-md-8 title">
                      <a
                          :href="`https://jalizan.com/${popularArticle.slug}`"
                          target="_blank"
                      >
                        {{ shortenTitle(popularArticle.title, 40) }}
                      </a>
                    </h3>
                    <h3
                        class="
                        col-12 col-md-4
                        d-flex
                        justify-content-end
                        d-md-block
                        date
                      "
                    >
                      {{ $filter.moment(popularArticle.date, "jYYYY/jM/jD") }}
                    </h3>
                  </div>
                </article>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="allArticles">
          <h2 class="header">همه مطالب</h2>
          <div class="row">
            <div
                v-for="article in allArticles"
                :key="article.id"
                class="col-6 col-md-4 mb-4"
            >
              <article class="article">
                <a
                    :href="`https://jalizan.com/${article.slug}`"
                    target="_blank"
                >
                  <img class="image" :src="article.img" alt=""/>
                </a>
                <div class="row title-date-wraper">
                  <h3 class="col-12 col-md-8 title">
                    <a
                        :href="`https://jalizan.com/${article.slug}`"
                        target="_blank"
                    >
                      {{ shortenTitle(article.title, 40) }}
                    </a>
                  </h3>
                  <h3
                      class="
                      col-12 col-md-4
                      d-flex
                      justify-content-end
                      d-md-block
                      date
                    "
                  >
                    {{ $filter.moment(article.date, "jYYYY/jM/jD") }}
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </template>
  </home-layout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout.vue";
import Api from "../common/api";
import {mapMixin} from "@/mixins/mapMixin";
import {globalMixin} from "@/mixins/globalMixin";
import {Swiper, SwiperSlide} from "swiper/vue";
import SwiperCore, {Autoplay, Lazy, Pagination} from "swiper";
import ProgressPage from "../components/UI/ProgressPage";

SwiperCore.use([Autoplay, Pagination, Lazy]);

export default {
  components: {HomeLayout, Swiper, SwiperSlide, ProgressPage},
  inject: ["$axios"],
  mixins: [globalMixin, mapMixin],
  name: "Articles",
  data() {
    return {
      sliders: [],
      categories: [],
      lastArticle: [],
      popularArticles: [],
      allArticles: [],
      articles_page: 1,
      categories_page: 1,
    };
  },
  created() {
    this.loading = true;
  },
  beforeMount() {
    this.daneshbanData();
  },
  mounted() {
    this.getNextArticles();
  },
  methods: {
    daneshbanData() {
      let self = this;
      Api.getDaneshbanApi({self: this})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.sliders =
                  data.sliders !== undefined && data.sliders !== null
                      ? data.sliders
                      : null;
              this.categories =
                  data.categories !== undefined && data.categories.data !== null
                      ? data.categories.data
                      : null;
              this.lastArticle =
                  data.lastArticle !== undefined && data.lastArticle !== null
                      ? data.lastArticle
                      : null;
              this.popularArticles =
                  data.popularArticles !== undefined &&
                  data.popularArticles !== null
                      ? data.popularArticles
                      : null;
              this.allArticles =
                  data.allArticles.data !== undefined &&
                  data.allArticles.data !== null
                      ? data.allArticles.data
                      : null;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    getNextArticles() {
      window.onscroll = () => {
        let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight ===
            document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          Api.getDaneshbanPostsApi({self: this, page: this.articles_page++})
              .then((response) => {
                if (response.status === 200) {
                  let data = response.data;
                  this.loading = false;
                  this.allArticles.push(...data.data);
                }
              })
              .catch((error) => {
                self.handleError(self, error);
              });
        }
      };
    },
    swiperOnTouchStart(swiper) {
      if (swiper.touches.diff > 0) {
        Api.getDaneshbanCategoriesApi({
          self: this,
          page: this.categories_page++,
        })
            .then((response) => {
              if (response.status === 200) {
                let data = response.data;
                this.loading = false;
                this.categories.push(...data.data);
              }
            })
            .catch((error) => {
              self.handleError(self, error);
            });
      }
    },
    shortenTitle(title, number) {
      return title.length > number ? `${title.slice(0, number)}...` : title;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/Article/Article";
</style>
<style>
.slides .swiper-wrapper {
  margin-bottom: 32px;
}

.slides .swiper-slide-active {
  transform: scale(1.1);
  height: 235.58px !important;
  transform: translateY(2px);
}

.slides .swiper-slide-prev,
.slides .swiper-slide-next {
  transform: scale(0.9);
  height: 208px !important;
  opacity: 0.6;
}

@media only screen and (max-width: 767px) {
  .slides .swiper-wrapper {
    margin-bottom: 40px;
  }

  .slides .swiper-slide-active {
    height: 160px !important;
  }

  .slides .swiper-slide-prev,
  .slides .swiper-slide-next {
    height: 160px !important;
  }
}
</style>
