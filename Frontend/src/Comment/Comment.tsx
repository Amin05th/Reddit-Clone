import React, { useState } from 'react'
import { usePost } from '../Context/usePost'
import { useAsyncFn } from '../Hooks/useAsync'
import { createComment, updateComment, deleteComment } from '../Services/comment'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { FaReply, FaHeart, FaRegHeart, FaTrash, FaEdit } from 'react-icons/fa'
import Icons from './Icons'

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

export default function Comment({message, user, createdAt, id}: Props) {
  const [ isReplying, setIsReplying ]:any = useState(false)
  const [ areCommentsHidden, setAreCommentsHidden ] = useState(false)
  const [ isEdditing, setIsEdditing ] = useState(false)


  const { execute: createcomment, ...createdComments } = useAsyncFn(createComment)
  const { execute: updatecomment, ...updatedComments  } = useAsyncFn(updateComment)
  const { execute: deletecomment } = useAsyncFn(deleteComment)
  const { getReplies, post, saveAllComments, updateComments, deleteComments }:any = usePost()
  const childComments = getReplies(id)
  const likedByMe = false // change it to be in Database
  
  function onCommentReply(message:string){
    return createcomment(post.id, message, id)
            .then((comment: any) => {
              setIsReplying(false)
              saveAllComments(comment)
            })
  }

  function onCommentEdit(message: string) {
    return updatecomment(post.id, message, id)
          .then((comment: any) => {
            setIsEdditing(false)
            updateComments(id, comment.message)
          })
  }

  function onCommentDelete() {
    return deletecomment(post.id, id)
           .then((comment:any) => {
            deleteComments(comment.id)
           })
  }

  return (
    <>
      <div className = "p-1 d-flex justify-content-between flex-column comment">
        <div className = "d-flex justify-content-between header">
          <span style = {{fontWeight: "bold"}}>Amin</span>
          <span>
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        <div style = {{whiteSpace: "pre-wrap", marginLeft: '.5rem', marginTop: '.5rem'}}> {message}</div>
        <div className = "d-flex mt-1">
          <Icons Icon={likedByMe ? FaHeart : FaRegHeart} isActive={false}>2</Icons>     
          <Icons Icon={FaReply} isActive={false} onClick={() => setIsReplying((prev:any) => !prev)}/> 
          <Icons Icon={FaEdit} isActive={false}  onClick = {() => setIsEdditing((prev) => !prev)}/> 
          <Icons Icon={FaTrash} isActive={false} color = {'text-danger'} onClick = {() => onCommentDelete()}/> 
        </div>
      </div>

      {isEdditing && (
        <div>
          <CommentForm 
          autofocus
          submitComment={onCommentEdit}
          isActive={isEdditing}
          error={updatedComments.error}
          loading={updatedComments.loading}
          initalValue={message}/>
        </div>
      )}

      {isReplying && (
        <div>
          <CommentForm 
          autofocus 
          submitComment = {onCommentReply}
          loading = {createdComments.loading}
          error = {createdComments.error}/>
        </div>
      )}

      {childComments?.length > 0 && (
          // todo: understand why every nastaed comment gets more margin on the inital margin
        <>
        <div className = {`${areCommentsHidden? 'd-none': 'd-flex'}`}>
          <button onClick={() => setAreCommentsHidden(true)} style = {{border: 'none', backgroundColor: "hsl(235, 50%, 67%)", padding: 0, width: "5px", marginTop: ".5rem",
                            position: 'relative', cursor: 'pointer', outline: 'none', transform: "translateX(-50%)" }}/>

          <div className = 'ps-5 flex-grow-1'>
            <CommentList comments={childComments}/>
          </div>
        </div>
        <button className = {`${!areCommentsHidden? 'd-none': 'd-block'} button`} onClick = {() => setAreCommentsHidden(false)}>Show Relies</button>
        </>
      )}
    </>
  )
}
