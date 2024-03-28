import { verifyToken } from '../auth/verifyToken'
import { prisma } from './createUser'
import { Request, Response } from 'express'

export async function updateUser(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const userId = req.user && req.user.id
            const updatedUser = req.body
            if (Number(userId)) {
                const changedUser = await prisma.user.updateMany({
                    where: { id: Number(userId) },
                    data: updatedUser,
                })
                if (changedUser.count <= 0) {
                    return res.status(404).json({ notfound: 'User not found!' })
                    
                }
                return res.status(200).json({ success: "Updated successfully!" })
            } else {
                return res.status(404).json({ notfound: 'Invalid user!' })
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}
