import React, { createContext, useContext , useState, useMemo, useEffect } from 'react'
import { useAsync } from '../Hooks/useAsync'
import { getPostById } from '../Data/Post'
import { useParams } from 'react-router-dom'

interface PostContext {
  post: {
    id: string
    value: any
    error:string
    loading: boolean
  }
  saveAllComments: Object
  rootComments: Object
  getReplies: (parentId: string) => Object
  updateComments: (id: string, message: string) => void
  deleteComments: (id: string) => void
  toggleLikeComments: (id: string, addLike: boolean) => void
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

  function saveAllComments(comment:Object) {
    setComments((prevState:any) => {
      return [comment, ...prevState]
    })
  }

  function updateComments(id: string, message: string) {
    setComments((prevState: any) => {
      return prevState.map((state: {id: string}) => {
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

  function toggleLikeComments(id: string, addLike: boolean) {
    setComments((prevState: any) => {
      return prevState.map((comment: any) => {
        if(id === comment.id) {
          if(addLike) {
            return {
              ...comment,
              likedByMe: true,
              likeCount: comment.likeCount + 1
            }
          }
          else {
            return {
              ...comment,
              likedByMe: false,
              likeCount: comment.likeCount - 1 
            }
          }
        }else {
          return comment
        }
      })
    })
  }


  return (
    <Post.Provider value = {{
      post: {id, ...value},
      saveAllComments,
      updateComments,
      deleteComments,
      toggleLikeComments,
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
