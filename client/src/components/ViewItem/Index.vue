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
import ItemDetails from './ItemDetails'
import FurtherDescription from './FurtherDescription'
import ItemsService from '@/services/ItemsService'

export default {
  data () {
    return {
      item: {}
    }
  },
  async mounted () {
    const itemId = this.$store.state.route.params.itemId
    this.item = (await ItemsService.show(itemId)).data
  },
  components: {
    ItemDetails,
    FurtherDescription
  }
}
</script>

<style scoped>
</style>
