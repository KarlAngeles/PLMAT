import { useSession, getSession } from 'next-auth/client'
import Link from 'next/link'

const App = ({ questions }) => {
  return (
  
  )
}

export async function getServerSideProps(context) {

  // need for next-auth
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // request from express server optimized questions

  return {
    props: { questions, session }
  }
}

export default App
