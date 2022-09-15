import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById } from '../Data/Post'
import CommentForm from './CommentForm'
import { CloseButton } from 'react-bootstrap'

export default function Post() {
  const [post, setPost]:any = useState()
  const { id } = useParams()
  const goToPreviousPage = () => history.back()
  
  useEffect(() => {
    async function getSpecificPost(){
      const post = await getPostById(id)
      setPost(post)
    }
    getSpecificPost()
  }, [])

  return (
    <div className = "ms-3 d-flex flex-column" style = {{height: "100vh", width: "100vw"}}>
      <CloseButton onClick={goToPreviousPage} className = "position-absolute" style = {{top: 0, right: "1%"}}/>
      <h1>{post?.title}</h1>
      <article>{post?.message}</article>
      <h4 className = "my-3">Comments</h4>
      <section>
        <CommentForm />
      </section>
    </div>
  )
}
