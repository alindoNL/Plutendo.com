import React from 'react'
import Link from 'next/link'
const Dropdown = ({ toggle, isOpen }) => {
  return (
    <div
      className={
        isOpen
          ? 'grid grid-rows-4 shadow-md fixed w-full z-10 top-20  text-center items-center font-semibold text-white bg-orange-800'
          : 'hidden'
      }
      onClick={toggle}
    >
      <Link href='/'>
        <a className='p-5 hover:bg-orange-200 '>home</a>
      </Link>
      <Link href='/thuiswerk-vacatures'>
        <a className='p-5 hover:bg-orange-200'>Thuiswerk Vacatures</a>
      </Link>
      <Link href='/contact'>
        <a className='p-5 hover:bg-orange-200'>contact</a>
      </Link>
      <Link href='/werkgever/plaats-vacature'>
        <a className='p-5 hover:bg-orange-200'>Plaats een vacature - €49,99 </a>
      </Link>
    </div>
  )
}

export default Dropdown
