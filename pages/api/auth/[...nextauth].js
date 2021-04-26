import NextAuth from "next-auth";
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Crendentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = crendentials => {
          //return {username: 'test'}
          return null
        }

        return user ? user : null
      }
    })
  ],
  site: '/',
  pages: {
    signIn: '/signin',

  },
  session: {
    jwt: true,
  }
}

export default (req, res) => NextAuth(req, res, options)
