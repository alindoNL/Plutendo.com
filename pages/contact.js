import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Script from 'next/script'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import Head from 'next/head'
import Link from 'next/link'
function Contact() {
  const [isarrived, setisarrived] = useState(false)
  const [isnotarrived, setisnotarrived] = useState(false)
  const [time, settime] = useState(5)
  const [timeon, settimeon] = useState(false)
  const [notverified, setnotverified] = useState(false)
  const form = useRef()

  const [token, setToken] = useState(null)
  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`)
  }, [token])

  const captchaRef = useRef(null)

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute()
  }

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_90futw1',
        'template_slfzznc',
        form.current,
        'ytpJrH5gt6CHDw-dP'
      )
      .then(
        () => {
          setisarrived(true)
          settimeon(true)
        },
        (error) => {
          setisnotarrived(true)
          console.log(error)
        }
      )
  }
  useEffect(() => {
    if (timeon) {
      let myInterval = setInterval(() => {
        if (time > 0) {
          settime(time - 1)
        }
        if (time === 0) {
          clearInterval(myInterval)
          window.location.reload()
        }
      }, 1000)
      return () => {
        clearInterval(myInterval)
      }
    }
  }, [timeon, time])

  return (
    <>
      <Head>
        <title>Plutendo - Contact</title>
        <meta name='description' content='Plutendo - Contact' />
      </Head>
      {/* <Script
        src='//www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit'
        async
        defer
      /> */}
      <div className='mt-20 max-w-screen-md mx-auto p-5"'>
        <h1 className='uppercase pt-24 text-2xl font-semibold mb-4 flex items-center justify-center '>
          Contact
        </h1>
        <section className='mb-32 text-gray-800 mt-8'>
          <div className='flex flex-wrap'>
            <div className='grow-0 shrink-0 basis-auto w-full md:w-5/12 px-3 '>
              <h2 className='text-xl font-bold mb-6'>Contactformulier</h2>
              <form onSubmit={sendEmail} ref={form}>
                <div className='form-group mb-6'>
                  <input
                    type='text'
                    name='naam'
                    required='required'
                    className='form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleInput7'
                    placeholder='Naam'
                  />
                </div>
                <div className='form-group mb-6'>
                  <input
                    type='email'
                    name='email'
                    className='form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleInput8'
                    placeholder='Email'
                    required='required'
                  />
                </div>
                <div className='form-group mb-6'>
                  <textarea
                    name='message'
                    required='required'
                    className='
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            '
                    id='exampleFormControlTextarea13'
                    rows='3'
                    placeholder='Bericht'
                  ></textarea>
                </div>
                {/* <ReCAPTCHA
                  size='invisible'
                  sitekey='5cfac5cc-7553-42b7-b91a-82163e838e16'
                /> */}

                {token ? (
                  <>
                <button
                  type='submit'
                  className='
  mb-6
w-full
px-6
py-2.5
bg-blue-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out'
                >
                  verstuur
                </button>
                  </>
                ) : (
                  <>
                    <button
                      className='bg-gray-200  hover:bg-gray-300 rounded p-3  mb-4 mt-6'
                      onClick={() => {
                        setnotverified(true)
                      }}
                      type='button'
                    >
                      Versturen
                    </button>
                    {notverified ? (
                      <div>verifieer je zelf eerst </div>
                    ) : (
                      <div></div>
                    )}
                  </>
                )}
                <HCaptcha
                  sitekey='4098a83d-aaab-445c-b9c0-c2f91c78202d'
                  onLoad={onLoad}
                  onVerify={setToken}
                  ref={captchaRef}
                />

                {isarrived ? (
                  <div>
                    je bericht is ontvangen we proberen binnen 24 uur je vraag
                    te beantwoorden
                  </div>
                ) : (
                  <div></div>
                )}
                {isnotarrived ? (
                  <div>
                    je bericht is niet ontvangen je kan ons mailen op
                    plutendo5@gmail.com
                  </div>
                ) : (
                  <div></div>
                )}
              </form>
              <div className='mt-12'>
                <h3 className='text-xl flex items-center justify-center font-semibold pb-4'>
                  Contactgegevens
                </h3>
                <p className='flex items-center justify-center md:justify-start mb-4'>
                  <svg
                    aria-hidden='true'
                    data-prefix='fas'
                    data-icon='envelope'
                    className='w-4 mr-4'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='currentColor'
                      d='M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z'
                    ></path>
                  </svg>
                  <Link href='mailto:plutendo5@gmail.com'>
                    <a target='_blank'>plutendo5@gmail.com</a>
                  </Link>
                </p>
              </div>
            </div>
            {/* <div className='grow-0 shrink-0  basis-auto mb-12 md:mb-0 w-full md:w-7/12 px-3 lg:px-12'>
              <h2 className='text-xl font-bold mb-6'>Veelgestelde vragen</h2>
              <p className='font-bold mb-2'>
                Ik heb al rij ervaring via een andere rijschool, kan ik ook bij
                Rijschool Prof-Drive terecht?
              </p>
              <p className='text-gray-500 mb-6'>
                Ja, Rijschool Prof-Drive biedt rijlessen aan voor zowel
                startende als voor de gevorderde cursisten.
              </p>
              <p className='font-bold mb-2'>
                Kan ik met 16,5 jaar rijlessen bij jullie nemen ?
              </p>
              <p className='text-gray-500 mb-6'>Ja, dat kan!</p>
              <p className='font-bold mb-2'>
                Wat zijn de voordelen van een tussentijdse toets?
              </p>
              <p className='text-gray-500 mb-6'>
                Na afloop van de tussentijdse toets geeft de examinator advies
                op diverse onderdelen. Zo weet je precies waar je nog aan moet
                werken. Verder kun je alvast wennen aan de examensituatie,
                waarbij nervositeit grotendeels weggenomen kan worden. Tijdens
                de toets kun je vrijstelling verdienen voor het onderdeel
                bijzondere manoeuvres op het eerstvolgende praktijkexamen.
                Daarom zit er in elk pakket een gratis tussentijdse toets!
              </p>

              <p className='font-bold mb-2'>
                Moet ik een theoriecertificaat hebben voordat ik kan beginnen
                met rijlessen?
              </p>
              <p className='text-gray-500'>
                Je kunt tijdens de rijopleiding alsnog je theoriecertificaat
                halen. Als je je theorie maar voor het praktijkexamen hebt!
              </p>
            </div> */}
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
