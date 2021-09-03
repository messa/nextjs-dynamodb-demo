import { getSession } from "next-auth/client"

async function handler(req, res) {
  const session = await getSession({ req })
  res.status(200).json({
    session,
  })
}

export default handler
