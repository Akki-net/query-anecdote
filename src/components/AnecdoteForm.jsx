import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../services/requests"
import { useNoteDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNoteDispatch()
  const addMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnec))
      dispatch({ type: 'ADD', payload: content })
    },
    onError: err => {
      dispatch({ type: 'ERR', payload: err.response.data.error })
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
    setTimeout(() => dispatch({ type: 'NULL' }), 3000)
    event.target.anecdote.value = ''
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
