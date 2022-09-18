import React, {useState, Dispatch, SetStateAction} from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Body from './Body'

export default function Profil() {
  const {id, lastname, name} = useParams()
  const [searchResult, setSearchResult] = useState([{name: '', lastName: ''}])
  
  return (
    <div style = {{height: "100vh", width: "100vw"}} className = "d-flex flex-column">
      <Header setSearchResult = {setSearchResult} lastname = {lastname} name = {name}/>
      <Body searchResult = {searchResult} name = {name} lastname = {lastname}/>
    </div>
  )
}
