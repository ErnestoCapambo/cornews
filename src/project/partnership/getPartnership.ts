import { Request, Response  } from "express"
import { prisma } from "../user/createUser"

export async function getPartnership(req:Request, res:Response) {
    try {
        const { Id } = req.params
        if (!Id) {
            const partnership = await prisma.partnership.findMany()
            if (partnership.length <= 0) {
                return res.status(200).json({empty: "Partnership is empty."})
            }
            return res.status(200).json(partnership)
        }
        if (Number(Id)) {
            const partnership = await prisma.partnership.findFirst({
                where: { id: Number(Id) }
            })
            if (partnership === null) {
                return res.status(404).json({error: "Does not exist!"})
            }
            return res.status(200).json(partnership)
        } else {
            return res.status(500).json({error: "Id must be a number!"})
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}

