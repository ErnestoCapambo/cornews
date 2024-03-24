import { Request, Response } from "express"
import { prisma } from "../user/createUser"

export async function createPartnership(req:Request, res:Response) {
    try {
        const { userId } = req.params
        const { title, description} = req.body
        if (!userId) {
            return res.status(500).json({error: "You must set the ${userId}/ to create the partnership."})
        }
        if (Number(userId)) {

            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({unauthorized: "Unauthorized!"})
            }
            const partnership = await prisma.partnership.create({
                data: {
                    title: title,
                    description: description,
                    file_path: req.file?.path,
                    User_id: Number(userId)
                }
            })
            return res.status(201).json(partnership)
        } else {
            return res.status(500).json({error: "The ${userId}/ must be a number!"})
        }
    } catch (err:any) {
        return res.status(500).json(res)
    }
}

