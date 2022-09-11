import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

const app = fastify()
const Port = 3000

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
})

app.get('/users', async () => {
    return await prisma.user.findMany()
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
    console.log(user)
    if(user == undefined) return 'Email is not valid'
    const isPassword = await comparePasswords(req.body.password, user)
    if(!isPassword) return 'Password is not valid'
    return {name: user.name, lastname: user.lastname}
})

app.post('/createPost', async (req:any) => {
    const user = await prisma.user.findFirst({where: {name: req.body.name, lastname: req.body.lastname}})
    await prisma.post.create({data: {message: req.body.message, title: req.body.title, userId: user!.id},
        include: {user: true}
    })
    
})

app.listen({port: Port})


async function comparePasswords(typedInPassword:string, user:any) {
    const password = await bcrypt.compare(typedInPassword,user.password)
    return password
}


async function main() {
    const users = await prisma.user.findFirst({where: {name: "Amin"}, include: {post: true}})
    console.log(users)

    // console.log(await prisma.user.deleteMany())
}

main()
    .catch(e => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })