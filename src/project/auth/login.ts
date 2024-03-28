import { Request, Response } from 'express'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { prisma } from '../user/createUser'
dotenv.config()

export const secretKey = '67f8c5or2f485fc331ba3f29f34af97a6622b1b68c76e383322d034b06b91a89484a936c406296234bb883462dgfhjposxks56765ws43186d849cne775d6cc9b38dbeb3af43ae2c4e0da6d11855b0'

export async function login(req: Request, res: Response) {
    const { userId } = req.body
    if (!Number(userId)) {
        return res
            .status(401)
            .json({ error: 'You must set the userId!' })
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
        })
        if (user) {
            const token = Jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    is_super: user.is_super,
                    admin: user.is_admin,
                    active: true
                },
                secretKey,
                { expiresIn: '12h' },
            )
            const activeUser = await prisma.user.update({
                where: { id: Number(userId)},
                data: { is_active: 1 }
            })
            return res.status(200).json({ token: token, user: activeUser })
        }
        if (user == null) {
            return res.status(401).json({ error: 'Credenciais invalidas!' })
        }
    } catch (err: any) {
        return res.status(404).json(err)
    }
}
