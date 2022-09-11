import {useEffect, useState} from 'react'

const PREFIX = 'reddit-'

export default function useLocalStorage(key: string, initalValue:(string| Object)) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initalValue === 'function'){
            return initalValue()
        }else{
            return initalValue
        }
    })

    useEffect(()=>{
    localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
