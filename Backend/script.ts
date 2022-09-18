import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import dotenv from 'dotenv'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

const app = fastify()
const Port = 3001
dotenv.config()
// const COMMENT_SELECT_FIELDS = {
//     id: true,
//     message: true,
//     parentId: true,
//     createdAt: true,
//     user: {
//       select: {
//         id: true,
//         name: true,
//       },
//     },
//   }

app.register(cors, {
    origin: process.env.WEBURL,
    methods: ["GET", "POST"],
    credentials:true,
})

app.register(cookie)

app.get('/users', async () => {
    return await prisma.user.findMany()
})

app.get('/post/:id', async (req: any) => {
    const postId = req.params.id
    const post = await prisma.post.findFirst({where: {id: postId}, 
    select: {
        title: true,
        message:true,
        id: true
    }})
    // todo: make error Handlings
    if(post == undefined) return
    return post
})

app.get('/posts/:name/:lastname', async (req: any) => {
    const name = req.params.name
    const lastname = req.params.lastname
    const user = await prisma.user.findFirst({where: {name: name, lastname: lastname}, include: {post: true}})
    if (user == undefined) return "404 User not found"
    return user.post
})

app.post('/signin', async (req:any, res:any) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        await prisma.user.create({
            data: {
                email: req.body.email,
                lastname: req.body.lastname,
                password: password,
                name: req.body.name
            },
            include: {post: true}
        })
    }
    catch (e) {
        res.send('Email is already used')
    }
})

app.post('/login', async (req:any) => {
    const user = await prisma.user.findFirst({where: {email: req.body.email}})
    if(user == undefined) return 'Email is not valid'
    const isPassword = await comparePasswords(req.body.password, user)
    if(!isPassword) return 'Password is not valid'
    return {name: user.name, lastname: user.lastname}
})

app.post('/createPost', async (req:any) => {
    const user = await prisma.user.findFirst({where: {name: req.body.name, lastname: req.body.lastname}})
    await prisma.post.create({
        data: {message: req.body.message, title: req.body.title, userId: user!.id},
        include: {
            user: true,
            comments: true
        }
    })
    
})

app.post('/posts/:id/comments', async (req:any) => {
    return await prisma.comments.create({
        data: {
            message: req.body.message,
            postId: req.params.id,
            userId: 'a6fb716d-2b5e-4ebe-875d-fcef3a482422',
            parentId: req.body.parentId
        },
    })
})

app.listen({port: Port})


async function comparePasswords(typedInPassword:string, user:any) {
    const password = await bcrypt.compare(typedInPassword,user.password)
    return password
}


async function main() {
    // const users = await prisma.comments.deleteMany()
    // console.log(users)

    // console.log(await prisma.post.findMany())

    // await prisma.post.deleteMany()
}

main()
    .catch(e => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })