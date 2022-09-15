import axios from "axios"

export async function getAllUsers(){
    const users = await axios.get('http://localhost:3001/users')
    return users.data
}

export async function getAllUsersPosts(name: (string | undefined), lastname: (string | undefined)) {
    const posts = await axios.get(`http://localhost:3000/posts/${name}/${lastname}`)
    return posts.data
}