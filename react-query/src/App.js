import { useQuery } from "@tanstack/react-query";

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

  const postsQuery = useQuery({
    queryKey: 'posts',
    queryFn: async () => {
      return sleep(1000).then(() => {
        return [...POSTS]
      })
    }
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <div>
      {postsQuery.data.map(({ id, title }) => {
        return (<div key={id}>{title}</div>)
      })}
    </div>
  );
}

export default App;
