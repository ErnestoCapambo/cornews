import { Request, Response } from "express";
import { prisma } from "./createUser";

export async function deleteUser(req:Request, res:Response) {
    try {

        const { userId, usId } = req.params
        
        if (Number(userId), Number(usId)) {
            const isSuper = await prisma.user.findUnique({
                where: { id: Number(userId), is_super: 1 }
            })
            if (isSuper === null) {
                return res.status(401).json({unauthorized: "Unauthorized!"})
            }
            const user = await prisma.user.delete({
                where: { id: Number(usId) }
            })
            if (user) {
                return res.status(200).json({sucsess: "Sucessfull deleted!"})
            } else {
                return res.status(404).json({notfound: "Invalid user."})
            }
        } else {
            return res.status(404).json({notfound: "User not found!"})
        }
    } catch (err:any) {
        return res.status(500).json({error: "Error while deleting user!", details: err})
    }
}