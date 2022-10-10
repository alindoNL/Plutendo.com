import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
import CreatableSelect from 'react-select/creatable'
import 'react-quill/dist/quill.snow.css'
import { useAppContext } from '../../components/context'
import { db, storage } from '../../db/firebase.config'
import PreviewJob from '../../components/PreviewJob'
const PlaatsVacature = () => {

  const {
    setImg,
    img,
    vacatureLink,
    salaris,
    setSalaris,
    dienstverband,
    progress,
    setProgress,
    setVacatureNaam,
    setVacatureLink,
    beschrijving,
    setDienstverband,
    setBeschrijving,
    setStuurTags,
    vacatureNaam,
stuurTags,
    functie,
    setfunctie,
    bedrijfsNaam,
    setbedrijfsNaam,
  } = useAppContext()
  const [preview, setPreview] = useState(false)
  const [msg, setmsg] = useState('')
  const handleChange = (newValue) => {
    //new value is wat je in het input veld tikt dan op enter.
    setStuurTags(newValue)
  }
  // const formHandler = (e) => {
  //   e.preventDefault()
  //     const file = e.target[0].files[0]
  //       uploadFiles(file)

  // }
  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0]
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
  //calculate date and send to firebase.

/* new Timestamp takes the seconds and nanoseconds as input parameters */
//form validation
const handlePreview = ()=>{
   if (!stuurTags) {
     setmsg('je bent sleutelwoorden vergeten')
   } else if (progress < 99) {
     setmsg('wachten op logo probeer het nog een keer')
   } else if (!vacatureLink) {
     setmsg('je hebt vacature link niet ingevuld')
   } else {
     setPreview(true)
   }
  
  
  
    
   

}
  if (preview ) {
    return (
      <PreviewJob  setPreview={setPreview}  />
    )
  }
  return (
    <div className='mt-20   bg-gray-100 '>
      <div className='border-black border-inherit  pt-12 md:mx-24 border-4 '>
        <div className='mb-6 mx-24'>
          <label className='block mb-2 text-lg text-gray-900 dark:text-gray-300 font-bold'>
            Bedrijfsnaam*
          </label>
          <input
            type='text'
            placeholder='Plutendo'
            defaultValue={bedrijfsNaam}
            onChange={(e) => {
              setbedrijfsNaam(e.target.value)
            }}
            id='base-input'
            className='bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6 mx-24'>
          <label className='block mb-2 text-lg text-gray-900 dark:text-gray-300 font-bold'>
            Vacature Naam*
          </label>
          <input
            type='text'
            defaultValue={vacatureNaam}
            placeholder='Junior Front-end Developer'
            onChange={(e) => {
              setVacatureNaam(e.target.value)
            }}
            id='base-input'
            className='bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6 mx-24'>
          <label className='block mb-2 text-lg  text-gray-900 dark:text-gray-300 font-bold'>
            Categorie*
          </label>
          <select
            onChange={(e) => {
              setfunctie(e.target.value)
            }}
            defaultValue={functie}
            name='pakket'
            required
            className='
            block
            w-3/6
            mt-1
             border-solid border-2 border-gray-700
            rounded-md
            focus:border-blue-300
            focus:ring
            focus:ring-blue-200
            focus:ring-opacity-50
          '
          >
            <option value='overig'>-- selecteer categorie --</option>
            <option value='klantenservice'>klantenservice</option>
            <option value='design'>design</option>
            <option value='software-ontwikkelaar'>software ontwikkelaar</option>

            <option value='front-end'>front end</option>

            <option value='back-end'>back end</option>
            <option value='administratie'>administratie</option>
            <option value='engineering'>engineering</option>
            <option value='devops'>devOps</option>
            <option value='personeelszaken'>personeelszaken</option>

            <option value='financiën'>financiën</option>
            <option value='marketing'>marketing</option>
            <option value='tester'>tester</option>
            <option value='schrijver'>schrijver</option>
          </select>
          <label className='block mb-2 text-lg mt-5  text-gray-900 dark:text-gray-300 font-bold'>
            Dienstverband*
          </label>
          <select
            onChange={(e) => {
              setDienstverband(e.target.value)
            }}
            defaultValue={dienstverband}
            name='pakket'
            required
            className='
            block
            w-3/6
            mt-1
             border-solid border-2 border-gray-700
            rounded-md
            focus:border-blue-300
            focus:ring
            focus:ring-blue-200
            focus:ring-opacity-50
          '
          >
            <option value='fulltime'>Fulltime</option>
            <option value='parttime'>Parttime</option>
            <option value='tijdelijk'>Tijdelijk</option>

            <option value='freelance/ZZP'>Freelance/ZZP</option>
            <option value='overig'>overig</option>
          </select>
        </div>
        <div className='mb-6 mx-24'>
          <label className='block  text-lg text-gray-900 dark:text-gray-300 font-bold'>
            Sleutelwoorden*
          </label>
          <p className='text-sm mb-2 text-slate-600'>
            max 3 sleutelwoorden : zorg, recruiter, javascript, topdesk, google
            analytics, aws etc.
          </p>

          <CreatableSelect
            isMulti
            required
            defaultValue={stuurTags}
            placeholder=' SaaS, Marketing, Junior '
            instanceId={1}
            // options={tags}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6 mx-24'>
          <label className='block  text-lg  text-gray-900 dark:text-gray-300 font-bold'>
            Beschrijving*
          </label>
        </div>
        <QuillNoSSRWrapper
          className=' h-96 mt-4 bg-slate-50 mx-24 mb-14'
          theme='snow'
          value={beschrijving}
          onChange={setBeschrijving}
        />
        <input
          className='hidden'
          placeholder='foto'
          onChange={(e) => {
            setImg(e.target.value)
          }}
        />
        <div className='mb-6 mx-24'>
          <label className='block mb-2  text-lg text-gray-900 dark:text-gray-300 font-bold'>
            Salaris
          </label>
          <input
            type='text'
            placeholder='Plutendo'
            value={salaris}
            onChange={(e) => {
              setSalaris(e.target.value)
            }}
            id='base-input'
            className='bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg 
             focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>

        <div className='mb-6 mt-10 mx-24'>
          <label className='block mb-2 text-lg text-gray-900 dark:text-gray-300 font-bold'>
            Vacature Link*
          </label>
          <input
            type='text'
            defaultValue={vacatureLink}
            onChange={(e) => {
              setVacatureLink(e.target.value)
            }}
            placeholder='https://voorbeeld.com/vacature-klantenservice'
            id='base-input'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        {/* <div className='mb-6 mt-1 mx-24'>
          {' '}
          <label className='block mb-2 text-lg  text-gray-900 dark:text-gray-300 font-bold'>
            Of
          </label>
        </div> */}
        {/* <div className='mb-6 mt-6 mx-24'>
          <label className='block  text-lg  text-gray-900 dark:text-gray-300 font-bold'>
            E-mailadres
          </label>
          <p className='text-sm mb-2 text-slate-600'>
            krijg sollicitanten via mail
          </p>
          <input
            type='text'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder='info@plutendo.nl'
            id='base-input'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div> */}
        <div className='sm:flex sm:items-center sm:justify-center'>
          <div className=''>
            voeg logo toe*
            <label className='rounded-full'>
              <input
                accept='image/png, image/gif, image/jpeg, image/webp, image/ico'
                placeholder='kies logo'
                className='text-sm text-grey-500 file:mr-5
              file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm
              file:font-medium file:bg-blue-200 file:text-blue-700
              hover:file:cursor-pointer hover:file:bg-amber-50
              hover:file:text-amber-700 '
                onChange={handleFileInput}
                type='file'
              />
            </label>
          </div>
          {setmsg === '' ? <></> : <p>{msg}</p>}
          {/* <h2>Uploading done {progress}%</h2> */}
          <div className=' mt-24 float-right'>
            <button
              onClick={() => {
                handlePreview()
              }}
              className='sm:m-4 bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'
            >
              overzicht vacature
            </button>
          </div>
          <div className=''>
            {img ? (
              <Image
                src={img}
                height={80}
                width={80}
                alt='logo'
              />
            ) : (
              <> </>
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center mt-10'>
        problemen met het plaatsen van een vacature? Stuur een e-mail naar
        <a className='pl-1 text-blue-500' href='mailto:plutendo@gmail.com'>
          {' '}
          plutendo5@gmail.com
        </a>
      </div>
    </div>
  )
}

export default PlaatsVacature
