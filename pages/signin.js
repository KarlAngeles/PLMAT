import React from 'react'
import { providers, signIn, getSession } from 'next-auth'

export default SignIn = (providers, csrfToken) => {
  <div>
    
  </div>
}

SignIn.getInitialProps = async(context) => {
  const (req, res) = context
  const session = await (getSession({req}))

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    }) 
    res.end()
    return
  }

  return {
    session: undefined,
    providers: await providers(context),
  }
}
