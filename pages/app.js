import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '../components/layout'
import ButtonGroup from '../components/buttongroup'
import Question from '../components/question'
import Timer from '../components/timer'

const App = ({ content, time_records }) => {
  const [session, loading] = useSession()
  const [timeRecords, setTimeRecords] = useState(time_records.time_starts)
  const [currentExam, setCurrentExam] = useState(session.user.current_exam)
  const [answers, setAnswers] = useState({})
  const router = useRouter()

  const addToAnswers = (choice, index) => {
    const tempAnswers = answers
    tempAnswers[index] = choice
    setAnswers(tempAnswers)
    console.log(answers)
  }

  const submitHandler = async () => {
    try {

      if (currentExam + 1 >= content.length) {
        const res = await axios.post('http://localhost:3001/api/plmat/finished_exam', {
          data: { username: session.user.username },
        })
        console.log(res)
      }

      // sending with data works with POST but not GET
      const res = await axios.post('http://localhost:3001/api/plmat/check_questionnaire', {
        data: { 
          questionnaire: content[currentExam],
          username: session.user.username,
          answers: answers,
        },
      })

      // update time start for next exam
      await axios.post('http://localhost:3001/api/plmat/record_time/end', {
        data: { username: session.user.username, index: currentExam },
      })

      if (currentExam + 1 != content.length) {
        await axios.post('http://localhost:3001/api/plmat/record_time/start', {
          data: { username: session.user.username, index: currentExam + 1 },
        })
      }

      const timeRes = await axios.post('http://localhost:3001/api/plmat/record_time', {
        data: { username: session.user.username },
      })

      setTimeRecords(timeRes.data.time_starts)
      console.log(timeRecords)

    } catch (err) {
      console.log(err)
    }

    // need to reset time_records
    setAnswers({})
    window.scrollTo({top: 0, behavior: 'smooth'});
    setCurrentExam(currentExam + 1)
  }

  if (currentExam >= 5) {
    // change state and eligibility then reroute to home
    console.log('ineligible now')
    router.push("/", null, { shallow: false })
    return null
  }

  // after clicking the button save the initial time and on subsequent requests get the initial time and subtract to current time
  return (
    <Layout>
      <div class="flex flex-col h-full items-center bg-gray-100">
        <div class="w-1/2 my-12 flex flex-row">
          <div class="w-full p-6 border border-gray-300 border-r-0 bg-white rounded-l-lg shadow-md">
            <div class="flex flex-row items-center justify-between">
              <p class="flex-none font-custom text-xl font-semibold text-gray-800 w-1/3">Subject - {content[currentExam].subject}</p>
              <div class="flex-none flex justify-end w-1/3">
                <p class="flex-auto font-custom text-xl font-semibold text-gray-800">Remaining Time: </p>
                <div class="flex-none mx-2">
                  <Timer givenTime={content[currentExam].total_time} time_start={timeRecords[currentExam]} />
                </div>
              </div>
            </div>
          </div>
          <div onClick={submitHandler} class="w-1/4 flex justify-center items-center border border-gray-300 bg-black rounded-r-lg shadow-xl transition duration-500 ease-in-out transform hover:bg-yellow-500">
            <p class="font-custom text-xl font-semibold text-white">Submit Exam</p>
          </div>
        </div>
        {content[currentExam].questions.map((x, index) => 
          <Question content={x} addToAnswers={addToAnswers} index={index} />
        )}
        <button onClick={submitHandler} class="w-1/6 p-4 my-12 text-base font-custom font-bold text-white transition duration-500 ease-in-out border-black rounded-md bg-black transform hover:-translate-y-1 hover:scale-105 hover:bg-yellow-500 ">
          Submit Exam
        </button>
      </div>
    </Layout>
  )
}

//An advantage of this pattern is preventing a flash of unauthenticated content before redirecting. 
//It's important to note fetching user data in getServerSideProps will block rendering until the 
//request to your authentication provider resolves.
export async function getServerSideProps(context) {

  // need for next-auth
  const session = await getSession(context)
  let content

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

  if (session.user.has_taken_exam == true) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // Only make this request if user questionnaire object is empty
  if (session.user.questionnaire.length == 0) {
    const res = await axios.get('http://localhost:3001/api/plmat/get_questionnaire', {
      data: { username: session.user.username },
      headers: {
        Authorization: 'Bearer ' + session.user.accessToken
      }
    })

    content = res.data

    // Timer info
    const timeRes = await axios.post('http://localhost:3001/api/plmat/record_time/start', {
      data: { username: session.user.username, index: 0 },
    })

  } else {
    const res = await axios.get('http://localhost:3001/api/plmat/populate_questionnaire', {
      data: { questionnaires: session.user.questionnaire },
      headers: {
        Authorization: 'Bearer ' + session.user.accessToken
      }
    })
    
    content = res.data
  }


  const timeRes = await axios.post('http://localhost:3001/api/plmat/record_time', {
    data: { username: session.user.username },
  })

  const time_records = timeRes.data

  console.log('time record:')
  console.log(time_records)
  // Last questionnaire generated represents where they're currently
  return {
    props: { 
      content,
      time_records,
      session 
    }
  }
}

export default App
