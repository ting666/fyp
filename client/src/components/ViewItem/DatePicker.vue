<template>
    <v-flex xs6>
        <v-text-field
        v-model="dateRangeText"
        label="Date range"
        prepend-icon="mdi-calendar"
        readonly
    ></v-text-field>
    <v-date-picker
        v-model="dates"
        color="cyan"
        range
        :min="new Date().toISOString().substr(0, 10)"
    ></v-date-picker>
    </v-flex>
</template>

<script>
export default {
  data: () => ({
    dates: []
  }),
  computed: {
    dateRangeText () {
      return this.dates.join(' - ')
    }
  }
}
</script>
