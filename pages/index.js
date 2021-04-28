import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession();

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
      testing
    </Layout>
    <div>
  )


}
