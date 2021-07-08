import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { signOut, useSession, getSession } from 'next-auth/client'

export default function Home({ session }) {
  //const [session, loading] = useSession();
  const router = useRouter()

  // prevents flash of unwanted content
  //if (typeof window !== 'undefined' && loading) return null
  //
  
  return (
    <Layout>
      <div class="w-full h-screen bg-white">

        <div class="w-full text-gray-700 transition duration-500 ease-in-out transform bg-white border">
          <div class="flex justify-between flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row">
            <a href="/" class="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
              <div class="inline-flex items-center">
                <img class="w-10 h-10" src="/plm_logo.png" />
                <h2 class="block p-2 text-xl text-gray-800 font-bold font-custom tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-yellow-500 lg:text-x lg:mr-8"> 
                  Pamantasan ng Lungsod ng Maynila
                </h2>
              </div>
            </a>
            <div class="flex flex-row items-center">
              <p class="font-custom text-black font-semibold text-lg tracking-tight mr-4">{session.user.name}</p>
              <button onClick={signOut} class="block p-2 mr-4 text-base text-gray-500 transition duration-500 ease-in-out transform rounded-full focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 lg:ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row h-full justify-around">

          <div class="flex flex-col justify-center items-center w-1/2 h-full">
            <h1 class="text-3xl 2xl:text-5xl xl:text-4xl font-bold text-black font-custom tracking-tighter text-center">
              Welcome to the Official PLMAT Website!
            </h1>
            <p class="py-8 pb-16 text-2xl text-black font-custom tracking-tighter">
              The PLM Admission Test is now fully online!
            </p>
            <div class="w-1/4">
              <img src="/first.png" alt="" class="object-contain md:object-cover" />
            </div>
          </div>

          <div class="w-1/2">
            <img src="/welcome.png" alt="" class="object-contain md:object-cover" />
          </div>

        </div>

      </div>

      <div class="w-full h-screen bg-red-100">
        <div class="flex justify-around">

          <div class="flex justify-center items-center w-1/2 h-screen">
            <img src="/plan.png" alt="" class="w-full object-contain md:object-cover" />
          </div>

          <div class="flex flex-col justify-center items-center w-1/2 h-screen">
            <h1 class="text-5xl font-bold text-black font-custom tracking-tighter">
              You'll take the exam is this order:
            </h1>
            <div class="pt-16 w-1/3">
              <img src="/subject.png" alt="" class="object-contain md:object-cover" />
            </div>
          </div>

        </div>
      </div>

      <div class="w-full h-screen bg-purple-200">
        <div class="flex justify-around">

          <div class="flex flex-col justify-center items-center w-1/2 h-screen">

            <div class="flex flex-col justify-center items-center w-3/4 text-center">

              <h1 class="text-5xl mt-18 pb-8 font-bold text-black font-custom tracking-tighter">
                What you need to know!
              </h1>

              <p class="py-8 text-3xl font-semibold break-words text-black font-custom tracking-tighter">
                All exam questions are multiple choice and there
                will be a time limit for each subject.
              </p>

              <p class="py-8 text-3xl font-semibold break-words text-black font-custom tracking-tighter">
                As soon as the timer runs out, your responses will
                be submitted automatically.
              </p>

              <p class="py-8 text-3xl font-semibold break-words text-black font-custom tracking-tighter">
                Once you've submitted your answers, you will not be
                able to revisit earlier responses.
              </p>

              <p class="py-8 text-3xl font-semibold break-words text-black font-custom tracking-tighter">
                After completing the PLMAT once, you will not be 
                able to take it again.
              </p>
            </div>

          </div>

          <div class="flex flex-col justify-center items-center w-1/2 h-screen">
            <img src="/vision.png" alt="" class="object-contain md:object-cover" />
          </div>

        </div>
      </div>

        <div class="w-full h-screen bg-white">
          <div class="flex justify-around">

            <div class="flex flex-col justify-center items-center w-1/2">
              <h1 class="text-7xl font-bold text-black font-custom tracking-tighter">
                You can do it!
              </h1>
              <p class="py-8 pb-32 text-3xl text-black font-custom tracking-tighter">
                Hope to see you be a part of the PLM family.
              </p>
              { !session.user.has_taken_exam &&
                <button onClick={() => router.push("/app")} class="w-1/3 px-16 py-2 my-2 text-base font-custom font-medium text-white transition duration-500 ease-in-out border-black rounded-md bg-black transform hover:-translate-y-1 hover:scale-105 hover:bg-red-200 "> 
                  Take the Exam 
                </button>
              }
            </div>

            <div class="flex flex-col justify-center items-center w-1/2 h-screen">
              <img src="/deal.png" alt="" class="object-contain md:object-cover" />
            </div>

          </div>
        </div>

      <div class="w-full items-center">
          <footer class="w-full text-black transition duration-500 ease-in-out transform bg-white border rounded-lg font-custom">
            <div class="container flex flex-col flex-wrap p-8 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap ">
              <div class="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
                <a href="/" class="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
                  <div class="inline-flex items-center">
                  <div class="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-600" />
                  <h2 class="text-sm font-bold font-custom tracking-tighter text-black uppercase duration-500 ease-in-out transform transition hover:text-yellow-500 dark:text-gray-400"> Pamantasan ng Lungsod ng Maynila </h2>
                  </div>
                </a>
              </div>
              <div class="flex flex-wrap flex-grow mt-8 -mb-10 text-left md:pl-20 md:mt-0 ">
                <div class="w-full px-4 lg:w-1/3 md:w-1/2">
                  <h1 class="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font"> Quicklinks </h1>
                  <nav class="mb-10 space-y-4 list-none">
                    <li>
                      <a href="https://plm.edu.ph/about" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">About</a>
                    </li>
                    <li>
                      <a href="https://plm.edu.ph/about/contact" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Contact Us</a>
                    </li>
                    <li>
                      <a href="https://plm.edu.ph/admissions" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Admissions</a>
                    </li>
                    <li>
                      <a href="https://plm.edu.ph/academics" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Academics</a>
                    </li>
                  </nav>
                </div>
                <div class="w-full px-4 lg:w-1/3 md:w-1/2">
                  <nav class="mt-12 mb-10 space-y-4 list-none">
                    <li>
                      <a href="https://plm.edu.ph/admissions/scholarships" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Scholarships</a>
                    </li>
                    <li>
                      <a href="https://plm.edu.ph/academics/academic-calendar" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Academic Calendar</a>
                    </li>
                    <li>
                      <a href="https://plm.edu.ph/careers-hrdo" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Careers</a>
                    </li>
                    <li>
                      <a href="https://archive.plm.edu.ph/" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Archive</a>
                    </li>
                  </nav>
                </div>
                <div class="w-full px-4 lg:w-1/3 md:w-1/2">
                  <h1 class="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font"> News </h1>
                  <nav class="mb-10 space-y-4 list-none">
                    <li>
                      <a href="https://www.plm.edu.ph/news/press-releases" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Press Releases</a>
                    </li>
                    <li>
                      <a href="https://www.plm.edu.ph/news/special-reports" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Special Reports</a>
                    </li>
                    <li>
                      <a href="https://www.plm.edu.ph/news/announcements" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Announcements</a>
                    </li>
                    <li>
                      <a href="https://www.plm.edu.ph/news/gallery" class="mr-1 text-sm transition duration-500 ease-in-out transform hover:text-yellow-500">Gallery</a>
                    </li>
                  </nav>
                </div>
              </div>
            </div>
            <div class="w-full px-8 mt-4 rounded-b-lg bg-blueGray-50">
              <div class="container flex flex-col flex-wrap px-5 py-6 mx-auto sm:flex-row justify-center">
                <p class="font-custom font-semibold tracking-tighter text-sm text-center text-black sm:text-left ">1967 - 2021 Pamantasan ng Lungsod ng Maynila. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </div>
    </Layout>
  )

}

export async function getServerSideProps(context) {
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

  if (session.user.questionnaire.length != 0 && session.user.has_taken_exam == false) {
    return {
      props: {session},
      redirect: {
        destination: '/app',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}


        //<h3 class="font-custom font-bold text-2xl text-black tracking-tighter py-8 px-5 lg:px-12">Subject Dashboard</h3>

              //{ !session.user.has_taken_exam &&
                //<button onClick={() => router.push("/app")} class="w-full px-16 py-2 my-2 text-base font-custom font-medium text-white transition duration-500 ease-in-out border-black rounded-md bg-black transform hover:-translate-y-1 hover:scale-105 hover:bg-yellow-500 "> 
                  //Take the Exam 
                //</button>
              //}
