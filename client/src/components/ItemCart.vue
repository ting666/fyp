<template>
        <tr class="cartItem h-24 md:h24 sm:24 border-b border-solid border-gray-400 text-center font-medium">
        <td>
            <div>
                <img class="mx-auto my-auto" :src="item.itemImageUrl" width="50" height="50">
            </div>
            <div class="item-name mx-auto my-auto">
              {{item.name}}
            </div>
        </td>
        <td>{{item.price}} ETH</td>
        <td>
            <input class="outlined border rounded text-center"
            v-model="item.quantity" type="number" max="2" min="1"
            @input="Total">
        </td>
        <td>
          {{subTotal}} ETH
        </td>
        <td>
            <v-btn
            text
            color="error"
            @click="removeItem(item)">
            Delete
            </v-btn>
        </td>
        </tr>
</template>

<script>
import {mapState} from 'vuex'
// import CartsService from '@/services/CartsService'

export default {
  // props: {
  //   item: {
  //     type: Object,
  //     required: true
  //   }
  // },
  props: [
    'cart'
  ],
  computed: {
    subTotal () {
      return this.item.price * this.item.quantity
    },
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    removeItem (item) {
      this.$store.commit('removeCartItem', item)
      this.$store.commit('storeItem')
    },
    Total () {
      this.$store.commit('calcSubTotal')
      this.$store.commit('calcGrandTotal')
      this.$store.commit('storeItem')
      console.log(this.subTotal)
    }
  },
  // async mounted (value) {
  //   // if (this.isUserLoggedIn) {
  //   //   this.item = (await CartsService.index()).data
  //   // }
  //   this.items = (await ItemsService.index(value)).data
  // }
  async mounted () {
    try {
      const cartId = this.$store.state.route.params.cartId
      this.cart = (await ItemsService.show(cartId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
.cartItem {
  padding: 20px;
  height: 150px;
  overflow: hidden;
}
</style>
