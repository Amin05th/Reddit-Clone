import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

interface Props {
  submitComment: any
  loading: any
  error: any
  initalValue?: string
  autofocus?: boolean
}

export default function CommentForm({submitComment, loading, error, initalValue = "", autofocus = false}: Props) {
  const [message, setMessage] = useState(initalValue)

  function handleSubmit(e: any) {
    e.preventDefault()
    submitComment(message).then(() => setMessage(''))
  }

  return (
    <Form onSubmit={handleSubmit}>
        <div className = "d-flex gap-1">
            <Form.Control 
                as="textarea" 
                style = {{resize: "none", height: "70px", width: "90%", borderRadius: ".5rem",
                          padding: ".5em", border: "2px solid hsl(235, 50%, 74%)", lineHeight: "1.4"}}
                autoFocus = {autofocus}
                onChange = {(e) => setMessage(e.target.value)}
                value = {message} />
                {/* todo resize button for mobile devices */}
            <Button type='submit'>
                {loading ? 'loading' : 'post'}
            </Button>
        </div>
        <div className = "text-danger">{error}</div>
    </Form>
  )
}
