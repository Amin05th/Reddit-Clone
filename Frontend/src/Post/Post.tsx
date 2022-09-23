import React from 'react'
import CommentList from '../Comment/CommentList'
import CommentForm from '../Comment/CommentForm'
import { CloseButton } from 'react-bootstrap'
import { useAsyncFn } from '../Hooks/useAsync'
import { usePost } from '../Context/usePost'
import { createComment } from '../Services/comment'

interface Post {
  title:string
  message:string
  id: string
}

export default function Post() {
  const { execute: createcomment, loading, error } = useAsyncFn(createComment)
  const goToPreviousPage = () => history.back()
  const { post, saveAllComments, rootComments }: any  = usePost()

  function submitComment(message: string) {
    return createcomment(post.id, message, null).then(
      saveAllComments
    )
  }

  // todo: make Context
  return (
    <div className = "ms-3 d-flex flex-column" style = {{height: "100vh", width: "100vw"}}>
      <CloseButton onClick={goToPreviousPage} className = "position-absolute" style = {{top: 0, right: "1%"}}/>
      <h1>{post?.title}</h1>
      <article>{post?.message}</article>
      <h4 className = "my-3">Comments</h4>
      <section className = "overflow-auto">
        <CommentForm 
          submitComment = {submitComment}
          loading= {loading}
          error = {error}
          />
        {rootComments != null && rootComments?.length > 0 && 
            <CommentList comments = {rootComments}/>
        }
      </section>

    </div>
  )
}
