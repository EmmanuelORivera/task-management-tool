<script setup>
import tasksInfo from '~~/constants/tasksInfo'

const filterOption = ref('All')
const tasksLength = ref(0)
const router = useRouter()

const handleTasksLength = (newValue) => {
  tasksLength.value = newValue
}
</script>

<template>
  <div>
    <div class="d-flex flex-column align-center" style="gap: 1rem">
      <div class="d-flex justify-space-between w-100">
        <v-btn-toggle class="align-self-start" v-model="filterOption" mandatory>
          <v-btn size="40" icon color="deep-purple darken-3" value="All">
            <v-icon>mdi-list-status</v-icon>
          </v-btn>
          <v-btn
            size="40"
            icon
            :color="tasksInfo.completed.color"
            value="Complete"
          >
            <v-icon>mdi-playlist-check</v-icon>
          </v-btn>

          <v-btn size="40" icon :color="tasksInfo.todo.color" value="Todo">
            <v-icon>mdi-playlist-remove</v-icon>
          </v-btn>
        </v-btn-toggle>
        <pre>{{ filterOption }} ({{ tasksLength }})</pre>
      </div>
      <v-btn class="mb-4" @click="router.push({ path: `/task/create` })"
        >Create Task</v-btn
      >
      <pre v-if="tasksLength.value === 0">There is no tasks to show</pre>
    </div>

    <Task :filterOption="filterOption" @tasksLength="handleTasksLength"></Task>
  </div>
</template>
