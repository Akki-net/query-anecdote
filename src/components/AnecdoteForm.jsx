import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../services/requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnec))
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newObj = {
      content,
      id: (Math.floor(Math.random() * 100000)).toString(),
      votes: 0
    }
    addMutation.mutate(newObj)
    event.target.anecdote.value = ''
    console.log('new anecdote', newObj)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
