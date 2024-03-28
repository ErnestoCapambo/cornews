import { Request, Response } from 'express'
import { prisma } from '../user/createUser'
import { verifyToken } from '../auth/verifyToken'

export async function createFile(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const { title, description, category } = req.body
            const userId = req.user && req.user.id

            const isAdmin = await prisma.user.findUnique({
                where: { id: Number(userId), is_admin: 1 },
            })
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 },
            })

            if (isAdmin || isSuper) {
                const findCategory = await prisma.category.findUnique({
                    where: { name: category.toLowerCase() },
                })
                if (!findCategory) {
                    return res.status(500).json({ error: 'Invalid category!' })
                }
                const newFile = await prisma.file.create({
                    data: {
                        title: title,
                        description: description,
                        file_path: String(req.file?.path),
                        User_id: Number(userId),
                        accepted: 1,
                        category: category.toLowerCase(),
                    },
                })
    
                return res.status(201).json(newFile)
            } else {
                const newFile = await prisma.file.create({
                    data: {
                        title: title,
                        description: description,
                        file_path: String(req.file?.path),
                        User_id: Number(userId),
                        accepted: 0,
                        category: category.toLowerCase(),
                    },
                })
                return res.status(201).json({ success: 'Reported successfully!' })
            }

        })
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: 'Error while creating file.', details: err })
    }
}
