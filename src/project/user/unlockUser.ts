import { Request, Response } from "express"
import { prisma } from "./createUser"

export async function unlockUser(req:Request, res:Response) {
    try {
        const { userId, usId } = req.params
        
        if (Number(userId) && Number(usId)) {

            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({error: "Unauthorized!"})
            }

            const unlocked = await prisma.user.update({
                where: {id: Number(usId)},
                data: { is_blocked: 0 }
            })

            if (unlocked === null) {
                return res.status(404).json({error: "Invalid User!"})
            }
            return res.status(200).json({sucsess: "Unlocked sucsessfully.", user: unlocked})
            
        } else {
            return res.status(500).json({error: "Please, verify the user Id!"})
        }

    } catch (err:any) {
        return res.status(500).json({error: "Error while unlocking user", details: err})
    }
}
