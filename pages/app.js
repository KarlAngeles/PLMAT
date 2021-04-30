import { useState } from 'react'
import { getSession } from 'next-auth/client'
import Layout from '../components/layout'
import Link from 'next/link'

const App = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  return (
    <Layout>
      {questions}
    </Layout>
  )
}

//An advantage of this pattern is preventing a flash of unauthenticated content before redirecting. 
//It's important to note fetching user data in getServerSideProps will block rendering until the 
//request to your authentication provider resolves.
export async function getServerSideProps(context) {

  // need for next-auth
  const session = await getSession(context)

  // source: https://nextjs.org/docs/authentication 
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
  // just dummy data atm
  const questions = 'what is your name?'

  return {
    props: { 
      questions, 
      session 
    }
  }
}

export default App
