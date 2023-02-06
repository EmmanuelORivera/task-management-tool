<script setup>
import tasksService from '../services/Tasks'

const props = defineProps(['test', 'taskToBeDeleted'])
const showDialog = ref(props.test)
const emits = defineEmits(['changeShowDialog', 'deleteTask'])

const closeModal = () => {
  showDialog.value = false
  emits('changeShowDialog', showDialog)
}

const deleteTask = async () => {
  await tasksService.deleteTask(props.taskToBeDeleted.id)

  emits('deleteTask', props.taskToBeDeleted.id)
  closeModal()
}

watch(
  () => props.test,
  () => {
    showDialog.value = props.test
  }
)
</script>
<template>
  <v-overlay
    v-model="showDialog"
    @click:outside="closeModal"
    class="d-flex justify-center align-center"
  >
    <v-card class="pa-4">
      <v-card-title class="text-capitalize">
        Delete task: {{ props.taskToBeDeleted.title }}</v-card-title
      >
      <v-card-text class="text-subtitle-1 text-center"
        >This task will be permanently deleted.
      </v-card-text>
      <v-spacer></v-spacer>
      <v-btn color="green-darken-1" variant="text" @click="closeModal">
        Close
      </v-btn>
      <v-btn color="red-darken-1" @click="deleteTask"> Delete </v-btn>
    </v-card>
  </v-overlay>
</template>
