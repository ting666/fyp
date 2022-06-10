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
    grandTotal: null,
    contract:''
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
      const parsed1 = JSON.stringify(state.user.username)
      localStorage.setItem('cart', parsed)
      localStorage.setItem('user', parsed1)
    },
    getLocalStorage (state) {
      if (localStorage.getItem('user') == state.user.username)
        if (localStorage.getItem('cart')) {
          try {
            state.cart = JSON.parse(localStorage.getItem('cart'))
          } catch (error) {
            localStorage.removeItem('cart')
          }
        }
    },
    // getLocalStorageUser (state) {
    //     if (localStorage.getItem('user')) {
    //       try {
    //         state.user = JSON.parse(localStorage.getItem('user'))
    //       } catch (error) {
    //         localStorage.removeItem('cart')
    //       }
    //     }
    // },
    calcSubTotal (state) {
      if (state.cart.length === 1) {
        state.cart.forEach((item) => {
          state.subTotal = item.price * item.quantity
          console.log('able to calculate sub total')
          console.log(state.subTotal)
        })
      }
    },
    calcGrandTotal (state) {
      var deposit = 200
      state.grandTotal = state.subTotal + deposit
      state.deposit = deposit
    },
    setContract (state, address) {
      state.contract = address
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
