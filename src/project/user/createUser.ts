import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export const prisma = new PrismaClient()

export async function createUser(req:Request, res:Response) {
    try {
        const { password } = req.body
        if (password.length < 8) {
            return res.status(500).json({error: "Password can't be less than 8 charactheres."})
        }
        const veryfyUser = await prisma.user.count()
        if (veryfyUser > 0) {
          const NewUser = req.body
          const user = await prisma.user.create({
              data: NewUser
          })
          return res.status(201).json(user)
      } else {
        const { username, password, email, contact } = req.body
        const NewUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
                contact: contact,
                email: email,
                is_super: 1,
                is_admin: 1,
            }
        })
        return res.status(201).json(NewUser)
      }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}
