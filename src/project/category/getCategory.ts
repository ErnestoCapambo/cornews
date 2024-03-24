import { Request, Response } from "express";
import { prisma } from "../user/createUser";

export async function getCategory(req:Request, res:Response) {
    try {
        const { Id } = req.params
        if (!Id) {
            const allcategory = await prisma.category.findMany()
            return res.status(200).json(allcategory)
        }


        if (Number(Id)) {
            const category = await prisma.category.findMany({
                where: { id: Number(Id) }
            })
            if (category.length <= 0) {
                return res.status(404).json({notfound: "Not found!"})
            }
            return res.status(200).json(category)
        } else {
            if (Id) {
                const namecategory = await prisma.category.findUnique({
                    where: {
                        name: Id
                    }
                })
                if (namecategory === null) {
                    return res.status(404).json({notfound: "Not found!"})
                }
                return res.status(200).json(namecategory)
            }
            return res.status(404).json({notfound: "Not found!"})
        }
    } catch (err:any) {
        return res.status(404).json(err)
    }
}
