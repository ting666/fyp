<template>
    <v-app>
        <panel>
            <v-simple-table>
                <template v-slot:default>
                <tr class="text-left">
                    <td>
                      Subtotal
                    </td>
                    <td>RM {{subTotal}}</td>
                </tr>
                <tr class="text-left">
                    <td>
                    Deposit
                    </td>
                    <td>RM {{Deposit}}</td>
                </tr>
                <tr class="text-left">
                    <td>
                    <strong>
                        Total
                    </strong>
                    </td>
                    <td>
                    <strong>
                        RM {{grandTotal.toFixed(2)}}
                    </strong>
                    </td>
                </tr>
                </template>
            </v-simple-table>
            <br>
                <v-btn
                dark
                class="cyan"
                :to="{
                  name: 'checkout'
                }">
                Proceed to checkout
                </v-btn>
        </panel>
    </v-app>
</template>

<script>

export default {
  computed: {
    subTotal () {
      return this.$store.state.subTotal
    },
    Deposit () {
      return this.$store.state.deposit
    },
    grandTotal () {
      return this.$store.state.grandTotal
    }
  },
  methods: {
    mounted () {
      this.$store.commit('calcSubTotal')
      this.$store.commit('calcGrandTotal')
    }
  }
}
</script>

<style>

</style>
