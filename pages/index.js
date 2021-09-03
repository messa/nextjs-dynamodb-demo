import { signIn, signOut, useSession } from "next-auth/client"
import Layout from '../components/layout'
import Todos from '../components/todos'

function IndexPage() {
  const [session, loading ] = useSession()
  return (
    <Layout>
      <h1>Hello, World!</h1>

      {!session && (
        <p>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </p>
      )}

      {session && (
        <p>
          Signed in as <b>{session.user.email}</b><br />
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      )}

      {session && (
        <Todos />
      )}

    </Layout>
  )
}

export default IndexPage
