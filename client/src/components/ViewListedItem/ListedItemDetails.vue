<template>
    <v-layout>
        <v-flex xs6>
          <img class="item-image" :src="item.itemImageUrl" />
        </v-flex>
        <v-layout>
          <v-flex class="mt-6">
          <div class="item-name">
            {{item.name}}
          </div>
          <div class="item-category">
            {{item.category}}
          </div>
          <div class="item-price">
            {{item.price}}
          </div>
          <div class="item-quantity">
            {{item.quantity}}
          </div>
          <textarea
            readonly
            v-model="item.description"
          ></textarea>
          <v-btn
            dark
            class="cyan"
            :to="{
              name: 'item-edit',
              params () {
                return {
                  itemId: item.id
                }
              }
            }">
            Edit
          </v-btn>

          <!-- <v-btn
          dark
          class="cyan"
          @click="del">
          Delete
          </v-btn> -->

          <v-btn
            dark
            class="cyan"
            :to="{
                name: 'listed-items'
            }">
            Back To Listed Item
          </v-btn>

          </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import ItemsService from '@/services/ItemsService'

export default {
  props: [
    'item'
  ],
  // data () {
  //   return {
  //     item: {}
  //   }
  // },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async item () {
      if (!this.isUserLoggedIn) {
        return
      }
    }
  },
  methods: {
    async del () {
      try {
        // await ItemsService.delete(itemId)
        // this.$router.push({
        //   name: 'listed-item'
        // })
        // const itemId = this.$store.state.route.params.itemId

        // await ItemsService.delete(this.item)
        // this.$router.push({
        //   name: 'listed-items',
        //   params: {
        //     itemId: item.id
        //   }
        // })
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
  font-size: 18px;
}

.item-price {
  font-size: 18px;
}

.item-quantity {
  font-size: 18px;
}

.item-image {
  width: 50%;
  margin: 0 auto;
}

textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 300px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
  text-align: justify;
}
</style>
