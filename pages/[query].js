import React, {useState} from 'react'
import Router from 'next/router'
import { collection, doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import Select from 'react-select'
import Image from 'next/image'
import { db } from '../db/firebase.config'
import Head from 'next/head'
const Id = ({ data, query }) => {

    const [slice, setSlice] = useState(20)
    const [rl, setRl] = useState(false)
  const [vacature, setVacature] = useState(data[query].reverse().slice(0, 10))
  const date = new Date().toJSON().slice(0, 10)
  const bekijkMeer = () => {
    setVacature(data[query].slice(0, slice))
  }
  
  const handleChange = (newValue) => {
    //new value is wat je in het input veld tikt dan op enter.
    // setSearch(newValue.value)
    Router.push(`${newValue.value}`)
    setRl(true)
  }
// if(rl){
//   location.reload()
// }

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
    <div className='mt-24 '>
      {' '}
      <Head>
        <title>Plutendo - bekijk alle thuiswerk-{query} vacatures</title>
        <meta
          name='description'
          content={`bekijk hier alle thuiswerk-${query} vacatures `}
        />

        <meta property='og:url' content='https://www.plutendo.com/' />
        <meta
          property='og:title'
          content=' Plutendo - De #1 site voor thuiswerk-vacatures'
        />
        <meta
          property='og:description'
          content={`bekijk hier alle thuiswerk-${query} vacatures `}
        />
        <link rel='apple-touch-icon' href='/favicon2.png' />
        <link rel='shortcut icon' href='/favicon2.png' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='mt-20 mx-12  lg:flex items-center justify-center  '>
        <div className=''>
          <div className='xl:mx-36 '>
            <h1 className='lg:text-4xl mt-12 lg:mx-60 mx-20 text-2xl shrink-0 font-semibold '>
              Werk op afstand vanuit huis of plaatsen over de hele wereld. Vind
              vandaag nog je droombaan!
            </h1>
          </div>
          {/* <form>
            <div className='relative mt-7 lg:mx-64 '>
              <div className='flex absolute inset-y-0 left-0 items-center pl-3   pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  ></path>
                </svg>
              </div> */}
          {/* <input
                type='search'
                id='search'
                className='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Klantenservice, Software Developer'
                required
                list='cars'
                autoComplete='on'
              />
              */}
          <div className='flex items-center justify-center'>
            <Select
              className='w-4/6 mt-12 text-center text-2xl'
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
          {/* <button
                type='submit'
                className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Search
              </button> */}
          {/* </div> */}
          {/* </form> */}
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
          <div className='cursor-pointer ' key={id}>
            <Link passHref href={`/vacature/${functie}/${bedrijfsNaam}${id}`}>
              <a target='_blank' rel='noopener noreferrer'>
                <div className='my-8 lg:mx-34 xl:mx-40 2xl:mx-80 md:mx-20 sm:mx-20'>
                  <div className=' hover:shadow-xl shadow-md hover:bg-orange-200  bg-white py-4 flex items-center justify-between  '>
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

                    <div className=' justify-end  mr-4'>
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
              </a>
            </Link>
          </div>
        )
      })}
      <div className='flex items-center justify-center'>
        <button
          className='underline font-normal'
          onMouseOver={() => {
            setSlice(slice + 10)
          }}
          onClick={bekijkMeer}
        >
          bekijk meer bekijk meer vacatures
        </button>
      </div>
    </div>
  )
}

export default Id

export async function getServerSideProps(context) {
  const { query } = context.params
  
  const docRef = await doc(db, `${query}`, `${query}`)
  const data = await getDoc(docRef)
  return {
    props: {
      query: query,
      data: data.data(),
    },
  }
}
