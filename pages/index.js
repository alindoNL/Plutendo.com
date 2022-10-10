import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { db } from '../db/firebase.config'
import Select from 'react-select'
import {
  doc,
  getDoc,
} from 'firebase/firestore' 
import Link from 'next/link'
import Router from 'next/router'
export default function Home({  dataz}) {
  const [data, setData] = useState(dataz)
  const [slice, setSlice] = useState(26)
  // const [search, setSearch] = useState('')
  const [vacature, setVacature] = useState(dataz.slice(0,21))
  const date = new Date().toJSON().slice(0, 10)
const bekijkMeer = async()=>{
  
 await setVacature(data.slice(0, slice))

}
  const handleChange = (newValue) => {
    //new value is wat je in het input veld tikt dan op enter.
    // setSearch(newValue.value)
    Router.push(`${newValue.value}`)
  }
const options = [
  { value: 'front-end', label: 'front-end' },
  { value: 'back-end', label: 'Back-end' },
  { value: 'design', label: 'design' },
  { value: 'software-ontwikkelaar', label: 'software ontwikkelaar' },
  { value: 'klantenservice', label: 'klantenservice' },
  { value: 'administratie', label: 'administratie' },
  { value: 'engineering', label: 'engineering' },
  { value: 'personeelszaken', label: 'personeelszaken' },
  { value: 'financiën', label: 'financiën' },
  { value: 'marketing', label: 'marketing' },
  { value: 'tester', label: 'tester' },
  { value: 'schrijver', label: 'schrijver' },
]


  return (
    <>
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
     
      <div className='mt-20 mx-12  lg:flex items-center justify-center  '>
        <div className=''>
          <div className='xl:mx-36'>
            <h1 className='lg:text-4xl pt-14 lg:mx-60 mx-20 sm:text-2xl text-xl shrink-0 font-semibold '>
              Werk op afstand vanuit huis of plaatsen over de hele wereld. Vind
              vandaag nog je droombaan!
            </h1>
          </div>
        
          <div className='flex items-center justify-center'>
            <Select
              className='w-4/6 mt-12 text-center sm:text-2xl'
              autoFocus
              onChange={handleChange}
              type='text'
              id='search'
              instanceId='select'
              placeholder='   Klantenservice, Software ontwikkelaar'
              // defaultValue={colourOptions[2]}
              options={options}
              // styles={colourStyles}
            />
          </div>
         
          <h2 className='mt-7   flex   items-center justify-center text-orange-700'>
            bekijk onze vacatures{' '}
          </h2>
        </div>
      </div>

      {vacature.map((vacature) => {
        const {
          bedrijfsNaam,
          logo,
          vacatureNaam,
          salaris,
          datum,
          functie,
          id,
        } = vacature

        const diffInMs = new Date(date) - new Date(datum)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
        return (
          <div className='cursor-pointer  ' key={id}>
            <Link passHref href={`/vacature/${functie}/${bedrijfsNaam}${id}`}>
              {/* <a target='_blank' rel='noopener noreferrer'> */}
              <div className='my-8 lg:mx-34 xl:mx-40 2xl:mx-80 md:mx-20 sm:mx-20'>
                <div className='hover:bg-orange-200 hover:shadow-xl shadow-md   bg-white py-4 flex items-center justify-between  '>
                  <div className='flex'>
                    <div className='border-2 shrink-0 rounded-full lg:ml-24 lg:w-20 h-8 w-8  sm:w-16 sm:h-16 lg:h-20 '>
                      <Image
                        className=' rounded-full '
                        loading='lazy'
                        src={logo}
                        height={80}
                        width={80}
                        alt={`${bedrijfsNaam} logo`}
                      />
                    </div>
                    <div className='ml-4 mt-2'>
                      <h2 className='font-semibold text-slate-700 md:text-xl'>
                        {vacatureNaam}
                      </h2>
                      <h2 className='  text-gray-500 text-sm'>
                        {bedrijfsNaam}
                      </h2>
                    </div>
                  </div>
                  <div className='lg:ml-60 lg:mr-12 sm:mr-12 flex justify-center items-center '>
                    {vacature.tags.map((tag) => {
                      return (
                        <div
                          key={tag}
                          className=' rounded-md mx-2  border-black border-2'
                        >
                          <p className='p-1 '>{tag}</p>
                        </div>
                      )
                    })}
                  </div>

                  <div className=' justify-end  mr-4 '>
                    <h3 className=' text-sm md:text-md  text-gray-700 flex'>
                      {salaris}
                    </h3>
                    {diffInDays < 2 ? (
                      <p className='pl-4  flex text-sm md:text-md text-gray-500'>
                        nieuw
                      </p>
                    ) : (
                      <p className='pl-4  flex text-sm md:text-md text-gray-500'>
                        {diffInDays} dagen
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* </a> */}
            </Link>
          </div>
        )
      })}

      <div className='flex items-center justify-center'>
        <button
          className='underline font-normal'
          // onMouseOver={() => {
          //   setSlice(slice + 10)
          // }}
          onClick={() => {
            setSlice(slice + 11), bekijkMeer()
          }}
        >
          bekijk meer vacatures
        </button>
      </div>
      {/* 

<Link href={'/vacature/junior-developer/Aleeeendo'}>
<a
target='_blank'
          rel='noopener noreferrer'
          className='bg-red-300 mt-14 mx-64 cursor-pointer flex m-12'
          >
          <Image
            className='pl-4'
            src={Stars}
            height={32}
            width={62}
            alt='sda'
            />
            <p className='m-4'> functie</p>
            <p className='m-4'>bedrijf</p>
            <p className='m-4 text-sm'>item.tags</p>
            <p className='m-4 text-sm'>item.tags</p>
            <p className='m-4 text-sm'>item.tags</p>
            </a>
      </Link> */}
    </>
  )
}

 export async function getStaticProps() {
   const docRef = await doc(db, 'vacatures', 'vacatures')
   const data = await getDoc(docRef)
   // const date = new Date().toJSON().slice(0, 10)
   //get reverse data 
   return {
     props: {
      //  datas: data.data(),
       dataz: data.data().vacature.reverse(),
       // date: date,
     },
     revalidate: 60,
   }
 }


