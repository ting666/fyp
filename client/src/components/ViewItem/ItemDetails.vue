<template>
    <v-layout>
        <v-flex xs6 class="mt-3">
          <img class="item-image" :src="item.itemImageUrl" />
        </v-flex>

        <v-layout>
          <v-flex class="mt-3">
          <div class="item-name">
            {{item.name}}
          </div>
          <!-- <div class="item-category">
            {{item.category}}
          </div> -->
          <div class="item-price">
            RM {{item.price}}
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
                @click="setup(item)">
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

          <!-- <v-btn
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
          </v-btn> -->
          </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
import DatePicker from './DatePicker'

export default {
  props: [
    'item'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'cart'
    ])
  },
  watch: {
    async item () {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const bookmarks = (await BookmarksService.index({
          itemId: this.item.id
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
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          itemId: this.item.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    },
    setup (item) {
      this.$store.commit('addToCart', item)
      this.$store.commit('storeItem')
      this.$router.push({
        name: 'item-cart'
      })
    }
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
  font-size: 30px;
}

.item-category {
  font-size: 18px;
}

.item-price {
  font-size: 20px;
}

.item-quantity {
  font-size: 18px;
}

.item-image {
  width: 50%;
  margin: 0 auto;
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
</style>
