import React, { useRef, Dispatch, SetStateAction } from 'react'
import { Form, Button } from 'react-bootstrap'
import useFetch from '../Hooks/useFetch'
import { Link } from "react-router-dom"

interface Props {
  setUser: Dispatch<SetStateAction<{name: string, lastname:string, id: string}>>
}

export default function LogIn({setUser}:Props) {
  const email:any = useRef()
  const password: any = useRef()
  const errorMessage: any = useRef()

  async function onSubmit(e:any) {
    e.preventDefault()
    const data = await useFetch('/login', {
      method: 'POST',
      data: {
        email: email.current.value,
        password: password.current.value
      }
    })
    setUser(data)
    window.location.href = '/'
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center h-100' style = {{backgroundColor: "rgba(0,0,0,0.2)"}}>
        <Form onSubmit={onSubmit} className = "d-flex flex-column justify-content-around align-items-center p-2" style = {{height: "30%", width: "30%", backgroundColor: "white"}}>
            <Link to = "/" className = "text-dark align-items-center" style = {{textDecoration: "none", fontSize: "20px"}}>Log in</Link>
            <Form.Control type = "email" ref = {email} required placeholder='Email ...'/>
            <Form.Control type = "password" ref = {password} required placeholder='Password ...'/>
            <Button type = "submit" className = "w-100">Log In</Button>
            <p className = "text-danger" data-testid = "error" ref = {errorMessage}></p>
        </Form>
    </div>
  )
}