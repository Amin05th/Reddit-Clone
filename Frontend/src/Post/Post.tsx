import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById } from '../Data/Post'
import CommentForm from './CommentForm'
import { CloseButton } from 'react-bootstrap'
import { useAsyncFn } from '../Hooks/useAsync'
import { createComment } from '../Services/comment'

interface Post {
  title:string
  message:string
  id: string
}

export default function Post() {
  const [post, setPost] = useState<undefined | Post>({title: '', message: '', id: ''})
  const [comment, setComment]:any = useState([])
  const { id } = useParams()
  const goToPreviousPage = () => history.back()
  const { execute, value: postValue, loading: postLoading } = useAsyncFn(getPostById)
  const { execute: createcomment, value: commentValue, loading: commentLoading, error } = useAsyncFn(createComment)

  useEffect(() => {
    execute(id)
    setPost(postValue)
  }, [postLoading])

  function submitComment(message: string) {
    return createcomment('12417c6d-90a0-4fe1-9547-cd842c3bf491', message, null).then((comment:any) => {
      setComment((prevState:any[]) => {
        return [comment, ...prevState]
      })
    })
  }

  // todo: make Context

  useEffect(() => {
    setInterval(() => {
      console.log(comment)
    }, 10000)

  }, [comment])

  return (
    <div className = "ms-3 d-flex flex-column" style = {{height: "100vh", width: "100vw"}}>
      <CloseButton onClick={goToPreviousPage} className = "position-absolute" style = {{top: 0, right: "1%"}}/>
      <h1>{post?.title}</h1>
      <article>{post?.message}</article>
      <h4 className = "my-3">Comments</h4>
      <section>
        <CommentForm 
          submitComment = {submitComment}
          loading= {commentLoading}
          error = {error}
          />
      </section>

    </div>
  )
}
