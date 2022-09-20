import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'

interface Props {
  user: {
    name: string
    lastname: string
  }
}

export default function Startpage({user}:Props) {
  return (
    <Container fluid>
        <Header user = {user}/>
    </Container>
  )
}
