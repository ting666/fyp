<template>
    <v-app>
      <v-layout>
        <v-flex xs6 v-if="isUserLoggedIn">
          <items-bookmarks />
          <recently-viewed-items class="mt-2" />
        </v-flex>

        <v-flex :class="{
          xs12: !isUserLoggedIn,
          xs6: isUserLoggedIn
        }" class="ml-2">
          <items-search-panel />
          <items-panel class="mt-2" />
        </v-flex>
      </v-layout>
    </v-app>
</template>

<script>
import ItemsPanel from './ItemsPanel'
import ItemsBookmarks from './ItemsBookmarks'
import RecentlyViewedItems from './RecentlyViewedItems'
import ItemsSearchPanel from './ItemsSearchPanel'
import ItemsService from '@/services/ItemsService'
import {mapState} from 'vuex'

export default {
  components: {
    ItemsPanel,
    ItemsSearchPanel,
    ItemsBookmarks,
    RecentlyViewedItems
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
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
