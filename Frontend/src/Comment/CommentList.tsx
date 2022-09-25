import React from 'react'
import Comment from './Comment'

interface Props {
  comments: any
  id:string
}

export default function CommentList({ comments,id }: Props) {
  return comments.map((comment: any) => {
        return <div key = {comment.id}>
          <Comment {...comment} currentUserId = {id}/>
        </div>
      })
}
