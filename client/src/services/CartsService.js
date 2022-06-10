import Api from '@/services/Api'

export default {
  // index (cart) {
  //   return Api().get('carts', {
  //     params: cart
  //   })
  // },
  index (search) {
    return Api().get('carts', {
      params: {
        search: search
      }
    })
  },
  post (cart) {
    return Api().post('carts', cart)
  },
  show (cartId) {
    return Api().get(`carts/${cartId}`)
  },
  put (cart) {
    return Api().put(`carts/${cart.id}`, item)
  },
  delete (cartId) {
    return Api().delete(`carts/${cartId}`)
  }
}
