import useSWR from 'swr'
import TodoForm from './todoform'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Todos() {
  const { data, error } = useSWR('/api/todo-list', fetcher)
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
