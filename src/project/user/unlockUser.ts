import { Request, Response } from 'express'
import { prisma } from './createUser'
import { verifyToken } from '../auth/verifyToken'

export async function unlockUser(req: Request, res: Response) {
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

                const unlocked = await prisma.user.updateMany({
                    where: { id: Number(usId) },
                    data: { is_blocked: 0 },
                })

                if (unlocked.count <= 0) {
                    return res.status(404).json({ error: 'Invalid User!' })
                }
                return res
                    .status(200)
                    .json({ sucsess: 'Unlocked sucsessfully.'})
            } else {
                return res
                    .status(500)
                    .json({ error: 'Please, verify the user Id!' })
            }    
        })
        
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: 'Error while unlocking user', details: err })
    }
}
