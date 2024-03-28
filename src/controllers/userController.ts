import { Request, Response } from "express"
import { prisma } from "../project/user/createUser"

export async function veryfyAdmin(req:Request, res:Response) {

    const { userId } = req.params

    const isSuper = await prisma.user.findUnique({
        where: {
            id: Number(userId),
            is_super: 1,
        }
    })
    if (isSuper === null) {
        return res.status(401).json({error: "You must be a Super_admin."})
    }
    
}
