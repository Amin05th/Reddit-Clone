import React, { createContext, useContext , useState } from 'react'
import { useAsyncFn } from '../Hooks/useAsync'
import { createComment, updateComment, deleteComment, toggleLikeComment } from '../Services/comment'


interface PostContext {
    dateFormatter: Intl.DateTimeFormat
    Create: {
      createcomment: Object 
      error: string | undefined
      loading: boolean | undefined
      value: any | undefined
    }
    Update: {
      updatecomment: Object 
      error: string | undefined
      loading: boolean | undefined
      value: any | undefined
    }
    Delete: {
      deletecomment: Object 
      error: string | undefined
      loading: boolean | undefined
      value: any | undefined
    }
    Toggle: {
      togglelikecomment: Object 
      error: string | undefined
      loading: boolean | undefined
      value: any | undefined
    }
}

const Comment = createContext<PostContext | null>(null)

export function useComment() {
  return useContext(Comment)
}

export function CommentProvider({children}:any) {
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    })
    const { execute: createcomment, ...createdComments } = useAsyncFn(createComment)
    const { execute: updatecomment, ...updatedComments  } = useAsyncFn(updateComment)
    const { execute: deletecomment, ...deletecomments } = useAsyncFn(deleteComment)
    const { execute: togglelikecomment, ...togglelike } = useAsyncFn(toggleLikeComment)


  return (
    <Comment.Provider value = {{
        dateFormatter,
        Create: {createcomment, ...createdComments},
        Update: {updatecomment, ...updatedComments},
        Delete: {deletecomment, ...deletecomments},
        Toggle: {togglelikecomment, ...togglelike}
    }}>  
      {children}
    </Comment.Provider>
  )
}
