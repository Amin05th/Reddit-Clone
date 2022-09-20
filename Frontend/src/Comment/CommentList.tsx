import React from 'react'
import Comment from './Comment'

interface Props {
  comments: any
}

export default function CommentList({ comments }: Props) {
  return comments.map((comment:any) => {
        return <div key = {comment.id}>
          <Comment {...comment}/>
        </div>
      })
}
