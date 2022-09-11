import React from 'react'
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"

interface Props {
    searchResult: any
}

export default function SearchResult({searchResult}:Props) {

  return (
    <>
        {searchResult.map((result:any, index: number) => {
            return <Link to = {`/${result.name}&${result.lastName}/${uuid()}`} className = "d-flex m-3" style = {{ boxShadow: "0px  1px grey", textDecoration: "none", color: "black" }} key={index}>{result.name} {result.lastName}</Link>
        })}
    </>
  )
}
