import React from 'react'
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"

interface Props {
    searchResult: any
}

export default function SearchResult({searchResult}:Props) {

  return (
    <div className = "mt-1 w-75 " style = {{maxHeight: "80vh", overflow: "auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginLeft: "1%"}}>
        {searchResult.map((result:any, index: number) => {
            return <Link to = {`/${result.name}&${result.lastName}/${uuid()}`} className = "d-flex m-3" style = {{ boxShadow: "0px  1px grey", textDecoration: "none", color: "black" }} key={index}>{result.name} {result.lastName}</Link>
        })}
    </div>
  )
}
