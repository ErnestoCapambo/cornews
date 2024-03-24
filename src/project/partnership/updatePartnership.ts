import { Request, Response } from "express"
import { prisma } from "../user/createUser"


export async function updatePartnership(req:Request, res:Response) {
    try {
        const { title, description } = req.body
        const { userId, Id } = req.params
        if (!Id) {
            return res.status(500).json({error: "You must set the Id to update the partnership."})
        }
        if (Number(userId), Number(Id)) {
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({error: "Unauthorized!"})
            }
            const updatedPartnership = await prisma.partnership.update({
                where: { id: Number(Id) },
                data: { title: title, description: description, file_path: req.file?.path}
            })
            if (updatedPartnership === null) {
                return res.status(404).json({error: "Does not exist!"})
            }
            return res.status(200).json({sucsess: updatedPartnership})
        } else {
            return res.status(500).json({error: "Id must be a number!"})
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}
