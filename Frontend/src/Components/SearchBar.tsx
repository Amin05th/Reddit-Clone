import React, {useEffect, useState, Dispatch, SetStateAction} from 'react'
import { Form } from 'react-bootstrap'
import { getAllUsers } from "../Data/Users"

interface filtredUser {
  name: string,
  lastName: string
}

interface Props {
    getSearchResult: Dispatch<SetStateAction<filtredUser[]| never[]>>
}

interface user {
  name: string,
  lastname: string
}

export default function SearchBar({getSearchResult}:Props) {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([{name: "", lastName: ""}])

    useEffect(() => {
        async function filterData() {
          if(!search) return setSearchResult([])
          const filtredUser:filtredUser[] = []
          const users = await getAllUsers()
          users.forEach((user:user) => {
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
