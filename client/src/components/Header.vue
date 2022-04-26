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
                @click="logout">
                Log Out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
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
