import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
const [bedrijfsNaam, setbedrijfsNaam] = useState('')
const [functie, setfunctie] = useState('overig')
const [stuurTags, setStuurTags] = useState(0)
const [vacatureNaam, setVacatureNaam] = useState('')
const [beschrijving, setBeschrijving] = useState(
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
   
          </span>`
)
const [img, setImg] = useState('')
const [salaris, setSalaris] = useState('€ 2.400 - € 4.000')
const [vacatureLink, setVacatureLink] = useState('')
const [dienstverband, setDienstverband] = useState('fulltime')
const [progress, setProgress] = useState(0)
  return (
    <AppContext.Provider
      value={{
        progress,
        setProgress,
        vacatureLink,
        setVacatureLink,
        beschrijving,
        dienstverband,
        setDienstverband,
        setBeschrijving,
        vacatureNaam,
        setVacatureNaam,
        stuurTags,
        setStuurTags,
        functie,
        setfunctie,
        bedrijfsNaam,
        setbedrijfsNaam,
        img,
        setImg,
        salaris,
        setSalaris,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
