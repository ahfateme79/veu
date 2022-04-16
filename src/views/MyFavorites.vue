<template>
  <home-layout>
    <div class="container" v-if="loading">
      <ProgressPage/>
    </div>
    <div class="favorites" v-if="!loading">
      <header class="header text-right">علاقه مندی ها</header>
      <div v-if="products.length > 0">
        <div
            v-for="product in products"
            :key="product.id"
            class="d-flex flex-column flex-md-row justify-content-between favorite"
        >
          <div class="d-flex">
            <div class="image_wraper">
              <img
                  v-if="product.product.images.length > 0"
                  class="image"
                  :src="product.product.images[0].url"
                  alt=""
              />
              <img v-else class="image" src="../assets/avatar.png" alt=""/>
            </div>
            <div class="d-flex flex-column justify-content-around">
              <h3 class="name">{{ product.product.name }}</h3>
              <div class="d-flex align-items-center">
                <span class="price_txt">قیمت :</span>
                <span class="price mb-0">{{ product.product.price }}</span>
                <span class="price_unit">تومان</span>
              </div>
            </div>
          </div>
          <button
              class="align-self-end delete_btn"
              @click="showDeleteModal(product.product)"
          >
            <font-awesome-icon icon="trash" size="x"></font-awesome-icon>
            حذف
          </button>
        </div>
        <div
            class="modal fade"
            id="deleteModal"
            tabindex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div v-if="itemToDelete !== null" class="modal-body">
                <p>{{ `آیا آیتم ${itemToDelete.name} حذف شود؟` }}</p>
              </div>
              <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                  لغو
                </button>
                <button
                    @click="deleteFavorite"
                    type="button"
                    class="btn btn-primary"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else>آیتمی برای نمایش وجود ندارد</p>
    </div>
  </home-layout>
</template>

<script>
import HomeLayout from "../layout/HomeLayout.vue";
import Api from "../common/api";
import {mapMixin} from "../mixins/mapMixin";
import {globalMixin} from "../mixins/globalMixin";
import ProgressPage from "../components/UI/ProgressPage";
import {Modal} from "bootstrap";

export default {
  name: "MyFavorites",
  components: {HomeLayout, ProgressPage},
  inject: ["$axios"],
  mixins: [globalMixin, mapMixin],
  data() {
    return {
      products: [],
      itemToDelete: null,
    };
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.wishlistData();
  },
  methods: {
    wishlistData() {
      let self = this;
      Api.getWishlistApi({self: this})
          .then((response) => {
            if (response.status === 200) {
              let data = response.data;
              this.loading = false;
              this.products =
                  data !=null
                      ? data
                      : null;
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    deleteFavorite() {
      let self = this;
      Api.deleteWishlistApi({self: this, id: this.itemToDelete.id})
          .then((response) => {
            if (response.status === 200) {
              this.deleteModal.hide()
              this.wishlistData();
            }
          })
          .catch((error) => {
            self.handleError(self, error);
          });
    },
    showDeleteModal(product){
      this.itemToDelete=product
      this.deleteModal = new Modal(
          document.getElementById("deleteModal"),
          {}
      );
      this.deleteModal.show();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/modules/MyFavorites/MyFavorites";
</style>
