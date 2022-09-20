import React, { useState } from 'react'
import { Button } from "react-bootstrap"
import Setting from './Settings'
import { Modal } from 'react-bootstrap'
import SearchResult from '../Components/SearchResult'
import SearchBar from "../Components/SearchBar"

interface Props {
  user: {
    name: string,
    lastname: string
  }
}

export default function Header({user}:Props) {
  const [openModal, setOpenModal] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const handleShow = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
    <div className = "d-flex justify-content-around" style = {{marginTop: "1%"}}>
      <div className = "d-flex flex-column" style={{width: "70%", height: "100vh"}}>
        <SearchBar getSearchResult = {setSearchResult}/>
        {searchResult.length >= 1 && <SearchResult searchResult = {searchResult}/>}
      </div>

      {/* show something if user is logged in and another thing if he is not logged in */}
      {user.name === '' ? 
      <>
        <Button href = "/Login" variant='outline-primary' style = {{width: "150px", height: "38px"}}>Log In</Button>
        <Button href = "/Signin" style = {{width: "150px", height: "38px"}}>Sign In</Button>
      </>
      : 
      <div onClick={handleShow} className = "d-flex justify-content-center align-items-center" style = {{width: "300px", backgroundColor: "lightgray", height: "38px"}}>
        {user.name} {user.lastname}
      </div>
      }
        <Modal show = {openModal} onHide = {handleClose}>
          <Setting user = {user} />
        </Modal>
    </div>
  )
}