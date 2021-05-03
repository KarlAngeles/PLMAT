import { useState } from 'react'
import { getSession } from 'next-auth/client'
import Layout from '../components/layout'
import ButtonGroup from '../components/buttongroup'
import Question from '../components/question'
import Link from 'next/link'

const App = ({ content }) => {
  /*
   * {
   *  1: a
   *  2: b
   * }
  */
  const [answers, setAnswers] = useState({})
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1)

  const addToAnswers = (choice) => {
    const tempAnswers = answers
    tempAnswers[currentQuestionNumber] = choice
    setAnswers(tempAnswers)
    console.log(answers)
  }

  const singleContent = () => {
    return content.[currentQuestionNumber]
  }

  return (
    <Layout>
      <ButtonGroup setCurrentQuestionNumber={setCurrentQuestionNumber}/>
      <Question content={singleContent()} addToAnswers={addToAnswers}/>
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

  if (session.user.eligible == false) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  console.log(session)

  // request from express server optimized questions
  // dummy data
  const content = {
    1: {
      prompt: 'what is your name?',
      choice1: 'foo',
      choice2: 'bar',
      choice3: 'baz',
      choice4: 'qurt'
    },
    2: {
      prompt: 'what is your age?',
      choice1: '10',
      choice2: '12',
      choice3: '14',
      choice4: '16'
    },
    3: {
      prompt: 'what is your hair color?',
      choice1: 'black',
      choice2: 'blue',
      choice3: 'yellow',
      choice4: 'red'
    }
  }

  return {
    props: { 
      content, 
      session 
    }
  }
}

export default App
