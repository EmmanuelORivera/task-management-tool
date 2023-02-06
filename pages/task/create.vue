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

console.log(task.value[0])
const serviceCallack = async () => {
  await tasksService.createTask(task)
}
</script>
<template>
  <Form :task="task" :serviceCallback="serviceCallack" />
</template>
