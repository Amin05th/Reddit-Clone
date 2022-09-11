import React, {useEffect, useState} from 'react'
import { Form } from 'react-bootstrap'
import { getAllUsers } from "../Data/Users"

interface Props {
    getSearchResult: any
}

export default function SearchBar({getSearchResult}:Props) {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult]:any = useState([])

    useEffect(() => {
        async function filterData() {
          if(!search) return setSearchResult([])
          const filtredUser:any[] = []
          const users = await getAllUsers()
          users.forEach((user:any) => {
            if (user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || user.lastname.toLowerCase().indexOf(search.toLowerCase()) !== -1 ) {
              filtredUser.push({name: user.name, lastName: user.lastname})
              setSearchResult(filtredUser)
            }
          })
        }
        filterData()
      }, [search])

    useEffect(() => {
        getSearchResult(searchResult)
    }, [searchResult])

    return (
      <>
          <Form.Control value = {search} onChange = {(e) => setSearch(e.target.value)}  type="text"></Form.Control>
      </>
    )
}
