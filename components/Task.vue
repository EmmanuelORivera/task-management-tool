<script setup>
import tasksInfo from '../constants/tasksInfo'

const props = defineProps({ filterOption: String })
const emits = defineEmits(['tasksLength'])
const router = useRouter()

const { data } = await useFetch(
  'https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks?token=asdf',
  {
    headers: {
      Authorization:
        'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd',
    },
  }
)
const taskToBeDeleted = ref(null)
const showDialog = ref(false)
const originalTasks = reactive(data)
const tasksCopy = ref(originalTasks.value)

const handleDeleteButton = (task) => {
  taskToBeDeleted.value = { id: task.id, title: task.title }
  showDialog.value = true
}

const handleChangeShowDialog = (e) => {
  showDialog.value = e.value
}

const removeTaskFromList = (id) => {
  tasksCopy.value = tasksCopy.value.filter((singleTask) => singleTask.id !== id)
  originalTasks.value = originalTasks.value.filter(
    (singleTask) => singleTask.id !== id
  )
}

const lengthShowedTasks = computed(() => {
  switch (props.filterOption) {
    case 'All':
      return originalTasks.value.length
    case 'Complete':
      return completedTasks.value.length
    case 'Todo':
      return todoTasks.value.length
  }
})

const completedTasks = computed(() => {
  return originalTasks.value.filter((singleTask) => singleTask.is_completed)
})
const todoTasks = computed(() => {
  return originalTasks.value.filter((singleTask) => !singleTask.is_completed)
})

const filteredTasks = () => {
  switch (props.filterOption) {
    case 'All':
      tasksCopy.value = originalTasks.value
      break
    case 'Complete':
      tasksCopy.value = completedTasks.value
      break
    case 'Todo':
      tasksCopy.value = todoTasks.value
      break
  }
}

const getStatus = (isCompleted) => {
  return isCompleted ? 'Completed' : 'Todo'
}
const getTaskColor = (isCompleted) => {
  if (isCompleted) return tasksInfo.completed.color
  return tasksInfo.todo.color
}

const fetchSingleTask = async (task, index) => {
  const { data } = await useFetch(
    `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${task.id}`,
    {
      headers: {
        Authorization:
          'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd',
      },
      params: {
        token: 'asdf',
      },
    }
  )

  await updateTask(data.value[0], index)
}

const updateTask = async (task, index) => {
  const params = {
    title: task.title,
    is_completed: !task.is_completed ? 1 : 0,
    due_date: task.due_date,
    comments: task.comments,
    description: task.description,
    tags: task.tags,
    token: task.token,
  }

  await useFetch(
    `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${task.id}`,
    {
      method: 'PUT',
      headers: {
        Authorization:
          'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd',
      },
      params,
    }
  )

  tasksCopy.value[index].is_completed = !tasksCopy.value[index].is_completed
  filteredTasks()
}

emits('tasksLength', lengthShowedTasks)
watch(
  () => props.filterOption,
  () => {
    filteredTasks()
  }
)
</script>
<template>
  <div>
    <ClientOnly>
      <TransitionGroup name="list">
        <v-alert
          v-for="(task, index) in tasksCopy"
          :key="task.id"
          border="start"
          :border-color="getTaskColor(task.is_completed)"
          class="mt-4 test"
        >
          <div class="d-flex align-center">
            <div>
              <v-alert-title class="text-subtitle-1 text-capitalize">
                <strong>Title:</strong> {{ task.title }}
              </v-alert-title>
              <p><strong> Due date: </strong>{{ task.due_date }}</p>
              <p>
                <strong> Status: </strong>{{ getStatus(task.is_completed) }}
              </p>
            </div>

            <v-spacer></v-spacer>
            <div>
              <v-btn
                size="35"
                class="mr-3"
                variant="outlined"
                icon
                color="error"
                @click="handleDeleteButton(task)"
                v-bind="props"
              >
                <v-icon>mdi-delete-alert</v-icon>
              </v-btn>
            </div>

            <v-btn
              size="35"
              class="mr-3"
              variant="outlined"
              icon
              color="deep-purple darken-3"
              @click="router.push({ path: `/task/${task.id}` })"
            >
              <v-icon>mdi-book-edit</v-icon>
            </v-btn>
            <v-btn
              size="35"
              variant="outlined"
              icon
              :color="getTaskColor(task.is_completed)"
              @click="fetchSingleTask(task, index)"
            >
              <v-icon v-if="task.is_completed">mdi-check-circle</v-icon>
            </v-btn>
          </div>
        </v-alert>
      </TransitionGroup>

      <Modal
        :test="showDialog"
        :task-to-be-deleted="taskToBeDeleted"
        @change-show-dialog="handleChangeShowDialog"
        @delete-task="removeTaskFromList"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
