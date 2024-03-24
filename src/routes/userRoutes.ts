import { Router } from "express";
import { createUser } from "../project/user/createUser";
import { getUser } from "../project/user/getUser";
import { updateUser } from "../project/user/updateUser";
import { deleteUser } from "../project/user/deleteUser";
import { addAdmin } from "../project/user/addAdmin";
import { removeAdmin } from "../project/user/removeAdmin";
import { blockUser } from "../project/user/blockUser";
import { unlockUser } from "../project/user/unlockUser";


export const router = Router()

router.post("/create_user", createUser)

router.get("/get_user/:userId?", getUser)

router.put("/update_user/:userId", updateUser)

router.delete("/delete_user/:userId/:usId", deleteUser)

router.put("/add_admin/:adminId?/:userId?", addAdmin)

router.put("/remove_admin/:userId?/:usId?", removeAdmin)

router.put("/block_user/:userId?/:usId?", blockUser)

router.put("/unlock_user/:userId?/:usId?", unlockUser)

export default router
