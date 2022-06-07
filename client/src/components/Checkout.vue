<template>
  <v-app>
        <panel title="Rental Information">
            <v-simple-table>
                <template v-slot:default>
                <tr class="text-left">
                    <td>
                    Item Name:
                    </td>
                    <td>{{item.name}}</td>
                </tr>
                <tr class="text-left">
                    <td>
                    Quantity
                    </td>
                    <td>1</td>
                </tr>
                <tr class="text-left">
                    <td>
                    Price:
                    </td>
                    <td>1</td>
                </tr>
                <tr class="text-left">
                    <td>
                    Owner:
                    </td>
                    <td>Test User 1</td>
                </tr>
                </template>
            </v-simple-table>
        </panel>

      <panel title="Smart Contract Function">
        
        <v-btn
        dark
        class="cyan"
        @click="connectWallet()">
        Connect to Wallet
        </v-btn>
        <br>

        <v-btn
        dark
        class="cyan"
        @click="confirmPayment()">
        Confirm Payment
        </v-btn>
        <br>
        <p>Only Renter can call this function</p>


        <v-btn
        dark
        class="cyan"
        @click="confirmReceived()">
        Confirm Receive Item
        </v-btn>
        <br>
        <p>Only Renter can call this function</p>

        <v-btn
        dark
        class="cyan"
        @click="abort()">
        Return/Refund
        </v-btn>
        <br>
        <p>Only Renter can call this function</p>
        
        <v-btn
        dark
        class="cyan"
        @click="itemReturned()">
        Item is Returned
        </v-btn>
        <p>Only Item Owner can call this function</p>
      </panel>

      <panel title="Smart Contract Details">
          <v-simple-table>
                <template v-slot:default>
                <tr class="text-left">
                    <td>
                    Connected Rental Wallet Address:
                    </td>
                    <td>{{walletAddress}}</td>
                </tr>
                <tr class="text-left">
                    <td>
                    Contract Status:
                    </td>
                    <td></td>
                </tr>
                </template>
            </v-simple-table>
      </panel>
       

  </v-app>
</template>

<script>
import PaymentService from '../services/PaymentService'

export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        walletAddress(){
            const paymentService = new PaymentService()
            try {
                const address = paymentService.getWalletAddress()
                return address
            } catch (err) {
                console.log(err)
            }
        }
    },
    methods:{
        async connectWallet() {
            const paymentService = new PaymentService()
            try {
                const contract = await paymentService.connectWallet()
            } catch (err) {
                console.log(err)
            }        
        },
        async itemReturned () {
        try {
            console.log(item.name)
            this.$router.push({
            name: 'create-review'
            })
        } catch (err) {
            console.log(err)
        }
        }
    }
}
</script>

<style>

</style>
