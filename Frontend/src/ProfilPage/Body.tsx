import React, { useState, useEffect } from 'react'
import SearchResult from "../Components/SearchResult"
import { getAllUsersPosts } from "../Data/Users"
import { Link } from "react-router-dom"

interface Props {
  searchResult:{
    name: string,
    lastName: string
  }[],
  name: string | undefined,
  lastname: string | undefined
}

// todo: make this global that also startpage can use it

export default function Body({searchResult, name, lastname}:Props) {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
      async function getPosts() {
        const posts = await getAllUsersPosts(name, lastname)
        setPosts(posts)
      }
      getPosts()
    }, [])

  return (
    <div style = {{flexGrow: 35}}>
        <SearchResult searchResult = {searchResult}/>
        <div className = "d-flex h-100 w-100" style = {{gap: "5%"}}>
          {posts.map((post: any) => {
            return <Link className = "text-dark text-decoration-none m-3" style = {{fontSize: "200%"}} to={`/post/${post.id}`} key={post.id}>{post.title}</Link>
          })}
        </div>
    </div>
  )
}
