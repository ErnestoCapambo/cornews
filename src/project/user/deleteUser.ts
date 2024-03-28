import { Request, Response } from 'express'
import { prisma } from './createUser'
import { verifyToken } from '../auth/verifyToken'

export async function deleteUser(req: Request, res: Response) {
    try {
        
        verifyToken(req, res, async () => {
            const { usId } = req.params
            const userId = req.user && req.user.id
         
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 },
            })
            if (isSuper === null) {
                return res.status(401).json({ unauthorized: 'Unauthorized!' })
            }
            if (Number(usId)) {
                const user = await prisma.user.deleteMany({
                    where: { id: Number(usId) },
                })
                if (user.count <= 0) {
                    return res.status(404).json({ notfound: 'Invalid user.' })
                } 
                if (user.count > 0){
                    return res.status(200).json({ sucsess: 'Sucessfull deleted!' })
                }
            } else {
                return res.status(404).json({ notfound: 'User not found!' })
            }
        })
        
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: 'Error while deleting user!', details: err })
    }
}
