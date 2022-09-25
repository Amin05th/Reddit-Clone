import React, {FormEvent, useState} from 'react'
import { Form, Button } from 'react-bootstrap'

interface Props<T> {
  submitComment: (message: string) => Promise<T>
  loading: boolean
  error: string | undefined
  initalValue?: string
  autofocus?: boolean
  isActive?: boolean
}

export default function CommentForm<T>({submitComment, loading, error, initalValue = "", autofocus = false}: Props<T>) {
  const [message, setMessage] = useState(initalValue)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    submitComment(message).then(() => setMessage(''))
  }

  return (
    <Form onSubmit={handleSubmit}>
        <div className = "d-flex gap-1">
            <Form.Control 
                as="textarea" 
                className = "commentInput" 
                autoFocus = {autofocus}
                onChange = {(e) => setMessage(e.target.value)}
                value = {message} />
            <Button type='submit'>
                {loading ? 'loading' : 'post'}
            </Button>
        </div>
        <div className = "text-danger">{error}</div>
    </Form>
  )
}
