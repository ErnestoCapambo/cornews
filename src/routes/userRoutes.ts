import { Router } from 'express'
import { createUser } from '../project/user/createUser'
import { getUser } from '../project/user/getUser'
import { updateUser } from '../project/user/updateUser'
import { deleteUser } from '../project/user/deleteUser'
import { addAdmin } from '../project/user/addAdmin'
import { removeAdmin } from '../project/user/removeAdmin'
import { blockUser } from '../project/user/blockUser'
import { unlockUser } from '../project/user/unlockUser'


export const router = Router()

router.post('/create_user', createUser)

router.get('/get_user/:userId?', getUser)

router.put('/update_user/', updateUser)

router.delete('/delete_user/:usId?', deleteUser)

router.put('/add_admin/:userId?', addAdmin)

router.put('/remove_admin/:usId?', removeAdmin)

router.put('/block_user/:usId?', blockUser)

router.put('/unlock_user/:usId?', unlockUser)

export default router
