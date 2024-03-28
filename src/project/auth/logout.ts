import { Request, Response } from "express"
import { verifyToken } from "./verifyToken"
import { prisma } from "../user/createUser"


export async function logout(req: Request, res: Response) {
    try {
        verifyToken(req, res, async () => {
            const userId = req.user && req.user.id
            if (Number(userId)) {
                const logedUser = await prisma.user.update({
                    where: { id: Number(userId) },
                    data: { is_active: 0 }
                })
                return res.status(200).json({ success: "Success!"})
            } else {
                return res.status(403).json({ error: 'Invalid token' })
            }
        })
    } catch (err: any) {
        return res.status(500).json({ error: "Error while logging out!" })
    }
}