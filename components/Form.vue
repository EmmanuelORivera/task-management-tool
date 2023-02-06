<script setup>
const { task, serviceCallback } = defineProps(['task', 'serviceCallback'])

const titleRules = reactive([
  (value) => {
    if (value) return true
    return 'Title is required.'
  },
])

const submit = async () => {
  await serviceCallback()
  alert('Submit was successful')
}
</script>
<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="task[0].title"
      :rules="titleRules"
      label="Title"
    ></v-text-field>

    <v-text-field v-model="task[0].comments" label="Comments"></v-text-field>
    <v-text-field
      v-model="task[0].description"
      label="Description"
    ></v-text-field>
    <v-text-field v-model="task[0].tags" label="Tags"></v-text-field>

    <v-checkbox
      v-model="task[0].is_completed"
      :true-value="Number(1)"
      :false-value="Number(0)"
      :label="`Status: ${task[0].is_completed ? 'Completed' : 'Todo'}`"
      type="checkbox"
    ></v-checkbox>

    <v-row>
      <v-col cols="12">
        <input
          class="mr-4 v-btn v-btn--elevated v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-elevated"
          type="date"
          v-model="task[0].due_date"
        />

        <v-btn class="ma-0" type="submit">Submit</v-btn>
      </v-col>
    </v-row>
  </form>
</template>
