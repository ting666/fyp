import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Items from '@/components/Items/Index'
import CreateItem from '@/components/CreateItem'
import EditItem from '@/components/EditItem'
import ViewItem from '@/components/ViewItem/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
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
    }
  ]
})
