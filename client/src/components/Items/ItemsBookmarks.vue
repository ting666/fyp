<template>
    <panel title="Bookmarks">
        <v-data-table
            :headers="headers"
            :items="bookmarks">
            <!-- <template slot="items" scope="props"> -->
            <!-- :options.sync="options" -->

            <template v-slot:items="props">
                <td class="text-xs-right">
                    {{props.item.name}}
                </td>
                <td class="text-xs-right">
                    {{props.item.status}}
                </td>
            </template>
        </v-data-table>
    </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Item',
          value: 'name'
        },
        {
          text: 'Status',
          value: 'status'
        }
      ],
      // options: {
      //   // sortBy: 'date',
      //   // descending: true
      //   sortBy: 'date',
      //   sortDesc: true,

      // },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
  }
}
</script>

<style scoped>
</style>
