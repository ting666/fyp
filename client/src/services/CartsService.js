import Api from '@/services/Api'

export default {
  index (cart) {
    return Api().get('carts', {
      params: cart
    })
  },
  post (cart) {
    return Api().post('carts', cart)
  },
  show (cartId) {
    return Api().get(`carts/${cartId}`)
  },
  delete (cartId) {
    return Api().delete(`carts/${cartId}`)
  }
}
