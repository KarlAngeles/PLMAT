import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { signOut, useSession, getSession } from 'next-auth/client'

export default function Custom404() {
  const [session, loading] = useSession()

  return (
    <Layout>
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
          { session && 
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
          }
        </div>
      </div>
      <div class="w-full h-screen">
        <div class="flex flex-col items-center">

          <div class="w-1/3 pt-16">
            <img src="/error.png" alt="" class="w-full object-contain md:object-cover" />
          </div>

          <div class="flex flex-col justify-center items-center w-1/2 pt-8">
            <h1 class="text-5xl font-bold text-red-200 font-custom tracking-tighter">
              Oops!
            </h1>
            <p class="py-8 pb-32 text-3xl text-black font-custom font-semibold tracking-tighter text-center">
              We can't seem to find the page that you're looking for.
            </p>
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


