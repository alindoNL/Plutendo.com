import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
import 'react-quill/dist/quill.snow.css'
import { db, storage } from '../db/firebase.config'
import {
  collection,
  getDocs,
  createDoc,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore'
const MakeJob = () => {
  const [vraag, setVraag] = useState('')
  const [waarom, setWaarom] = useState('')
  const [bedrijfsNaam, setbedrijfsNaam] = useState('')
  const [functie, setfunctie] = useState('')
  const [beschrijving, setbeschrijving] = useState('')
  //  const [tags, settags] = useState([javascript, ])
  const [img, setImg] = useState('')
  const [progress, setProgress] = useState(0)
  const createQeustion = async () => {
    let myA = [
      {
        functie: functie,
        bedrijf: vraag,
        image: img,
        // opties: [ 'jas', 'react', 'nextjs'  ],
        waarom: waarom,
      },
    ]
    await setDoc(doc(db, 'junior-developer', `${bedrijfsNaam}`), {
      bedrijfsNaam: bedrijfsNaam,
      beschrijving: val,
      functie: functie,
      logo: img,
    })
  }
  const formHandler = (e) => {
    e.preventDefault()
    const file = e.target[0].files[0]
    uploadFiles(file)
  }
  const uploadFiles = (file) => {
    if (!file) return
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(prog)
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL)
        })
      }
    )
  }
  const [val, setval] = useState(
    `<span>
                
<br>
<strong>Over Pluntendo<br>
<br>
</strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br>
<br>
<br>
<strong>Ben jij…<br>
<br>
</strong>… Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br>
<br>
<strong>Dit ga je doen…<br>
<br>
</strong> 
<br>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br>
<br>
</strong>
<strong>Functie-eisen:<br>
<br>
</strong><ul><li>lorem ipsun dor lamen;</li><li>ervaring  met ICT;</li><li>kennis van of ervaring met Javascript</li><li>passie in wat je doet en hoe je het doet;</li><li>sterke communicatieve vaardigheden;</li><li>je hebt een goede beheersing van zowel de Nederlandse als Engelse taal.<br>
<br>
</li></ul>Als je geïnteresseerd bent, maar je herkent je niet volledig in iedere specificatie, laat dat dan je niet afschrikken.<br>
<br>
<strong>Waarom kiezen voor Plutendo?<br>
<br>
</strong>
<ul><li>Een uitdagende functie;</li><li>Deelnemen aan het nieuwe werken (werken waar en wanneer je wilt)</li><li>Een salaris tussen de € 2.200,- en € 3.200,- op basis van 32 uur.</li><li>Een mobiele telefoon en laptop</li><li>Je komt te werken in een enthousiast en groeiend team van verschillende specialisten. </li>Uitstekende pensioenvoorwaarden<br> </ul>
<br>
Apply Now
        </span>`
  )
  return (
    <div className='mt-24 '>
      <div className='border-slate-300 mx-12 '>
        <h2 className='font-bold mx-4'> BEDRIJFSNAAM</h2>
        <input
          className={`border-2  md:mt-6 sm:m-2 border-black `}
          placeholder='bedrijfsNaam'
          onChange={(e) => {
            setbedrijfsNaam(e.target.value)
          }}
        />
        <h2 className='font-bold mx-4'> FUNCTIE</h2>
        <input
          className={`border-2  md:mt-6 sm:m-2 border-black `}
          placeholder='FUNCTIE'
          onChange={(e) => {
            setfunctie(e.target.value)
          }}
        />

        <QuillNoSSRWrapper
          className='w-96 h-96 mt-12 ml-24'
          theme='snow'
          value={val}
          onChange={setval}
        />
        <input
          className='hidden'
          placeholder='foto'
          onChange={(e) => {
            setImg(e.target.value)
          }}
        />
        <div className='sm:flex sm:items-center sm:justify-center'>
          <form className='mt-14' onSubmit={formHandler}>
            <label>
              kies een foto ::
              <input type='file' className='input' />
            </label>
            <button
              className='sm:m-4 bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
              type='submit'
            >
              voeg foto toe
            </button>
          </form>
          <h2>Uploading done {progress}%</h2>
        </div>
        <button
          type='submit'
          className='p-3 mx-24 mt-14 bg-slate-400 text-white'
        >
          voeg vacature toe
        </button>
      </div>
    </div>
  )
}

export default MakeJob
