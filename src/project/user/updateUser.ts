import { prisma } from "./createUser"
import { Request, Response } from "express";


export async function updateUser(req:Request, res:Response) {
    try {
        const { userId } = req.params        
        const updatedUser = req.body
        if (Number(userId)) {
            const changedUser = await prisma.user.update({
                where: { id: Number(userId)},
                data: updatedUser
            })
            return res.status(200).json(changedUser)
        } else {
            return res.status(404).json({notfound: "User not found!"})
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}
