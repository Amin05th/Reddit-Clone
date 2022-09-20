import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import useFetch from '../Hooks/useFetch'

interface Props {
    user: {
        name: string,
        lastname: string
    }
}

export default function CreatePost({user}: Props) {
    const Title:any = useRef()
    const Message:any = useRef()
    const closeModal = () => location.href = "/"
    function createPosts() {
        useFetch('/createPost', {
            method: 'POST',
            data: {
                name: user.name,
                lastname: user.lastname,
                title: Title.current.value,
                message: Message.current.value
            }
        })
    }

  return (
    <Modal show = {true} onHide = {closeModal} className = "position-absolute" style = {{ height: "100vh", width: "100vw"}}>
        <Modal.Header closeButton>
            <Modal.Title> Create Post </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form action='/' onSubmit={createPosts}>
                <Form.Control required ref = {Title} placeholder='Title...' />
                <Form.Control required ref = {Message} style = {{resize: "none", height: "250px"}} placeholder='Message' as="textarea" />
                <Button type = "submit" className = "w-100">create Post</Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}
