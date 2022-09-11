import axios from "axios";

export async function getAllUsers(){
    const users = await axios.get('http://localhost:3000/users')
    return users.data
}