import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    cart: [],
    subTotal: null,
    deposit: null,
    grandTotal: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    addToCart (state, payload) {
      state.cart.unshift(payload)
    },
    removeCartItem (state, payload) {
      const index = state.cart.indexOf(payload)
      state.cart.splice(index, 1)
    },
    storeItem (state) {
      const parsed = JSON.stringify(state.cart)
      localStorage.setItem('cart', parsed)
    },
    getLocalStorage (state) {
      if (localStorage.getItem('cart')) {
        try {
          state.cart = JSON.parse(localStorage.getItem('cart'))
        } catch (error) {
          localStorage.removeItem('cart')
        }
      }
    },
    calcSubTotal (state) {
      if (state.cart.length === 1) {
        state.cart.forEach((item) => {
          state.subTotal = item.price * item.quantity
          console.log('able to calculate sub total')
          console.log(state.subTotal)
        })
      }
      // } else if (state.cart.length > 1) {
      // }
    },
    calcGrandTotal (state) {
      var deposit = 200
      state.grandTotal = state.subTotal + deposit
      state.deposit = deposit
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
