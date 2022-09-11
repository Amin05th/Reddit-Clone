const PREFIX = 'reddit-'

export default function deleteLocalStorage(key:string) {
    return localStorage.removeItem(PREFIX+key)
}