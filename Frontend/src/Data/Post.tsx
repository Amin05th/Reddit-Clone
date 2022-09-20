import useFetch from '../Hooks/useFetch'

export async function getPostById(id: (string | undefined | never)) {
    const post = await useFetch(`/post/${id}`, {
        method: 'GET'
    })
    return post
}