import { getSession } from "next-auth/client"
import { listTodoItems } from "../../lib/model"

async function handler(req, res) {
  try {

    const session = await getSession({ req })
    if (!session) {
      return res.status(403).json({ error: { code: 'not_authenticated' } })
    }

    const userEmail = session.user.email
    if (!userEmail) {
      throw new Error('user e-mail missing')
    }

    const todoItems = await listTodoItems(userEmail)

    return res.status(200).json({
      todoItems,
    })

  } catch (err) {
    console.error('Todo list failed:', err)
    return res.status(500).json({
      error: {
        code: 'internal_error',
        message: err.toString(),
      }
    })
  }
}

export default handler
