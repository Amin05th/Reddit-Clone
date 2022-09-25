import useFetch from '../Hooks/useFetch'

export async function getAllUsers(){
    return await useFetch('/users', {
        method: 'GET'
    })
}

export async function getAllUsersPosts(name: (string | undefined), lastname: (string | undefined)) {
    return await useFetch(`posts/${name}/${lastname}`, {
        method: 'GET'
    })
}