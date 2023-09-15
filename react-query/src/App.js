import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function sleep(duration) {
  return new Promise(r => {
    setTimeout(r, duration)
  })
}

const POSTS = [
  { id: '1', title: 'Post 1' },
  { id: '2', title: 'Post 2' }
]

function App() {

  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return sleep(1000).then(() => {
        return [...POSTS]
      })
    }
  })

  const newPostMutation = useMutation({
    mutationFn: (newPost) => sleep(1000).then(() => {
      POSTS.push(newPost)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <div>
      {postsQuery.data.map(({ id, title }) => {
        return (<div key={id}>{title}</div>)
      })}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate({ id: postsQuery.data.length + 1, title: 'New Post' })}
      >
        Add New Post
      </button>
    </div>
  );
}

export default App;
