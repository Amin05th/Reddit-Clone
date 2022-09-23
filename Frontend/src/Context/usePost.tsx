import React, { createContext, useContext , useState, useMemo, useEffect } from 'react'
import { useAsync } from '../Hooks/useAsync'
import { getPostById } from '../Data/Post'
import { useParams } from 'react-router-dom'

interface PostContext {
  post: any
  saveAllComments: any
  rootComments: any
  getReplies: any
  updateComments:any
  deleteComments:any
}

const Post = createContext<PostContext | null>(null)

export function usePost() {
  return useContext(Post)
}

export function PostProvider({children}:any) {
  const { id } = useParams()
  const [comments, setComments]:any = useState([])
  const { value, loading, error}:any = useAsync(() => getPostById(id), [id!])
  const groupCommentsByParentId = useMemo(() => {
    const group:any = {}
    comments.forEach((comment: any) => {
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })
    return group
  }, [comments])


  useEffect(() => {
    if(value?.comments == null) return
    setComments(value.comments)
  }, [value?.comments])

  function getReplies(parentId:string) {
    return groupCommentsByParentId[parentId]
  }

  function saveAllComments(comment:any) {
    setComments((prevState:any) => {
      return [comment, ...prevState]
    })
  }

  function updateComments(id: string, message: string) {
    setComments((prevState: any) => {
      return prevState.map((state: any) => {
        if(state.id === id) return {...state, message}
        else return state
      })
    })
  }

  function deleteComments(id: string) {
    setComments((prevState: any) => {
      return prevState.filter((comment:any) => comment.id !== id)
    })
  }

  return (
    <Post.Provider value = {{
      post: {id, ...value},
      saveAllComments,
      updateComments,
      deleteComments,
      rootComments: groupCommentsByParentId[null],
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
