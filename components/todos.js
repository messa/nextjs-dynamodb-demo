import useSWR, { useSWRConfig } from 'swr'
import TodoForm from './todoform'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Todos() {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR('/api/todo-list', fetcher, { refreshInterval: 10 * 1000 })
  const todoItems = data && data.todoItems

  const onCreateTodoItemSubmit = async ({ body }) => {
    const res = await fetch('/api/todo-create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        body,
      })
    })
    const { todoItems } = await res.json()
    mutate('/api/todo-list', { todoItems }, false)
  }

  return (
    <div>
      <h2>Todos</h2>
      {todoItems && (
        <ul>
          {todoItems.map(todoItem => (
            <li key={todoItem.itemId}>
              {todoItem.body}
            </li>
          ))}
        </ul>
      )}
      <h2>Add new todo</h2>
      <TodoForm
        onSubmit={onCreateTodoItemSubmit}
      />
    </div>
  )
}

export default Todos
