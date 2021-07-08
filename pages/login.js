import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../components/layout'

export default function SignIn() {
  const [session, loading] = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const customId = 'customId'
  //if (typeof window !== 'undefined' && loading) return null

  if (session) {
    router.push('/')
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn('plmat-login', { redirect: false, username, password })
      .then(res => {
        if (res.error) {
          toast.error(res.error, { toastId: customId, transition: Flip })
        } 
      })
  }

  const notify = () => toast(error)

  // add errors popup
  return (
    <Layout>
      <section class="flex flex-col items-center h-screen md:flex-row ">
        <div class="hidden w-full h-screen bg-white lg:block md:w-1/3 lg:w-2/3">
          <img src="/plm-facade.jpg" alt="" class="object-fill w-full h-full md:object-cover" />
        </div>
        <div class="flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
          <div class="w-full h-100">
            <a class="flex items-center w-100 mb-4 font-medium text-blueGray-900 title-font md:mb-0">
              <div class="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-600" />
              <h2 class="text-lg font-bold font-custom tracking-tighter text-black uppercase duration-500 ease-in-out transform transition hover:text-yellow-500 dark:text-gray-400"> Pamantasan ng Lungsod ng Maynila </h2>
            </a>
            <h1 class="mt-12 text-2xl font-semibold font-custom text-black tracking-tighter sm:text-3xl title-font">Log in to your account</h1>
            <form class="mt-6" onSubmit={handleSubmit}>
              <div>
                <label class="block text-md font-medium font-custom leading-relaxed tracking-tighter text-gray-500">Username</label>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} class="w-full px-4 py-2 mt-2 text-base text-black font-custom tracking-tighter transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-0 ring-offset-current ring-offset-2 " />
              </div>
              <div class="mt-4">
                <label class="block text-md font-medium font-custom leading-relaxed tracking-tighter text-gray-500">Password</label>
                <input type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} minlength="6" class="w-full px-4 py-2 text-base text-black font-custom tracking-tighter transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-0 ring-offset-current ring-offset-2 " required="" />
              </div>
              <div class="mt-2 text-right">
                <a href="#" class="text-sm font-semibold leading-relaxed text-gray-700 hover:text-black focus:text-blue-700">Forgot Password?</a>
              </div>
              <button type="submit" class="block w-full px-4 py-3 mt-6 font-semibold font-custom text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">Log In</button>
            </form>
            <hr class="w-full my-4 border-gray-300" />
            <p class="mt-4 text-center tracking-tight font-custom">Having problems? <a href="https://www.plm.edu.ph/contact" class="font-semibold font-custom text-blue-500 hover:text-blue-700">Contact ICTO</a></p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
