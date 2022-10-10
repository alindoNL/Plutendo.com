import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify'
import { useAppContext } from './context'
import { db } from '../db/firebase.config'
import {
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore'
const PreviewJob = ({setPreview}) => {
  const {
    img,
    vacatureLink,
    beschrijving,
    salaris,
    dienstverband,
    vacatureNaam,
    // email,
    stuurTags,
    functie,
    bedrijfsNaam,
  } = useAppContext()
  const [betalen, setbetalen] = useState(false)
  const createVacature = async () => {
    setbetalen(true)
    const id = Math.floor(Math.random() * 10000)
    const randomId = `-${id}`
    const date = new Date().toJSON().slice(0, 10)
    let functieArr = [
      {
        bedrijfsNaam: bedrijfsNaam,
        vacatureNaam:vacatureNaam,
        // vacatureLink: vacatureLink,
        // email: email,
        functie: functie,
        id: randomId,
        // dienstverband: dienstverband,
        salaris: salaris,
        logo: img,
        tags: stuurTags.map((v) => {
          return v.value
        }),
        datum: date,
        // beschrijving: beschrijving,
      },
    ]
    let myA = [
      {
        bedrijfsNaam: bedrijfsNaam,
        vacatureNaam: vacatureNaam,
        // vacatureLink: vacatureLink,
        // email: email,
        id: randomId,
        functie: functie,
        // dienstverband: dienstverband,
        logo: img,
        salaris: salaris,
        tags: stuurTags.map((v) => {
          return v.value
        }),
        datum: date,
        // beschrijving: beschrijving,
      },
    ]
    await setDoc(
      doc(db, `${functie}`, `${bedrijfsNaam + randomId}`),
      {
        bedrijfsNaam: bedrijfsNaam,
        vacatureNaam: vacatureNaam,
        vacatureLink: vacatureLink,
        // email: email,
        functie: functie,
        dienstverband: dienstverband,
        salaris: salaris,
        logo: img,
        tags: stuurTags.map((v) => {
          return v.value
        }),
        datum: date,
        beschrijving: beschrijving,
      },
      { merge: true }
    )

    await updateDoc(doc(db, `${functie}`, `${functie}`), {
      [functie] : arrayUnion(...functieArr)
    })


    await updateDoc(doc(db, 'vacatures', 'vacatures'), {
      vacature: arrayUnion(...myA),
    })
  }
  let clean = DOMPurify.sanitize(beschrijving)
 
  return (
    <div className='mt-24 bg-neutral-100 '>
      <div className='m-12'>
        <button className='p-2 m-4 bg-gray-400' onClick={()=>{setPreview(false)}}>terug</button>
        <div className='mx-12 border-4 flex items-center justify-center '>
          <div className=' pr-12'>
            {img ? (
              <Image
                className='  rounded-full'
                loading='lazy'
                src={img}
                height={62}
                width={62}
                alt='sdadas'
              />
            ) : (
              <></>
            )}
          </div>

          <h1 className='m-4'>{bedrijfsNaam}</h1>
          <h1 className='m-4'>{vacatureNaam}</h1>
          {stuurTags.map((v) => {
            return (
              <div
                className='m-2 rounded-md border-black border-2'
                key={v.value}
              >
                <p className='p-1 '>{v.value}</p>
              </div>
            )
          })}
          <h4 className='m-4 text-sm text-gray-500'>nieuw</h4>
        </div>
      </div>
      <div className='mx-48' dangerouslySetInnerHTML={{ __html: clean }} />
          
      {betalen ? (
        <form  action='/api/checkout_sessions' method='POST'>
          <section>
            <button
              className='p-3 mx-24 mt-14 bg-blue-400 text-white'
              type='submit'
              role='link'
            >
              Betalen
            </button>
          </section>
        </form>
      ) : (
        <button
          className='p-3 mx-24 mt-14 bg-orange-400 text-white'
          type='submit'
          onClick={createVacature}
          role='link'
        >
          Plaats baan €49,99
        </button>
      )}
      
    </div>
  )
}

export default PreviewJob
