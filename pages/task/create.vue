<script setup>
import tasksService from '../../services/Tasks'
const task = ref([
  {
    title: '',
    is_completed: 0,
    due_date: '',
    comments: '',
    description: '',
    tags: '',
    token: 'asdf',
  },
])

const serviceCallack = async () => {
  await tasksService.createTask(task)
}
</script>
<template>
  <h2 class="text-center mb-4">
    <v-icon color="deep-purple darken-3">mdi-receipt-text-plus-outline</v-icon>
    Create Task
  </h2>
  <Form :task="task" :serviceCallback="serviceCallack" />
</template>
