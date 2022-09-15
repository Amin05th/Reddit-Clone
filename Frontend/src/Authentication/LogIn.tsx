import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from "react-router-dom"

interface Props {
  setUserName: any
}

export default function LogIn({setUserName}:Props) {

  const email: any = useRef()
  const password: any = useRef()
  const errorMessage: any = useRef()

  function onSubmit(e:any) {
    e.preventDefault()
    axios.post('http://localhost:3001/login', {
      email: email.current.value,
      password: password.current.value ,
    }).then(res => {
      // todo => has to change the login signup component with logged in commponent
      if(res.data.name.includes('valid')) return errorMessage.current.textContent = res.data
      setUserName(res.data)
      return window.location.href = '/'
    })
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center h-100' style = {{backgroundColor: "rgba(0,0,0,0.2)"}}>
        <Form onSubmit={(e) => onSubmit(e)} className = "d-flex flex-column justify-content-around align-items-center p-2" style = {{height: "30%", width: "30%", backgroundColor: "white"}}>
            <Link to = "/" className = "text-dark align-items-center" style = {{textDecoration: "none", fontSize: "20px"}}>Log in</Link>
            <Form.Control type = "email" ref = {email} required placeholder='Email ...'/>
            <Form.Control type = "password" ref = {password} required placeholder='Password ...'/>
            <Button type = "submit" className = "w-100">Log In</Button>
            <p className = "text-danger" data-testid = "error" ref = {errorMessage}></p>
        </Form>
    </div>
  )
}
