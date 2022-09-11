import React from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import deleteLocalStorage from '../Hooks/deleteLocalStorage'

interface Props {
  userName: {
    name:string,
    lastname: string
  }
}

const createLink = (text:string, href:string) => {
  return <Link 
          to = {href} 
          className = "text-center w-75 h-25 mb-1 text-dark" 
          style = {{ backgroundColor: "rgba(0,0,0,0.2)", border: "2px outset black", textDecoration: "none", paddingTop: "3%"}} 
          >{text}</Link>
}

export default function Settings({userName}: Props) {

  function logOut() {
    deleteLocalStorage("username")
    location.reload()
  }
    
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title> Settings </Modal.Title>
      </Modal.Header>
      <Modal.Body style = {{width: "100%", height: "50vh"}} className = "d-flex flex-column align-items-center justify-content-around">
          {createLink("My Profile", `/${userName.name}&${userName.lastname}/${uuid()}`)}
          {createLink("Create Post", `/post/${uuid()}`)}
          <button className = "w-75 h-25 mb-1" style = {{ backgroundColor: "rgba(0,0,0,0.2)"}} >Liked Posts</button>
          <button className = "w-75 h-25 mb-1" style = {{ backgroundColor: "rgba(0,0,0,0.2)"}} >Commented Posts</button>
          <button onClick = {() => logOut()} className = "bg-danger w-75 h-25">Log out</button>
      </Modal.Body>
    </>
  )
}
