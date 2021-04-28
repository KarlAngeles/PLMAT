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
          // response status == 200 
          //if (response) {
            //console.log(response.data)
            //return response.data
          //}
          //return null
          return Promise.reject(new Error('Error with credentials'))
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
  session: {
    jwt: true,
  }
}

export default (req, res) => NextAuth(req, res, options)
