import { save, load, remove } from 'react-cookies'
import { useState, useEffect } from 'react'

const PREFIX = 'reddit-clone - '

export default function saveCookies(key:string, Initalvalue:(string| object)) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = load(prefixedKey)
        if(jsonValue != null) return jsonValue
        if(typeof Initalvalue === 'function') {
            return Initalvalue()
        }else {
            return Initalvalue
        }
    })

    useEffect(() => {
        save(prefixedKey, value, { path: '/' })
    }, [value, setValue])

    return [value, setValue]
}

export function deleteCookie(key: string) {
    const prefixedKey = PREFIX + key
    remove(prefixedKey)
}