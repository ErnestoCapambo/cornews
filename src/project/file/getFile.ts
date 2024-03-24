import { Request, Response } from "express";
import { prisma } from "../user/createUser";

export async function getFiles(req:Request, res:Response) {
    try {
        const { Id } = req.params
        if (!Id) {
            const files = await prisma.file.findMany()
            if (files.length <= 0) {
                return res.status(404).json({empty: "No file detected!"})
            }
            return res.status(200).json(files)
        }
        if (Number(Id)) {
            const file = await prisma.file.findUnique({
                where: { id: Number(Id) }
            })
            if (file === null) {
                return res.status(404).json({err: "File not found!"})
            }
            return res.status(200).sendFile(file.file_path)
        } else {
            return res.status(500).json({error: "You must set the parameter of ${fileId} as number!"})
        }
    } catch (err:any) {
        return res.status(404).json(err)
    }
}
