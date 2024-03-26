import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { prisma } from "../user/createUser";
dotenv.config()

export const secretKey = "67f8c5or2f485fc331ba3f29f34af97a6622b1b68c76e383322d034b06b91a89484a936c406296234bb883462dgfhjposxks56765ws43186d849cne775d6cc9b38dbeb3af43ae2c4e0da6d11855b0"

export async function login(req:Request, res:Response) {
    const { userId } = req.params
    if (!Number(userId)) {
        return res.status(401).json({error: "You must set the userId as number!"})
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        })
        if (user) {
            const token = Jwt.sign({ id: user.id, email: user.email, is_super: user.is_super, admin: user.is_admin }, secretKey, { expiresIn: "2h" })
            return res.status(200).json({ token: token, user: user})
        } 
        if (user == null) {
            return res.status(404).json({ error: "User not found!" })
        } else {
            return res.status(401).json({ error: "Credenciais invalidas!" })
        }
    } catch (err:any) {
        return res.status(404).json(err)
    }
    
}

export async function authenticateToken(req:Request, res:Response) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.status(401).json({ error: "Token not given!" })

    Jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token!" })
        return res.status(200).json({ user: user, token: token })
    })
}
