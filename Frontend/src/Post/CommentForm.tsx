import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

export default function CommentForm() {
  const [comment, setComment] = useState('')

  function handleSubmit(e: any) {
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit}>
        <div className = "d-flex gap-1">
            <Form.Control 
                as="textarea" 
                style = {{resize: "none", height: "70px", width: "90%", borderRadius: ".5rem",
                          padding: ".5em", border: "2px solid hsl(235, 50%, 74%)", lineHeight: "1.4"}}/>
                {/* todo resize button for mobile devices */}
            <Button type='submit'>
                {/* todo: make if its loading or not */}
                loading
            </Button>
        </div>
        <div className = "text-danger"></div>
    </Form>
  )
}
