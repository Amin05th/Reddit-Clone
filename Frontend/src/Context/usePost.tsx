import React, { createContext, useContext , useState, useMemo, useEffect } from 'react'
import { useAsync } from '../Hooks/useAsync'
import { getPostById } from '../Data/Post'
import { useParams } from 'react-router-dom'

interface PostContext {
  post: any
  saveAllComments: any
  rootComments: any
  getReplies: any
}

const Post = createContext<PostContext | null>(null)

export function usePost() {
  return useContext(Post)
}

export function PostProvider({children}:any) {
  const { id } = useParams()
  const { value: post = {}, loading, error} = useAsync(() => getPostById(id), [id!])
  const [comments, setComments]:any = useState([])
  const groupCommentsByParentId = useMemo(() => {
    const group: any = {}
    comments.forEach((comment: any) => {
      group[comment.parentID] ||= []
      group[comment.parentID].push(comment)
    })
    return group
  }, [comments])

  useEffect(() => {
    if(post?.comments == null) return
    setComments(post.comments)
  }, [post?.comments])

  function getReplies(parentId:any) {
    return groupCommentsByParentId[parentId]
  }

  function saveAllComments(comment:any) {
    setComments((prevState:any) => {
      return [comment, ...prevState]
    })
  }

  return (
    <Post.Provider value = {{
      post: {id, ...post},
      saveAllComments,
      rootComments: groupCommentsByParentId[undefined],
      getReplies
    }}>  
      {loading ? (
      <h1>loading</h1>
      ): error ? (
        <h1 className = "text-danger">{error}</h1>
      ) : (
        children
      )
    }
    </Post.Provider>
  )
}
