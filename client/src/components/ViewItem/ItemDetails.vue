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
          <div class="item-status">
            {{item.status}}
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

          </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>

export default {
  props: [
    'item'
  ]
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

.item-status {
  font-size: 18px;
  color: green;
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
