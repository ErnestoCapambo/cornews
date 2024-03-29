import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import { secretKey } from '../auth/login'
import Jwt from 'jsonwebtoken'
dotenv.config()

export const prisma = new PrismaClient()

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password, email, contact } = req.body
        if (password.length < 8) {
            return res
                .status(500)
                .json({ error: "Password can't be less than 8 charactheres." })
        }
        const veryfyUserInDatabase = await prisma.user.count()
        if (veryfyUserInDatabase > 0) {
            const User = req.body
            const Newuser = await prisma.user.create({
                data: User,
            })
            const user = await prisma.public.user.findUnique({ where: { email: email }})
            if (user !== null) {
                const userToken = Jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        is_super: user.is_super,
                        admin: user.is_admin,
                    },
                    secretKey,
                    { expiresIn: '12h' },
                )    
                res.status(201).json({NewUser: user, token: userToken})
                next()
            }
        } else {
            const NewUser = await prisma.public.user.create({
                data: {
                    username: username,
                    password: password,
                    contact: contact,
                    email: email,
                    is_super: 1,
                    is_admin: 1,
                },
            })
            const user = await prisma.public.user.findUnique({ where: { email: email }})
            if (user !== null) {
                const userToken = Jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        is_super: user.is_super,
                        admin: user.is_admin,
                    },
                    secretKey,
                    { expiresIn: '12h' },
                )    
                res.status(201).json({NewUser: user, token: userToken})
                next()
            }
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}
