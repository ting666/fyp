<template>
    <v-layout>
        <v-flex xs6>
          <img class="item-image" :src="item.itemImageUrl" />
        </v-flex>

        <v-layout>
          <v-flex class="mt-6 itemBox">
          <div class="item-name">
            Name: {{item.name}}
          </div>
          <div class="item-category">
            Category: {{item.category}}
          </div>
          <div class="item-price">
            Price: RM {{item.price}}
          </div>
          <div class="item-quantity">
            Quantity: {{item.quantity}}
          </div>
          <div class="item-owner">
            Owner: {{item.owner}}
          </div>
          <div class="item-description">
            Description: {{item.description}}
          </div>
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
  text-align: left;
  font-size: 18px;
}

.item-category {
  text-align: left;
  font-size: 18px;
}

.item-price {
  text-align: left;
  font-size: 18px;
}

.item-quantity {
  text-align: left;
  font-size: 18px;
}

.item-owner {
  text-align: left;
  font-size: 18px;
}

.item-description {
  text-align: left;
  font-size: 18px;
  margin-bottom: 50px;
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

.itemBox {
  border: lightgray solid;
  border-radius: 25px;
  padding: 15px;
}
</style>
