<template>
  <v-app>
    <v-layout v-if="cart.length == 1">
      <v-flex xs9>
        <panel title="Cart">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    Item
                  </th>
                  <th class="text-center">
                    Price
                  </th>
                  <th class="text-center">
                    Quantity
                  </th>
                  <th class="text-center">
                    Subtotal
                  </th>
                  <th class="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- <item-cart :item="item" v-for="(item, index) in cart"
                :key="index"/> -->
                <item-cart :item="item" />
              </tbody>
            </template>
          </v-simple-table>
        </panel>
      </v-flex>

      <v-flex xs6 class="ml-2">
        <cart-payment-summary />
      </v-flex>
    </v-layout>
    <v-layout v-if="cart.length <= 0">
      <v-flex xs12>
        <panel title="Cart">
        </panel>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import ItemCart from '@/components/ItemCart'
import CartPaymentSummary from '@/components/CartPaymentSummary'
import CartsService from '@/services/CartsService'
// import ItemsService from '@/services/ItemsService'
import {mapState} from 'vuex'

export default {
  // data () {
  //   return {
  //     item: {},
  //     items: null
  //   }
  // },
  props:[
    'item'
  ],
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.items = (await CartsService.index(value)).data
      }
    }
  },
  computed: {
    ...mapState([
      'cart',
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  methods: {
    // mounted () {
    // }
  },
  // async mounted () {
  //   // const itemId = this.$store.state.route.params.itemId
  //   const cartId = this.route.params.cartId
  //   this.item = (await CartsService.show(cartId)).data
  // },
  // async mounted () {
  //   // if (this.isUserLoggedIn) {
  //   //   this.item = (await CartsService.index()).data
  //   // }
  //   const itemId = this.route.params.itemId
  //   console.log(itemId)
  //   this.item = (await CartsService.show(itemId)).data
  // },
  components: {
    ItemCart,
    CartPaymentSummary
  }
}
</script>

<style>

</style>
