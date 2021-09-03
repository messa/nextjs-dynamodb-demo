import { getSession } from "next-auth/client"
import { createTodoItem, listTodoItems } from "../../lib/model"

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { code: 'method_not_allowed' } })
  }
  const session = await getSession({ req })
  if (!session) {
    return res.status(403).json({ error: { code: 'not_authenticated' } })
  }
  const userEmail = session.user.email
  if (!userEmail) {
    throw new Error('user e-mail missing')
  }
  const { body } = req.body
  if (!body) {
    return res.status(400).json({ error: { code: 'todo_item_body_missing' } })
  }
  await createTodoItem(userEmail, body)
  const todoItems = await listTodoItems(userEmail)
  res.status(200).json({
    todoItems,
  })
}

export default handler
