import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession();

  // prevents flash of unwanted content
  if (typeof window !== 'undefined' && loading) return null

  if (!session) {
    return (
      <Layout>
        Not signed in <br />
        <button onClick={signIn}>Log In</button>
      </Layout>
    )
  }

  return (
    <Layout>
      This is the home page
    </Layout>
  )


}
