import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>PLMAT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!session && ( 
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign In</button>
          </>
        )}
        {session && (
          <>
            testing
          </>
        )}
      </main>
    </div>
  )
}
