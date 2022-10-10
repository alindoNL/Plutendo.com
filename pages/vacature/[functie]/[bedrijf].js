import React, {useState} from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { collection, doc, getDoc } from 'firebase/firestore'
import DOMPurify from 'isomorphic-dompurify'
import { db } from '../../../db/firebase.config'
const Id = ({ datas }) => {
  const [data, setdata] = useState(datas)
  let date_1 = data.datum
  const date = new Date().toJSON().slice(0, 10)

  const diffInMs = new Date(date) - new Date(date_1)
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  let clean = DOMPurify.sanitize(data.beschrijving)

  return (
    <>
      <Head>
        <title>
          {data.vacatureNaam}- {data.bedrijfsNaam} - Plutendo
        </title>
        <meta
          name='description'
          content={`${data.bedrijfsNaam} is op zoek naar een ${data.vacatureNaam}- thuiswerk vacature  `}
        />

        <link rel='shortcut icon' href='/favicon2.png' />
        <link rel='apple-touch-icon' href='/favicon2.png' />
      </Head>
      <div className='mt-20 '>
        {' '}
        <div className='my-8 pt-12 mx-2 lg:mx-34 xl:mx-40 2xl:mx-80 md:mx-20 sm:mx-20'>
          <div className=' bg-white py-4 flex items-center justify-between  lg:mr-24 '>
            <div className='flex'>
              <div className='border-2 shrink-0 rounded-full lg:ml-24 lg:w-20 h-8 w-8  sm:w-16 sm:h-16 lg:h-20 '>
                <Image
                  className=' rounded-full '
                  src={data.logo}
                  height={80}
                  priority={true}
                  width={80}
                  alt={`${data.bedrijfsNaam} logo`}
                />
              </div>
              <div className='ml-4 mt-2'>
                <h1 className='font-semibold text-slate-700 md:text-xl'>
                  {data.vacatureNaam}
                </h1>
                <h2 className='  text-gray-500 text-sm'>{data.bedrijfsNaam}</h2>
              </div>
            </div>
            <div className='lg:ml-60 lg:mr-12 sm:mr-12 flex justify-center items-center '>
              {data.tags.map((tag) => {
                return (
                  <div
                    key={tag}
                    className=' sm:block hidden rounded-md mx-2  border-black border-2'
                  >
                    <p className='p-1 '>{tag}</p>
                  </div>
                )
              })}
            </div>

            <div className=' justify-end   mr-4'>
              <h3 className=' text-sm md:text-md  text-gray-700 flex'>
                {data.salaris}
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
        <div className=''></div>
        <div
          className='md:mx-48 lg:mx-56 xl:mx-64 2xl:mx-72 mx-24'
          dangerouslySetInnerHTML={{ __html: clean }}
        />{' '}
        <div className='md:mx-48 lg:mx-56 xl:mx-64 2xl:mx-72 mt-12 mx-24'>
          <a
            target='_blank'
            rel='noreferrer'
            className=' sm:p-3 p-2 mt-12 rounded-md sm:text-lg bg-blue-400'
            href={data.vacatureLink}
          >
            {' '}
            Solliciteer op website van werkgever
          </a>
        </div>
      </div>
    </>
  )
}

export default Id


export async function getServerSideProps(context) {
  const { bedrijf } = context.params
  const { functie } = context.params
  const docRef = await doc(db, `${functie}`, `${bedrijf}`)
  const data = await getDoc(docRef)
  return {
    props: {
      datas: data.data(),
    },
  }
}
