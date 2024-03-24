import { Request, Response } from "express";
import { prisma } from "../user/createUser";

export async function createFile(req: Request, res: Response) {
    try {
        const { title, description, category } = req.body;
        const { userId } = req.params;

        if (!userId) {
            return res.status(500).json({error: "Params userId is missing!"})
        }

        if (!Number(userId)) {
            return res.status(500).json({error: "You must set the parameter of ${userId} as a number!"});
        }

        const isAdmin = await prisma.user.findUnique({
            where: { id: Number(userId), is_admin: 1 }
        });
        const isSuper = await prisma.user.findUnique({
            where: { id: Number(userId), is_super: 1 }
        })
        if (isSuper === null || isAdmin === null) {
            return res.status(401).json({unauthorized: "Unauthorized!"})
        }
        const findCategory = await prisma.category.findUnique({
            where: { name: category.toLowerCase() }
        });
        
        if (!findCategory) {
            return res.status(500).json({error: "Invalid category!"});
        }
        const newFile = await prisma.file.create({
            data: {
                title: title,
                description: description,
                file_path: String(req.file?.path),
                User_id: Number(userId),
                accepted: 1,
                category: category.toLowerCase(),
            }
        });

        return res.status(200).json(newFile);
        
    } catch (err:any) {
        return res.status(500).json({error: "Error while creating file.", details: err});
    }
}
