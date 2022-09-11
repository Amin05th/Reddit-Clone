import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'

interface Props {
  userName: any
}

export default function Startpage({userName}:Props) {
  return (
    <Container fluid>
        <Header userName = {userName}/>
    </Container>
  )
}
