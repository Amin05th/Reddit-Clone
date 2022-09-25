import useFetch from '../Hooks/useFetch'

export async function getPostById(id: (string | undefined | never)) {
    return await useFetch(`/post/${id}`, {
        method: 'GET'
    })
}