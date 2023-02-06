<script setup>
import tasksService from '../../services/Tasks'
const route = useRoute()

const data = await tasksService.fetchSingleTask(route.params.id)
const task = reactive(data)

const serviceCallback = async () => {
  await tasksService.updateSingleTask(route.params.id, task)
}
</script>
<template>
  <div>
    <h2 class="text-center">
      <v-icon color="deep-purple darken-3">mdi-book-edit</v-icon>
      Edit Task
      <Form :task="task" :serviceCallback="serviceCallback" />
    </h2>
  </div>
</template>

<style scoped>
.inputs {
  width: 100%;
}
</style>
