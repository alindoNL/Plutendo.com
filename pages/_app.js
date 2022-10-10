import React from 'react'
import Layout from '../components/Layout'
    import Router from 'next/router'
import '../styles/globals.css'
import Head from 'next/head'
import { AppWrapper } from '../components/context'
function MyApp({ Component, pageProps }) {
const [loading, setLoading] = React.useState(false)
React.useEffect(() => {
  const start = () => {
    setLoading(true)
  }
  const end = () => {
    setLoading(false)
  }
  Router.events.on('routeChangeStart', start)
  Router.events.on('routeChangeComplete', end)
  Router.events.on('routeChangeError', end)
  return () => {
    Router.events.off('routeChangeStart', start)
    Router.events.off('routeChangeComplete', end)
    Router.events.off('routeChangeError', end)
  }
}, [])



  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center h-screen '>
          <div className='grid gap-2'>
            
            <div className='flex items-center justify-center '>
              <div className='w-40 h-40 border-t-4 border-b-4 border-slate-700 rounded-full animate-spin'></div>
            </div>
          </div>
        </div>
      ) : (
        <AppWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppWrapper>
      )}
    </>
  )
}

export default MyApp
