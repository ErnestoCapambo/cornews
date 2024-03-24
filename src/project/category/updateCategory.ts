import { Request, Response } from "express";
import { prisma } from "../user/createUser";

export async function updateCategory(req:Request, res:Response) {
    const { userId, Id } = req.params
    try {
        if (Number(userId) && Number(Id)) {
            const { name } = req.body
            
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({error: "Unauthorized!"})
            }
            
            const update_category = await prisma.category.updateMany({
                where: {id: Number(Id)},
                data: { name: name }
            })
            if (update_category.count <= 0) {
                return res.status(404).json({error: "Does not exist!"})
            }
            return res.status(200).json({sucsess: "Updated sucsessfuly!"})
        } else {
            return res.status(500).json({error: "You must set the parameters of ${UserId}/${CategoryId} as number!"})
        }
    } catch (err:any) {
        return res.status(500).json({error: "Does not exist!"})
    }
}
