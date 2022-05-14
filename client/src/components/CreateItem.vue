<template>
    <v-app>
        <v-layout>
          <v-flex>
            <panel title="List Item">
              <v-text-field
                label="Name"
                :rules="[required]"
                v-model="item.name"
              ></v-text-field>

              <v-text-field
                label="Category"
                :rules="[required]"
                v-model="item.category"
              ></v-text-field>

              <v-text-field
                label="Price"
                :rules="[required]"
                v-model="item.price"
              ></v-text-field>

              <v-text-field
                label="Quantity"
                :rules="[required]"
                v-model="item.quantity"
              ></v-text-field>

              <v-text-field
                label="Item Image Url"
                :rules="[required]"
                v-model="item.itemImageUrl"
              ></v-text-field>

              <v-textarea
                label="Description"
                :rules="[required]"
                v-model="item.description"
              ></v-textarea>
            </panel>

            <div class="danger-alert" v-if="error">
              {{error}}
            </div>
            <br>
            <v-btn
              dark
              class="cyan"
              @click="create">
              Create Item
            </v-btn>
          </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import ItemsService from '@/services/ItemsService'

export default {
  data () {
    return {
      item: {
        name: null,
        category: null,
        price: null,
        quantity: null,
        itemImageUrl: null,
        description: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.item)
        .every(key => !!this.item[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      try {
        await ItemsService.post(this.item)
        this.$router.push({
          name: 'items'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
