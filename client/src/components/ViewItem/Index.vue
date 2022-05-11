<template>
  <v-app>
    <v-layout>
      <v-flex class="mt-2">
        <item-details :item="item" />
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex class="ml-2 mt-2">
        <further-description :description="item.description" />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import ItemDetails from './ItemDetails'
import FurtherDescription from './FurtherDescription'
import ItemsService from '@/services/ItemsService'
import ItemHistoryService from '@/services/ItemHistoryService'

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

    if (this.isUserLoggedIn) {
      ItemHistoryService.post({
        itemId: itemId
      })
    }
  },
  components: {
    ItemDetails,
    FurtherDescription
  }
}
</script>

<style scoped>
</style>
