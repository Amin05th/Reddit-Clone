import React, { useState, useEffect } from 'react'
import SearchResult from "../Components/SearchResult"
import { getAllUsersPosts } from "../Data/Users"
import { Link } from "react-router-dom"
import { useAsyncFn } from '../Hooks/useAsync'

interface Searchresult {
  name: string,
  lastName: string
}

interface Post {
  title: string
  message: string
}

interface Props {
  searchResult: Array<never | Searchresult>
  name: string | undefined,
  lastname: string | undefined
}

// todo: make this global that also startpage can use it

export default function Body({searchResult, name, lastname}:Props) {
    const [posts, setPosts] = useState<Post[] | Array<null> | undefined>([])
    const {execute, value, loading} = useAsyncFn(getAllUsersPosts)
    
    useEffect(() => {
      execute(name, lastname)
      setPosts(value)
    }, [loading])

  return (
    <div style = {{flexGrow: 35}}>
        <SearchResult searchResult = {searchResult}/>
        <div className = "d-flex h-100 w-100" style = {{gap: "5%"}}>
          {posts?.map((post: any) => {
            return <Link className = "text-dark text-decoration-none m-3" style = {{fontSize: "200%"}} to={`/post/${post.id}`} key={post.id}>{post.title}</Link>
          })}
        </div>
    </div>
  )
}
