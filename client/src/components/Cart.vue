<template>
  <v-app>
    <v-layout v-if="cart.length == 1">
          <!-- <v-data-table
              :headers="headers"
              :items="cartItems">

              <template>
                  <td class="text-xs-right">
                      <item-cart />
                  </td>
              </template>
          </v-data-table> -->
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
                <item-cart :item="item" v-for="(item, index) in cart"
                :key="index"/>
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
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState([
      'cart'
    ])
  },
  methods: {
    mounted () {
    }
  },
  components: {
    ItemCart,
    CartPaymentSummary
  }
}
</script>

<style>

</style>
