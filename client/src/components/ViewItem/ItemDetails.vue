<template>
    <v-layout>
        <v-flex xs6 class="mt-3 imageOwnerBox">
          <img class="item-image" :src="item.itemImageUrl" />
          <div class="space"></div>
          <div class="item-owner">
            Owner: {{item.owner}}
          </div>
        </v-flex>
        

        <v-layout>
          <v-flex class="mt-3 itemBox">
          <div class="item-name">
            {{item.name}}
          </div>
          <!-- <div class="item-category">
            {{item.category}}
          </div> -->
          <div class="item-price">
            {{item.price}} ETH
          </div>
          

          <v-layout>
            <date-picker />
            <v-flex xs6 class="mt-6">
              <div class="box"></div>
              <div> Quantity: 
              <input
                v-model="item.quantity" type="number" max="2" min="1"
              >
              </div>
              <br>
              <v-btn
                v-if="$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                @click="addToCart">
                Add To Cart
              </v-btn>
              <!-- @click="setup(item)"> -->

              <v-btn
                v-if="!$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                :to="{
                    name: 'login'
                }">
                Add To Cart
              </v-btn>
            </v-flex>
          </v-layout>

          <!-- <div class="item-quantity">
            {{item.quantity}}
          </div> -->
          <!-- <textarea
            readonly
            v-model="item.description"
          ></textarea> -->

          <v-btn
            v-if="isUserLoggedIn && !bookmark"
            dark
            class="cyan"
            @click="setAsBookmark">
            Set As Bookmark
          </v-btn>

          <v-btn
            v-if="isUserLoggedIn && bookmark"
            dark
            class="cyan"
            @click="unsetAsBookmark">
            Unset As Bookmark
          </v-btn>
          </v-flex>
        </v-layout>
        <!-- <v-layout>
      <div class="item-owner">
            Owner: {{item.owner}}
          </div>
    </v-layout> -->
    </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
import CartsService from '@/services/CartsService'
import DatePicker from './DatePicker'
import ItemsService from '../../services/ItemsService'

export default {
  props: [
    'item'
  ],
  data () {
    return {
      bookmark: null,
      cart: {
        // user: this.$store.state.user.username,
        // owner: item.owner,
        // name: item.name,
        // price: item.price,
        // quantity: item.quantity,
        // itemImageUrl: item.itemImageUrl,
        // state: 'PENDING'

        user: this.$store.state.user.username,
        owner: null,
        name: null,
        price: null,
        quantity: null,
        itemImageUrl: null,
        state: 'PENDING'
      }
      // bookmark: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
      // 'cart'
    ])
  },
  watch: {
    async item () {
      if (!this.isUserLoggedIn) {
        return
      }

      // try {
      //   const bookmarks = (await BookmarksService.index({
      //     itemId: this.item.id
      //   })).data
      //   if (bookmarks.length) {
      //     this.bookmark = bookmarks[0]
      //   }
      // } catch (err) {
      //   console.log(err)
      // }

      // const itemId = this.$store.state.route.params.itemId
      // try {
      //   const bookmarks = (await BookmarksService.index({
      //     itemId: this.item.id
      //     // itemId: itemId
      //   })).data
      //   if (bookmarks.length) {
      //     this.bookmark = bookmarks[0]
      //   }
      // } catch (err) {
      //   console.log(err)
      // }

      const itemId = this.$store.state.route.params.itemId
      // this.item = (await ItemsService.show(itemId)).data
       try {
        const bookmarks = (await BookmarksService.index({
          itemId: itemId,
          userId: this.$store.state.user.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async addToCart() {
      try {
        await CartsService.post(this.cart)
        this.$router.push({
          name: 'item-cart'
        }) 
        } catch (err) {
          console.log(err)
      }
    },
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          itemId: this.item.id,
          // userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }

      // const itemId = this.$store.state.route.params.itemId
      //   try {
      //     // const itemId = this.route.params.itemId
      //     this.bookmark = (await BookmarksService.post({
      //       itemId: itemId
      //     })).data
      //   } catch (err) {
      //     console.log(err)
      //   }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }

      // try {
      //   await BookmarksService.delete(id)
      // } catch (err) {
      //   console.log(err)
      // }
    },
    async setup (item) {
      if (this.$store.state.cart.length === 0) {
        console.log(localStorage.getItem('user'))
        console.log(this.$store.state.user.username)
        this.$store.commit('addToCart', item)
        this.$store.commit('storeItem')
        this.$router.push({
          name: 'item-cart'
        })

        // try {
        //   // this.cart = (await CartsService.post({
        //   //   itemId: this.item.id
        //   // })).data
        //   await CartsService.post(this.item.id)
        //   this.$router.push({
        //     name: 'item-cart'
        //   })
        // } catch (err) {
        //   console.log(err)
        // }

        // const itemId = this.$store.state.route.params.itemId
        // try {
        //   // const itemId = this.route.params.itemId
        //   await CartsService.post({
        //     itemId: itemId
        //   })
        //   this.$router.push({
        //     name: 'item-cart'
        //     // params: {
        //     //     itemId: item.id
        //     //   }
        //   })
        // } catch (err) {
        //   console.log(err)
        // }
      } else {
        alert('You can only checkout one item per order. Please add this item to your WishList to order again later, or remove the current item in your cart.')
      }
    }
    // async mounted () {
    //   const itemId = this.$store.state.route.params.itemId
    //   this.item = (await ItemsService.show(itemId)).data
    //    try {
    //     this.bookmark = (await BookmarksService.index({
    //       itemId: this.item.id,
    //       userId: this.$store.state.user.id
    //     })).data
    //     if (bookmarks.length) {
    //       this.bookmark = bookmarks[0]
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  },
  components: {
    DatePicker
  }
}
</script>

<style scoped>
.item {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.item-name {
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
}

.item-category {
  font-size: 18px;
}

.item-price {
  font-size: 25px;
  color: #00BCD4;
  background-color: #FAFAFA;
  margin-bottom: 60px;
  margin-top: 30px;
}

.item-owner {
  font-size: 20px;
  text-align: center;
  margin: 20px;
  color: gray;
  font-style: oblique;
}

.item-quantity {
  font-size: 18px;
}

.item-image {
  width: 60%;
  margin: 0 auto;
}

.imageOwnerBox {
  border: lightgray solid;
  border-radius: 25px;
  padding: 20px;
  margin-right: 5px;
}

textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 300px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
  text-align: justify;
}

input {
  border: 2px solid #ddd;
  width: 4rem;
  text-align: center;
  padding: 0 .5rem;
}

.box {
  height: 300px;
}

.itemBox {
  border: lightgray solid;
  border-radius: 25px;
  padding: 15px;
}

.space {
  height: 100px;
}
</style>
