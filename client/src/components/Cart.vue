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
import {mapState} from 'vuex'

export default {
  data () {
    return {
      item: {}
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
  async mounted () {
    const cartId = this.$store.state.route.params.cartId
    this.item = (await CartsService.show(cartId)).data
  },
  components: {
    ItemCart,
    CartPaymentSummary
  }
}
</script>

<style>

</style>
