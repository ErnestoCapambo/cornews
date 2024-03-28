import { Request, Response } from 'express'
import { prisma } from '../user/createUser'
import { verifyToken } from '../auth/verifyToken'

export async function deleteFile(req: Request, res: Response) {
    try {

        verifyToken(req, res, async () => {
            const { Id } = req.params
            const userId = req.user && req.user.id
            
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 },
            })
            if (isSuper === null) {
                return res.status(401).json({ unauthorized: 'Unauthorized!' })
            }
            const file = await prisma.file.deleteMany({
                where: { id: Number(Id) },
            })
            if (file.count <= 0) {
                return res.status(404).json({ error: 'File does not exist.' })
            }
            return res.status(200).json({ sucsess: 'Deleted sucsessfuly!' })
        })

    } catch (err: any) {
        return res.status(500).json({ error: 'Error while deleting file!', details: err })
    }
}
