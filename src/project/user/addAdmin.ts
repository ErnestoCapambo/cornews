import { Request, Response } from 'express'
import { prisma } from './createUser'
import { verifyToken } from '../auth/verifyToken'

export async function addAdmin(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const { userId } = req.params
            const adminId = req.user && req.user.id
            if (Number(userId)) {
                const isAdmin = await prisma.user.findUnique({
                    where: {
                        id: Number(adminId),
                        is_admin: 1,
                    },
                })
                const isSuper = await prisma.user.findUnique({
                    where: { id: Number(adminId), is_super: 1 },
                })

                if (isAdmin || isSuper) {
                    const admin = await prisma.user.updateMany({
                        where: { id: Number(userId) },
                        data: { is_admin: 1 },
                    })
                    if (admin.count <= 0) {
                        return res
                            .status(404)
                            .json({ error: 'User does not exist!' })
                    }
                    return res
                        .status(200)
                        .json({ sucsess: 'Added sucsessfuly!'})
                } else {
                    return res.status(401).json({ error: 'You must be an Admin.' })
                }
            } else {
                return res.status(500).json({
                    error: 'You must set the parameters of ${adminId}/${useId} as number!',
                })
            }
            })
    } catch (err: any) {
        return res.status(500).json({ error: 'Error while adding admin ', err })
    }
}
