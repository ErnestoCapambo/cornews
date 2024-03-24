import { Request, Response } from "express";
import { prisma } from "./createUser";

export async function removeAdmin(req:Request, res:Response) {
    try {
        const { userId, usId } = req.params
        if (Number(userId) && Number(usId)) {

            const isSuper = await prisma.user.findUnique({
                where: {
                    id: Number(usId),
                    is_super: 1,
                }
            })
            if (isSuper) {
                return res.status(401).json({error: "Unauthorized!"})
            }
            const noAdmin = await prisma.user.findUnique({
                where: { id: Number(userId), is_admin: 0 }
            })
            if (noAdmin) {
                return res.status(401).json({error: "You must be an Admin!"})
            }
            const user = await prisma.user.update({
                where: { id: Number(usId) },
                data: { is_admin: 0 }
            })

            if (user === null) {
                return res.status(404).json({error: "User does not exist!"})
            }
            return res.status(200).json({sucsess: "Removed sucsessfuly!", user: user})
        } else {
            return res.status(500).json({error: "You must set the parameters of ${userId} and ${useId} as number!"})
        }
        
    } catch (err:any) {
        return res.status(500).json({error: "Error while removing admin", details: err})
    }
}