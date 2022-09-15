import axios from "axios"

export async function getPostById(id: (string | undefined)) {
    const post = await axios.get(`http://localhost:3001/post/${id}`)
    return post.data
}