import { Request, Response } from "express"
import { prisma } from "../user/createUser"

export async function deletePartnership(req:Request, res:Response) {
    try {
        const { userId, Id } = req.params
        if (!userId || !Id) {
            return res.status(500).json({error: "You must set the userId and partnershipId to delete."})
        }
        if ( Number(userId), Number(Id)) {
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({error: "Unauthorized!"})
            }
            const partnership = await prisma.partnership.deleteMany({
                where: { id: Number(Id) }
            })
            if (partnership.count <= 0) {
                return res.status(404).json({error: "Does not exist!"})
            }
            return res.status(200).json({sucsess: "Deleted sucsessfuly!"})
        } else {
            return res.status(500).json({error: "Id must be a number!"})
        }
    } catch (err:any) {
        return res.status(500).json({error: "Error while deleting partnership!",details: err})
    }
}