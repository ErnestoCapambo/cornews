import { Request, Response } from "express";
import { prisma } from "../user/createUser";

export async function deleteFile(req:Request, res:Response) {
    try {
        const { userId, Id } = req.params
        if (Number(userId) && Number(Id)) {
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({unauthorized: "Unauthorized!"})
            }
            const file = await prisma.file.delete({
                where: { id: Number(Id) }
            })
            if (file === null) {
                return res.status(404).json({error: "File does not exist."})
            }
            return res.status(200).json({sucsess: "Deleted sucsessfuly!"})
        } else {
            return res.status(500).json({error: "You must set the parameter of ${userId}/${fileId} as number!"})
        }

    } catch (err:any) {
        return res.status(500).json({ error: "Error while deleting file!", details: err})
    }
}