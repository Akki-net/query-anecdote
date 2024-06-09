import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { castVote, getAll } from './services/requests'
import { useNoteDispatch } from './NotificationContext'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
    refetchOnWindowFocus: false
  })
  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: castVote,
    onSuccess: updatedAnec => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
        anecdote.id === updatedAnec.id ? updatedAnec : anecdote))
    }
  })
  
  const dispatch = useNoteDispatch()

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes : anecdote.votes + 1
    }
    updateMutation.mutate(updatedAnecdote)
    dispatch({type: 'VOTE', payload: anecdote.content})
    setTimeout(() => dispatch({type: 'NULL'}), 3000)
  }

  let anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]


  if (result.isLoading)
    return <div>Data is Loading...</div>

  anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
