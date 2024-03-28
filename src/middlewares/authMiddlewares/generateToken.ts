import { prisma } from "../../project/user/createUser"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { secretKey } from "../../project/auth/login"


export async function generateToken(req:Request, res:Response) {
    const { username, email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { username:username, email: email, password: password }
        })
        if (user) {
            const token = jwt.sign({ id: user.id, role: user.is_super, admin: user.is_admin }, secretKey, { expiresIn: "8h" })
        } else {
            return res.status(401).json({ error: "Credenciais invalidas!" })
        }
    } catch (err:any) {
        return res.status(404).json(err)
    }
    
}
