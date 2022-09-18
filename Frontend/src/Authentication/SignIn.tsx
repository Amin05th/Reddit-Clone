import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch'

export default function SignIn() {
  const name: any = useRef()
  const lastname: any = useRef()
  const email: any = useRef()
  const password: any = useRef()
  const errorMessage: any = useRef()

  async function onSubmit(){
    const data = await useFetch('/signin', {
      method: 'POST',
      data: {
        name: name.current.value,
        lastname: lastname.current.value,
        email: email.current.value,
        password: password.current.value,
      }
    })
    validateData(data)
  }

  function validateData(createUser:any) {
     if(createUser.data === '') return window.location.href = '/'
     errorMessage.current.textContent = createUser.data
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-100' style = {{backgroundColor: "rgba(0,0,0,0.2)"}}>
        <Form onSubmit = {onSubmit} className = "d-flex flex-column justify-content-around align-items-center p-2" style = {{height: "45%", width: "30%", backgroundColor: "white"}}>
            <Link to = "/" className = "text-dark" style = {{textDecoration: "none", fontSize: "20px"}}>Sign In</Link>
            <Form.Control pattern='^((?!valid).)*$' title='Your name can not include valid' ref = {name} required placeholder='Name'/>
            <Form.Control ref = {lastname} required placeholder='Last Name'/>
            <Form.Control type = "email" ref = {email} required placeholder='Email'/>
            <Form.Control type='password' ref = {password} required placeholder='Password'/>
            <Button type='submit' className = "w-100">Sign In</Button>
            <p className = "text-danger" ref = {errorMessage}></p>
        </Form>
    </div>
  )
}