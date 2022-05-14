<template>
    <panel title="Recently Viewed Items">
        <v-data-table
            :headers="headers"
            :items="histories">
            <!-- <template slot="items" scope="props"> -->
            <!-- :options.sync="options" -->

            <template v-slot:items="props">
                <td class="text-xs-right">
                    {{props.item.name}}
                </td>
                <td class="text-xs-right">
                    {{props.item.price}}
                </td>
            </template>
        </v-data-table>
    </panel>
</template>

<script>
import {mapState} from 'vuex'
import ItemHistoryService from '@/services/ItemHistoryService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Item',
          value: 'name'
        },
        {
          text: 'Price',
          value: 'price'
        }
      ],
      // options: {
      //   // sortBy: 'date',
      //   // descending: true
      //   sortBy: 'date',
      //   sortDesc: true,

      // },
      histories: []
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
      this.histories = (await ItemHistoryService.index()).data
    }
  }
}
</script>

<style scoped>
</style>
