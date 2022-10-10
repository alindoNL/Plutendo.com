import React, { useState } from 'react'
import Link from 'next/link'
import Dropdown from './Dropdown'
import Image from 'next/image'
import logo from '../../public/logo.png'
const Nav = () => {
 const [isOpen, setIsOpen] = useState(false)

 const toggle = () => {
   setIsOpen(!isOpen)
 }
  return (
    <header>
      <nav className='h-20 items-center  flex bg-white justify-between  shadow-md fixed w-full z-10 top-0 '>
        <div className='cursor-pointer  md:block   pl-12 lg:pl-32 xl:pl-64 text-xl text-white font-semibold'>
          <Link className='' to='/' href={'/'}>
            <a>
              <Image
                className='cursor-pointer  '
                src={logo}
                height={73}
                width={150}
                alt='navbar-logo'
              />
            </a>
          </Link>
        </div>

        <div
          className=' pr-16 md:pr-36  md:pl-36  cursor-pointer lg:hidden'
          onClick={toggle}
        >
          {isOpen ? (
            <svg
              className='w-8 h-8 text-orange-700'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          ) : (
            <svg
              className='w-8 h-8 text-orange-700'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </div>
        <div className=' xl:pr-28   2xl:pr-96 lg:block hidden m-2  '>
          <Link href='/thuiswerk-vacatures'>
            <a className='p-5 text-lg  text-slate-700'>Thuiswerk Vacatures</a>
          </Link>
          <Link href='/contact'>
            <a className='p-5 text-lg  text-slate-700'>Contact</a>
          </Link>
          
        </div>
        <div className=' xl:pr-22  2xl:pr-44 pr-16 sm:block  hidden m-2  '>
          <Link href='/werkgever/plaats-vacature'>
            <a
              type='button'
              className='py-3 cursor-pointer px-4 inline-flex justify-center items-center gap-2 rounded-md bg-orange-200 border border-transparent font-semibold text-orange-800 hover:font-bold hover:text-white hover:bg-orange-300 focus:outline-none focus:ring-4 ring-offset-white  text-sm focus:ring-offset-gray-800'
            >
              Plaats een vacature  - €49,99
            </a>
            {/* <a className='p-3 rounded-lg   hover:bg-blue-400  md:bg-blue-800 text-lg  font-semibold text-white'>
              GRATIS PROEFLES
            </a> */}
          </Link>
        </div>
      </nav>
      <Dropdown isOpen={isOpen} toggle={toggle} />
    </header>
  )
}
  
export default Nav
