import { useState } from "react"

function TodoForm({ onSubmit }) {
  const [ bodyValue, setBodyValue ] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit({ body: bodyValue })
    setBodyValue('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Todo text'
        name='body'
        value={bodyValue}
        onChange={event => setBodyValue(event.target.value)}
        />
      <input
        type='submit'
        value='Create'
      />
    </form>
  )
}

export default TodoForm
