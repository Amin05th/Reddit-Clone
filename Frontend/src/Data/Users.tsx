import useFetch from '../Hooks/useFetch'

export async function getAllUsers(){
    const users = await useFetch('/users', {
        method: 'GET'
    })
    return users
}

export async function getAllUsersPosts(name: (string | undefined), lastname: (string | undefined)) {
    const posts = await useFetch(`posts/${name}/${lastname}`, {
        method: 'GET'
    })
    return posts
}