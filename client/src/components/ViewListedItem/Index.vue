<template>
  <v-app>
    <v-layout>
      <v-flex class="mt-2">
        <listed-item-details :item="item" />
      </v-flex>
    </v-layout>

  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import ItemsService from '@/services/ItemsService'
import ListedItemDetails from './ListedItemDetails'

export default {
  data () {
    return {
      item: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const itemId = this.route.params.itemId
    this.item = (await ItemsService.show(itemId)).data
  },
  components: {
    ListedItemDetails
  }
}
</script>

<style scoped>
</style>
