import React, { useState } from 'react'
const Footer = () => {
  const [date, setdate] = useState(new Date().getFullYear())
  return (
    <>
      <footer className='text-center  lg:text-left mt-44 bg-orange-100 text-gray-600'>
         
        <div className='text-center p-6 bg-orange-200'>
          <span>© {date} Copyright: </span>
          Plutendo
        </div>
      </footer>
    </>
  )
}

export default Footer
