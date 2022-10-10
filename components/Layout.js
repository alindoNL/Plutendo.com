import React from 'react'
import Head from 'next/head'

import Nav from './Navbar/Nav'
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <div className='bg-neutral-100'>
      <Head>
        <title>Plutendo - De #1 site voor thuiswerk-vacatures</title>
        <meta
          name='description'
          content='Op zoek naar thuiswerk vacatures? bekijk hier al onze thuiswerk vacatures!'
        />

        <meta property='og:url' content='https://www.plutendo.com/' />
        <meta
          property='og:title'
          content=' Plutendo - De #1 site voor thuiswerk-vacatures'
        />
        <meta
          property='og:description'
          content='Werk op afstand vanuit huis of plaatsen over de hele wereld. Vind snel een thuiswerk baan.'
        />
        <link rel='apple-touch-icon' href='/favicon2.png' />
        <link rel='shortcut icon' href='/favicon2.png' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <a
        className={
          'transition text-white font-semibold left-0 bg-primary  top-0 z-50 text-primary-content absolute p-3 m-3 -translate-y-16 focus:translate-y-0 focus:bg-slate-800 '
        }
        href='#hoofd-content'
      >
        Naar hoofdcontent
      </a>
      <Nav />
      <main id='hoofd-content'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
