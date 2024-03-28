import { prisma } from './createUser'
import { Request, Response } from 'express'

export async function getUser(req: Request, res: Response) {
    try {
        const { userId } = req.params
        if (!userId) {
            const users = await prisma.user.findMany()
            return res.status(200).json(users)
        }
        if (Number(userId)) {
            const user = await prisma.user.findUnique({
                where: { id: Number(userId) },
            })
            if (user === null) {
                return res.status(404).json({ notfound: 'User not found!' })
            }
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ notfound: 'User not found!' })
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}
