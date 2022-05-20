import Api from '@/services/Api'

export default {
  index (cartItem) {
    return Api().get('cartItems', {
      params: cartItem
    })
  },
  post (cartItem) {
    return Api().post('cartItems', cartItem)
  },
  delete (cartItemId) {
    return Api().delete(`cartItems/${cartItemId}`)
  }
}
