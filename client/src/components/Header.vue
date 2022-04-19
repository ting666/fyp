<template>
    <v-toolbar class="cyan" dark>
        <v-toolbar-title class="mr-4">
            <span
                class="home"
                @click="navigateTo({name: 'root'})">
                GoGo Rental
            </span>
        </v-toolbar-title>

        <!-- <v-toolbar-items>
            <v-btn outlined dark class="cyan">
                Browse
            </v-btn>
        </v-toolbar-items> -->

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                @click="navigateTo({name: 'login'})">
                Login
            </v-btn>

            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                outlined
                dark
                class="cyan"
                @click="navigateTo({name: 'register'})">
                Sign Up
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
