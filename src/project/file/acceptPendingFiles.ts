import { Request, Response } from 'express'
import { prisma } from '../user/createUser'
import { verifyToken } from '../auth/verifyToken'

export async function acceptPendingFiles(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const { Id } = req.params
            const userId = req.user && req.user.id
            
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 },
            })
            const is_admin = await prisma.user.findUnique({
                where: { id: Number(userId), is_admin: 1 }
            })
            if (is_admin === null && isSuper === null) {
                return res.status(401).json({ unauthorized: 'Unauthorized!' })
            }
            if (!Id) {
                return res.status(500).json({
                    error: 'You must set the parameter /${fileId} to acccept a file.',
                })
            }
            if (Number(Id)) {
                const file = await prisma.file.updateMany({
                    where: { id: Number(Id) },
                    data: { accepted: Number(1) },
                })
                if (file.count <= 0) {
                    return res.status(404).json({ error: 'File not found!' })
                }
                return res.status(200).json({ sucsess: 'Accepted successfuly!' })
            } else {
                return res
                    .status(500)
                    .json({
                        error: 'You must set the parameter of ${fileId} as number!',
                    })
            }
        })
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: 'Error while updaing file!', details: err })
    }
}
