<template>
    <v-app>
        <panel title="My Listed Item">
            <v-btn
                slot="action"
                :to="{
                    name: 'items-create'
                }"
                class="cyan accent-2"
                light
                medium
                absolute
                right
                middle
                fab>
                <v-icon>add</v-icon>
            </v-btn>

            <div v-for="item in items"
                :key="item.id">

              <div class="item" v-if="item.owner == $store.state.user.username">

                <v-layout>
                <v-flex xs6>
                    <div class="item-name">
                    {{item.name}}
                    </div>
                    <div class="item-category">
                    {{item.category}}
                    </div>
                    <div class="item-price">
                    RM {{item.price}}
                    </div>

                    <v-btn
                    dark
                    class="cyan"
                    :to="{
                      name: 'listed-item',
                      params: {
                        itemId: item.id
                      }
                    }">
                    View
                    </v-btn>

                    <v-btn
                    dark
                    class="cyan"
                    @click="del(item.id)">
                    Delete
                    </v-btn>
                </v-flex>

                <v-flex xs6>
                    <img class="item-image" :src="item.itemImageUrl" />
                </v-flex>
                </v-layout>
              </div>
            </div>
        </panel>
    </v-app>
</template>

<script>
import ItemsService from '@/services/ItemsService'

export default {
  data () {
    return {
      items: null,
      item: {}
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.items = (await ItemsService.index(value)).data
      }
    }
  },
  methods: {
    //   async del () {
    //   try {
    //     // await ItemsService.delete(itemId)
    //     // this.$router.push({
    //     //   name: 'listed-item'
    //     // })
    //     const itemId = this.$store.state.route.params.itemId

    //     await ItemsService.delete(this.item)
    //     this.$router.push({
    //       name: 'listed-items',
    //       params: {
    //         itemId: itemId
    //       }
    //     })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    refreshList () {
      this.handler()
    },
    // del (id) {
    //   // this.items.splice(item.id, 1)
    //   ItemsService.delete(id)
    //     .then(() => {
    //       this.refreshList()
    //     })
    //     .catch((e) => {
    //       console.log(e)
    //     })
    // }

    async del (id) {
      try {
        await ItemsService.delete(id)
        this.refreshList()
      } catch (err) {
        console.log(err)
      }
    }
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
