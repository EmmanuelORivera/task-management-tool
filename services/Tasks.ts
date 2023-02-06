const tasksService = {
  async createTask(task: any) {
    //TODO: Find a better way to do this
    const formData = {
      title: task.value[0].title,
      is_completed: task.value[0].is_completed,
      due_date: task.value[0].due_date,
      comments: task.value[0].comments,
      description: task.value[0].description,
      tags: task.value[0].tags,
      token: 'asdf',
    }

    const lastUrl = `title=${encodeURIComponent(
      formData.title
    )}&is_completed=${encodeURIComponent(
      formData.is_completed
    )}&due_date=${encodeURIComponent(
      formData.due_date
    )}&comments=${encodeURIComponent(
      formData.comments
    )}=&description=${encodeURIComponent(
      formData.description
    )}&tags=${encodeURIComponent(formData.tags)}&token${encodeURIComponent(
      formData.token
    )}`

    await useFetch(
      `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/${lastUrl}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd',
        },
        method: 'POST',
      }
    )
  },
  async fetchSingleTask(id: string) {
    const { data } = await useFetch(
      `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${id}`,
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
    return data
  },
  async updateSingleTask(id: string, task: any) {
    const params = {
      title: task.value[0].title,
      is_completed: task.value[0].is_completed,
      due_date: task.value[0].due_date,
      comments: task.value[0].comments,
      description: task.value[0].description,
      tags: task.value[0].tags,
      token: task.value[0].token,
    }
    await useFetch(
      `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization:
            'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd',
        },
        params,
      }
    )
  },
}
export default tasksService
