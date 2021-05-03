import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>PLM Admission Test (PLMAT)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
    </>
  )
}
