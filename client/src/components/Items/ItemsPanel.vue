<template>
    <v-app>
        <panel title="Items">
            <div v-for="item in items"
                class="item"
                :key="item.id">

                <v-layout>
                <v-flex xs6>
                    <div class="item-name">
                    {{item.name}}
                    </div>
                    <div class="item-category">
                    {{item.category}}
                    </div>
                    <div class="item-price">
                    RM {{item.price}}
                    </div>

                    <v-btn
                    dark
                    class="cyan"
                    :to="{
                      name: 'item',
                      params: {
                        itemId: item.id
                      }
                    }">
                    View
                    </v-btn>

                    <v-btn
                      v-if="$store.state.isUserLoggedIn"
                      outlined
                      dark
                      class="cyan"
                      @click="setup(item)">
                      Add To Cart
                    </v-btn>     
                </v-flex>

                <v-flex xs6>
                    <img class="item-image" :src="item.itemImageUrl" />
                </v-flex>
                </v-layout>
            </div>
        </panel>
    </v-app>
</template>

<script>
import ItemsService from '@/services/ItemsService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      items: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.items = (await ItemsService.index(value)).data
      }
    }
  },
  computed: {
    ...mapState([
      'cart'
    ])
  },
  methods: {
    setup (item) {
      if (this.$store.state.cart.length === 0) {
        this.$store.commit('addToCart', item)
        this.$store.commit('storeItem')
        this.$router.push({
          name: 'item-cart'
        })
      } else {
        alert('You can only checkout one item per order. Please add this item to your WishList to order again later, or remove the current item in your cart.')
      }
    }
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
  font-size: 24px;
}

.item-price {
  font-size: 18px;
}

.item-image {
  width: 40%;
  margin: 0 auto;
}

</style>
