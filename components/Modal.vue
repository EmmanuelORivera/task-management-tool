<script setup>
const props = defineProps(['test'])
const showDialog = ref(props.test)
const emits = defineEmits(['changeShowDialog'])

const closeModal = () => {
  showDialog.value = false
  emits('changeShowDialog', showDialog)
}

const deleteTask = () => {
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
      <v-card-title> Delete Task </v-card-title>
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
