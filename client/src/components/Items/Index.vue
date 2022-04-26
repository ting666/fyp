<template>
    <v-app>
        <v-layout column>
            <v-flex xs6 class="pa-16">
              <items-search-panel />
              <items-panel class="mt-2" />
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import ItemsPanel from './ItemsPanel'
import ItemsSearchPanel from './ItemsSearchPanel'
import ItemsService from '@/services/ItemsService'

export default {
  components: {
    ItemsPanel,
    ItemsSearchPanel
  },
  data () {
    return {
      items: null
    }
  },
  async mounted () {
    this.items = (await ItemsService.index()).data
  }
}
</script>

<style scoped>
.item {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.item-name {
  font-size: 30px;
}

.item-category {
  font-size: 24px;
}

.item-price {
  font-size: 18px;
}

.item-image {
  width: 40%;
  margin: 0 auto;
}
</style>
