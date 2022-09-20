import React from 'react'
import { usePost } from '../Context/usePost'

interface Props {
    message: string
    user: any
    createdAt: any
    id: string
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short"
})

const comment = {
  color: 'hsl(235, 50%, 67%)',
  marginBottom: '.25rem',
  fontSize: '.75em',
  border: '1px solid hsl(235, 100%, 90%)', 
  borderRadius: '.5rem',
  fontWeight: "bold",
  width: "90%"
}

const header = {
  color: 'hsl(235, 50%, 67%)',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '.25rem',
  fontSize: '.75em',
  fontWeight: "bold"
}

export default function Comment({message, user, createdAt, id}: Props) {
  const { getReplies } = usePost()
  const childComments = getReplies(id)
  console.log(childComments)

  return (
    <>
      <div className = "p-1 d-flex justify-content-between flex-column" style = {comment}>
        <div className = "d-flex justify-content-between" style = {header}>
          <span style = {{fontWeight: "bold"}}>Amin</span>
          <span>
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        <div style = {{whiteSpace: "pre-wrap", marginLeft: '.5rem', marginTop: '.5rem'}}> {message}</div>
        <div className = "footer">

        </div>
      </div>
      {childComments?.length > 0 && console.log(childComments)}
    </>
  )
}
