import { Request, Response } from 'express'
import { prisma } from '../user/createUser'
import { verifyToken } from '../auth/verifyToken'

export async function deleteCategory(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const { Id } = req.params
            const userId = req.user && req.user.id

            if (Number(Id)) {
                const isSuper = await prisma.user.findUnique({
                    where: { id: Number(userId), is_super: 1 },
                })
                if (isSuper === null) {
                    return res.status(401).json({ error: 'Unauthorized!' })
                }

                const category = await prisma.category.deleteMany({
                    where: { id: Number(Id) },
                })
                if (category.count <= 0) {
                    return res.status(404).json({ error: 'File does not exist!' })
                }
                return res.status(200).json({ sucsess: 'Deleted sucsessfuly!' })
            } else {
                return res.status(500).json({
                    error: 'You must set the parameter of ${CategoryId} as number!',
                })
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}
