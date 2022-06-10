<template>
    <v-toolbar class="cyan" dark>
        <v-toolbar-title class="mr-4">
            <router-link to="/items" custom v-slot="{ navigate }">
            <span class="home" @click="navigate" @keypress.enter="navigate" role="link">GoGo Rental</span>
                <!-- <span
                class="home"
                :to="{
                    name: 'root'
                }">
                GoGo Rental
                </span> -->
            </router-link>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn
                outlined
                dark
                class="cyan"
                :to="{
                    name: 'items'
                }">
                Browse
            </v-btn>

            <v-btn
                v-if="$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                :to="{
                    name: 'listed-items'
                }">
                My Listed Item
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                :to="{
                    name: 'login'
                }">
                Login
            </v-btn>

            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                :to="{
                    name: 'register'
                }">
                Sign Up
            </v-btn>

            <v-btn
                v-if="$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                :to="{
                    name: 'item-cart'
                }">
                Cart
                <span>({{cart.length}})</span>
            </v-btn>

            <v-btn
                v-if="$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                @click="logout">
                Log Out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import {mapState} from 'vuex'

export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'items'
      })
    }
  },
  computed: {
    ...mapState([
      'cart'
    ])
  },
  mounted () {
    //   if (localStorage.getItem('user') == this.$store.state.user.username) {
        this.$store.commit('getLocalStorage')
        console.log(this.$store.state.user.username)
        console.log(localStorage.getItem('user'))
      }
//   }
}
</script>

<style scoped>
.home {
    cursor: pointer;
}

.home:hover {
    color: #E9E;
}
</style>
