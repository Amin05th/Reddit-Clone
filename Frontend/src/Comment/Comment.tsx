import React, { useState } from 'react'
import { usePost } from '../Context/usePost'
import { useComment } from '../Context/useComment'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { FaReply, FaHeart, FaRegHeart, FaTrash, FaEdit } from 'react-icons/fa'
import Icons from './Icons'

interface Props {
    message: string
    user: {
      name: string
      id:string
    }
    createdAt: string
    id: string
    currentUserId: string
    likedByMe: boolean
    likeCount: number
}

export default function Comment({message, user, createdAt, id, currentUserId, likedByMe, likeCount}: Props) {
  const [ isReplying, setIsReplying ] = useState(false)
  const [ areCommentsHidden, setAreCommentsHidden ] = useState(false)
  const [ isEdditing, setIsEdditing ] = useState(false)
  const { getReplies, post, saveAllComments, updateComments, deleteComments, toggleLikeComments }:any = usePost()
  const { dateFormatter ,Create, Update, Delete, Toggle }:any = useComment()
  const childComments = getReplies(id)

  function onCommentReply(message:string){
    return Create.createcomment(post.id, message, id)
            .then((comment: any) => {
              setIsReplying(false)
              saveAllComments(comment)
            })
  }

  function onCommentEdit(message: string) {
    return Update.updatecomment(post.id, message, id)
          .then((comment: any) => {
            setIsEdditing(false)
            updateComments(id, comment.message)
          })
  }
  
  function onCommentDelete() {
    return Delete.deletecomment(post.id, id)
           .then((comment:any) => {
            deleteComments(comment.id)
           })
  }

  function toggleLike() {
    return Toggle.togglelikecomment(post.id, id)
    .then(({addLike}:any) => {
      toggleLikeComments(id, addLike)
    })
  }

  return (
    <>
      <div className = "p-1 d-flex justify-content-between flex-column comment">
        <div className = "d-flex justify-content-between header">
          <span style = {{fontWeight: "bold"}}>{user.name}</span>
          <span>
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        <div className='message'>{message}</div>
        <div className = "d-flex mt-1">

          <Icons 
            disabled = {Toggle.loading} 
            onClick = {() => toggleLike()} 
            Icon={likedByMe ? FaHeart : FaRegHeart} 
            isActive={false}>{likeCount}
            </Icons>

          <Icons 
            Icon={FaReply} 
            isActive={isReplying} 
            onClick={() => setIsReplying((prev:boolean) => !prev)}/>

          {currentUserId === user.id && (
            <>

              <Icons 
                Icon={FaEdit} 
                isActive={isEdditing} 
                onClick= {() => setIsEdditing((prev) => !prev)}/>

              <Icons 
                disabled = {Delete.loading} 
                Icon={FaTrash} 
                isActive={false} 
                color = {'text-danger'} 
                onClick = {() => onCommentDelete()}/>
            </>
          )}
        </div>
      </div>

      {isEdditing && (
        <div>
          <CommentForm 
          autofocus
          submitComment={onCommentEdit}
          isActive={isEdditing}
          error={Update.error}
          loading={Update.loading}
          initalValue={message}/>
        </div>
      )}

      {isReplying && (
        <div>
          <CommentForm 
          autofocus 
          submitComment = {onCommentReply}
          loading = {Create.loading}
          error = {Create.error}/>
        </div>
      )}

      {childComments?.length > 0 && (
        <>
        <div className = {`${areCommentsHidden? 'd-none': 'd-flex'}`}>
          <button onClick={() => setAreCommentsHidden(true)} className = "hideComments"/>

          <div className = 'ps-5 flex-grow-1'>
            <CommentList comments={childComments} id = {currentUserId}/>
          </div>
        </div>
        <button className = {`${!areCommentsHidden? 'd-none': 'd-block'} button`} onClick = {() => setAreCommentsHidden(false)}>Show Relies</button>
        </>
      )}
    </>
  )
}
