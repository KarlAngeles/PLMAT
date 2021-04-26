import React from 'react'
import { getCsrfToken } from 'next-auth/client'

export default function SignIn({ csrfToken }) {

  return (
    <div class="max-w-lg max-w-xs bg-blue-800 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4 rounded-xl">
      <h1 class="text-gray-200 text-center font-extrabold -mt-3 text-3xl">PLMAT Login</h1>
      <div class="container py-5 max-w-md mx-auto">
        <form method="post" action="/api/auth/callback/credentials">
          <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
          <div class="mb-4">
            <input placeholder="Username"
                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username" type="text"/>
          </div>
          <div class="mb-6">
            <input placeholder="Password"
                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password" type="password"/>
          </div>
          <div class="flex items-center justify-between">
            <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Sign In
              </button>
              <a class="inline-block align-baseline font-bold text-sm text-gray-400 " href="#">
                  Forgot Password?
              </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

//SignIn.getInitialProps = async (context) => {
  //const {req, res} = context
  //const session = await getSession({ req })

  //if (session && res && session.accessToken) {
    //res.writeHead(302, {
      //Location: '/',
    //}) 
    //res.end()
    //return
  //}

  //return {
    //session: undefined,

  //}
//}
