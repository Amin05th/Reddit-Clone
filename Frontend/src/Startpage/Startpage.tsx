import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'

interface Props {
  userName: {
    name: string
    lastname: string
  }
}

export default function Startpage({userName}:Props) {
  return (
    <Container fluid>
        <Header userName = {userName}/>
    </Container>
  )
}
