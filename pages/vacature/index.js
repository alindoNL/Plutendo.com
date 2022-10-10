import React from 'react'
import { useRouter } from 'next/router'
const Index = () => {
 const router = useRouter()
 const { id } = router.query

  return (
    <div className='mt-24'>index {id}</div>
  )
}

export default Index