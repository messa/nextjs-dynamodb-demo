import { signIn, signOut, useSession } from "next-auth/client"
import Layout from '../components/layout'

function IndexPage() {
  const [session, loading] = useSession()
  return (
    <Layout>
      <h1>Hello, World!</h1>

      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

    </Layout>
  )
}

export default IndexPage
