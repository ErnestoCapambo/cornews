import { Request, Response } from 'express'
import { prisma } from './createUser'
import { verifyToken } from '../auth/verifyToken'

export async function blockUser(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const { usId } = req.params
            const userId = req.user && req.user.id

            if (Number(usId)) {
                const isSuper = await prisma.user.findUnique({
                    where: { id: Number(userId), is_super: 1 },
                })
                if (isSuper === null) {
                    return res.status(401).json({ error: 'Unauthorized!' })
                }

                const blocked = await prisma.user.updateMany({
                    where: { id: Number(usId) },
                    data: { is_blocked: 1 },
                })

                if (blocked.count <= 0) {
                    return res.status(404).json({ error: 'Invalid User!' })
                }
                return res
                    .status(200)
                    .json({ sucsess: 'Blocked sucsessfully.'})
            } else {
                return res
                    .status(500)
                    .json({ error: 'Please, verify the user Id!' })
            }
        })
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: 'Error while blocking user', details: err })
    }
}
