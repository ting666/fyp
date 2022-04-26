import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('items', {
      params: {
        search: search
      }
    })
  },
  show (itemId) {
    return Api().get(`items/${itemId}`)
  },
  post (item) {
    return Api().post('items', item)
  },
  put (item) {
    return Api().put(`items/${item.id}`, item)
  }
}
