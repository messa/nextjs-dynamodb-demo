import { getSession } from "next-auth/client"
import { listTodoItems } from "../../lib/model"

async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(403).json({ error: { code: 'not_authenticated' } })
  }
  const userEmail = session.user.email
  if (!userEmail) {
    throw new Error('user e-mail missing')
  }
  const todoItems = await listTodoItems(userEmail)

  res.status(200).json({
    todoItems,
  })
}

export default handler
