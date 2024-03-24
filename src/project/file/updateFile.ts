import { Request, Response } from "express";
import { prisma } from "../user/createUser";

export async function updateFile(req:Request, res:Response) {
    try {
        const { userId, Id } = req.params
        const { title, description, category } = req.body;
        
        if (!Id) {
            return res.status(500).json({error: "You must set the parameter /${fileId} to update a file."})
        }
        if (Number(userId), Number(Id)) {
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({unauthorized: "Unauthorized!"})
            }
            const file = await prisma.file.update({
                where: { id: Number(Id) },
                data: {
                    title: title,
                    description: description,
                    category: category,
                    file_path: req.file?.path
                }
            })
            if (file === null) {
                return res.status(404).json({error: "File not found!"})
            }
            return res.status(200).json({sucsess: "Updated sucsessfuly!"})
        } else {
            return res.status(500).json({error: "You must set the parameter of ${fileId} as number!"})
        }

    } catch (err:any) {
        return res.status(500).json({error: "Error while updaing file!", details:err})
    }
}
