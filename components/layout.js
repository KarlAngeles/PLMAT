import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>PLM Admission Test (PLMAT)</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ToastContainer />
        {children}
      </main>
    </>
  )
}
