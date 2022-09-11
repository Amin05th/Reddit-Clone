import React from 'react'
import SearchResult from "../Components/SearchResult"

interface Props {
  searchResult:{
    name: string,
    lastName: string
  }[]
}

export default function Body({searchResult}:Props) {
  return (
    <div style = {{flexGrow: 35}}>
        <SearchResult searchResult = {searchResult}/>
    </div>
  )
}
