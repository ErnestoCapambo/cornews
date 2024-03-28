import { Request, Response } from 'express'
import { prisma } from '../user/createUser'
import { verifyToken } from '../auth/verifyToken'

export async function createCategory(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const userId = req.user && req.user.id
            const { name } = req.body

            if (Number(userId)) {
                const isSuper = await prisma.user.findUnique({
                    where: { id: Number(userId), is_super: 1 },
                })
                if (isSuper === null) {
                    return res.status(401).json({ error: 'Unauthorized!' })
                }
                const verifyCategory = await prisma.category.findUnique({
                    where: { name: name.toLowerCase() },
                })
                if (verifyCategory) {
                    return res
                        .status(500)
                        .json({ error: 'Category already exists!' })
                }
                const category = await prisma.category.create({
                    data: { name: name.toLowerCase(), User_id: Number(userId) },
                })
                return res.status(201).json(category)
            } else {
                return res.status(404).json({ error: 'User does not exist!' })
            }
        })
    } catch (err: any) {
        res.status(500).json(err)
    }
}
