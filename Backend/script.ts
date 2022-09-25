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
const COMMENT_SELECT_FIELDS = {
    id: true,
    message: true,
    parentId: true,
    createdAt: true,
    user: {
      select: {
        id: true,
        name: true,
      },
    },
}

app.register(cors, {
    origin: process.env.WEBURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
})

app.register(cookie)

app.get('/users', async () => {
    return await prisma.user.findMany()
})

app.get('/post/:id', async (req: any) => {
    const { id } = JSON.parse(req.cookies.redditCloneUser)
    const postId = req.params.id
    return await prisma.post.findUnique({where: {id: postId}, 
    select: {
        title: true,
        message:true,
        id: true,
        comments: {
            orderBy: {
                createdAt: "desc"
            },
            select: {
                ...COMMENT_SELECT_FIELDS,
                _count: {select: {likes: true}}
            }
        }
    }}).then(async post => {
        const likes = await prisma.likes.findMany({
            where: {
                userId: id,
                commentsId: {in: post!.comments.map(comment => comment.id)} 
            }
        })
        
        return {
            ...post,
            comments: post?.comments.map(comment=> {
                const {_count, ...commentFields} = comment
                return {
                    ...commentFields,
                    likeCount: _count.likes,
                    likedByMe: likes.find(like => like.commentsId === comment.id),
                }
            })
        }
    })
    // todo: make error Handlings
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
    return {name: user.name, lastname: user.lastname, id:user.id}
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

app.post('/posts/:id/comments', async (req: any) => {
    const user = JSON.parse(req.cookies.redditCloneUser)
    return await prisma.comments.create({
        data: {
            message: req.body.message,
            postId: req.params.id,
            userId: user.id,
            parentId: req.body.parentId
        },
        select: COMMENT_SELECT_FIELDS
    }).then(comment => {
        return {
            ...comment,
            likeCount: 0,
            likedByMe: false,
        }
    })
})

app.post('/posts/:postId/comments/:commentid/toggleLikes', async (req: any) => {
    const { id } = JSON.parse(req.cookies.redditCloneUser)
    const data = {
        commentsId: req.params.commentid,
        userId: id
    }

    const like = await prisma.likes.findUnique({
        where: {
            userId_commentsId: data
        }
    })

    if(like == null) {
        return await prisma.likes.create({data}).then(() => {
            return { addLike: true }
        })
    }
    else {
        return await prisma.likes.delete({where: {userId_commentsId: data}}).then(() => {
            return { addLike: false }
        })
    }
})

app.put('/posts/:postId/comments/:commentid', async (req: any) => {
    const { id } = JSON.parse(req.cookies.redditCloneUser)
    const { userId }:any = await prisma.post.findUnique({
        where: {id: req.params.postId},
        select: { userId: true }
    })
    
    if(id !== userId) return // todo should be an error

    return await prisma.comments.update({
        where: {id: req.params.commentid},
        data: {message: req.body.message},
        select: {message: true}
    })
})

app.delete('/posts/:postId/comments/:commentid', async (req: any) => {
    const { id } = JSON.parse(req.cookies.redditCloneUser)
    const { userId }:any = await prisma.post.findUnique({
        where: {id: req.params.postId},
        select: { userId: true }
    })
    
    if(id !== userId) return // todo should be an error

    return await prisma.comments.delete({
        where: {id: req.params.commentid}
    })
})

app.listen({port: Port})


async function comparePasswords(typedInPassword:string, user:any) {
    const password = await bcrypt.compare(typedInPassword,user.password)
    return password
}


async function main() {
    // const users = await prisma.user.deleteMany()
    // console.log(users)

    // console.log(await prisma.post.findMany())

    // await prisma.user.deleteMany()
}

main()
    .catch(e => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })