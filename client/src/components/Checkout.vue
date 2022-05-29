<template>
  <v-app>
        <panel title="Rental Information">
            <v-simple-table>
                <template v-slot:default>
                <tr class="text-left">
                    <td>
                    Item Name:
                    </td>
                    <td>Item</td>
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
                    <td>Item</td>
                </tr>
                <tr class="text-left">
                    <td>
                    Contract Status:
                    </td>
                    <td>1</td>
                </tr>
                </template>
            </v-simple-table>
      </panel>
       

  </v-app>
</template>

<script>
import Web3 from 'web3'

export default {
methods:{
    async connectWallet () {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try {
                await window.ethereum.request({method: "eth_requestAccounts"})
                const web3 = new Web3(window.ethereum)
            } catch (err) {
                console.log(err.message)
            }
        }
        else {
            console.log("Plase install MetaMask")
        }
    }
}
   
}
</script>

<style>

</style>
