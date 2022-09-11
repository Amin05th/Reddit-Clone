import React from 'react'
import { Link } from "react-router-dom"
import SearchBar from '../Components/SearchBar'

interface Props {
  name: string | undefined
  lastname: string | undefined
  setSearchResult: React.Dispatch<React.SetStateAction<never[]>>
}

// todo: make the search User global

export default function Header({setSearchResult ,name, lastname}: Props) {
  
  return (
    <div className='d-flex justify-content-between align-items-center px-3' style = {{flexGrow: 1, backgroundColor: "#DCDCDC"}}>
        <SearchBar getSearchResult = {setSearchResult}/>
        <Link to = "/" className = "text-dark text-end" style = {{textDecoration: "none", width: "15%"}}>{name} {lastname}</Link>
    </div>
  )
}
