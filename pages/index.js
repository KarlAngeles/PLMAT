import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession();

  if (session) {
    return (
      <div>
        <Head>
          <title>PLM Admission Test (PLMAT)</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          testing
        </main>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>PLM Admission Test (PLMAT)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Not signed in <br />
        <button onClick={signIn}>Log In</button>
      </main>
    </div>
  )

}
