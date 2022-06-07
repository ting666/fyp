import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Items from '@/components/Items/Index'
import CreateItem from '@/components/CreateItem'
import EditItem from '@/components/EditItem'
import ViewItem from '@/components/ViewItem/Index'
import Cart from '@/components/Cart'
import ListedItem from '@/components/ViewListedItem/ListedItem'
import ViewListedItem from '@/components/ViewListedItem/Index'
import Checkout from '@/components/Checkout'
import CreateReview from '@/components/CreateReview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/items',
      name: 'items',
      component: Items
    },
    {
      path: '/items/create',
      name: 'items-create',
      component: CreateItem
    },
    {
      path: '/items/:itemId',
      name: 'item',
      component: ViewItem
    },
    {
      path: '/items/:itemId/edit',
      name: 'item-edit',
      component: EditItem
    },
    {
      path: '/items/cart',
      name: 'item-cart',
      component: Cart
    },
    {
      path: '/listedItems',
      name: 'listed-items',
      component: ListedItem
    },
    {
      path: '/listedItems/:itemId',
      name: 'listed-item',
      component: ViewListedItem
    },
    {
      path: '/items/cart/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/reviews/create',
      name: 'create-review',
      component: CreateReview
    },
    {
      path: '*',
      redirect: 'items'
    }
  ]
})
