import axios from 'axios'
import NextAuth from "next-auth";
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Credentials({
      id: 'plmat-login',
      name: 'Crendentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const url = 'http://localhost:3001/api/plmat/login'
          const response = await axios.post(url, credentials)
          console.log('logging from authorize callback', response.data)
          return response.data

          // Will verify from express server, then server will return an access token that will be saved to 
          // user session, which will be sent to every subsequent request to api 
          
          //dont need promise for async
          //this is for displaying error inside the login component
          //return Promise.reject(new Error('Error with credentials'))
        } catch(e) {
          throw new Error('Error in User Auth')
        }
      }
    })
  ],
  site: '/',
  pages: {
    signIn: '/login',
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
  },
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      // this is where session object can be mutated
      //- after user finished exam, do a update request to server, that changes the user's eligibility to take the exam again
      //- after making the request, call getSession to refresh the session value
      
      if (user) {
        token.user = user
      }

      // also need to add handling for has taken exam property
      
      // need to use another condition
      if (token.user && token.user.questionnaire.length == 0) {
        // need to limit api calls, as this callback is called very often
        try {
          const url = 'http://localhost:3001/api/plmat/refresh'
          console.log('logging from jwt callback')
          const response = await axios.get(url, {
            data: {username: token.user.username},
            headers: {
              // under current system setup if backend returns error code
              // authentication won't go through
              Authorization: 'Bearer ' + token.user.accessToken
            }
          })

          // need to check if response.user exists
          token.user.questionnaire = response.data.questionnaire

        } catch (e) {
          console.log(e)
          throw new Error('Error in User Auth')
        }
      }

      if (token.user && token.user.questionnaire.length != 0) {
        try {
          const url = 'http://localhost:3001/api/plmat/refresh'
          console.log('logging from current exam callback')
          const response = await axios.get(url, {
            data: {username: token.user.username},
            headers: {
              // under current system setup if backend returns error code
              // authentication won't go through
              Authorization: 'Bearer ' + token.user.accessToken
            }
          })

          // need to check if response.user exists
          console.log(response.data)
          token.user.current_exam = response.data.current_exam
          token.user.has_taken_exam = response.data.has_taken_exam

        } catch (e) {
          console.log(e)
          throw new Error('Error in User Auth')
        }
      }

      return token
    },
    session: async (session, token) => {
      session.user = token.user
      return session
    }
  }
}

export default (req, res) => NextAuth(req, res, options)
