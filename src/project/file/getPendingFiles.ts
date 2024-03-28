import { Request, Response } from "express"
import { verifyToken } from "../auth/verifyToken"
import { prisma } from "../user/createUser"


export async function getPendingFiles(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const userId = req.user && req.user.id
            const { Id } = req.params
            const adminUser = await prisma.user.findUnique({
                where: { id: userId, is_admin: 1 },
            })
            if (adminUser == null) {
                return res.status(401).json({ error: 'Unauthorized!' })
            }
            if (!Id) {
                const pendingFiles = await prisma.file.findMany({ where: { accepted: 0 } })
                
                if (pendingFiles.length <= 0) {
                    return res.status(404).json({ empty: 'No pending file detected!' })
                }
                return res.status(200).json(pendingFiles)
            }
            if (Number(Id)) {
                const file = await prisma.file.findUnique({
                    where: { id: Number(Id) },
                })
                if (file === null) {
                    return res.status(404).json({ err: 'File not found!' })
                }
                return res.status(200).sendFile(file.file_path)
            } else {
                return res.status(500).json({
                    error: 'You must set the parameter of ${fileId} as number!',
                })
            }
        })
    } catch (err: any) {
        return res.status(404).json(err)
    }
}
