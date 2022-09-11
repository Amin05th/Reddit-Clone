import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

interface Props {
    userName: {
        name: string,
        lastname: string
    }
}

export default function Post({userName}: Props) {
    const Title:any = useRef()
    const Message:any = useRef()
    const closeModal = () => location.href = "/"
    function createPost() {
        axios.post('http://localhost:3000/createPost', {
            name: userName.name,
            lastname: userName.lastname,
            title: Title.current.value,
            message: Message.current.value
        })
    }

  return (
    <Modal show = {true} onHide = {closeModal} className = "position-absolute" style = {{ height: "100vh", width: "100vw"}}>
        <Modal.Header closeButton>
            <Modal.Title> Create Post </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form action='/' onSubmit={() => createPost()}>
                <Form.Control required ref = {Title} placeholder='Title...' />
                <Form.Control required ref = {Message} style = {{resize: "none", height: "250px"}} placeholder='Message' as="textarea" />
                <Button type = "submit" className = "w-100">create Post</Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}
