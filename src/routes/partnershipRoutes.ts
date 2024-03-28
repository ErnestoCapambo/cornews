import upload from '../middlewares/files/fileUpload'
import { createPartnership } from '../project/partnership/createPartnership'
import { deletePartnership } from '../project/partnership/deletePartnership'
import { getPartnership } from '../project/partnership/getPartnership'
import { updatePartnership } from '../project/partnership/updatePartnership'
import router from './userRoutes'

router.post(
    '/create_partnership/',
    upload.single('file'),
    createPartnership,
)

router.get('/get_partnership/:Id?', getPartnership)

router.put(
    '/update_partnership/:Id?',
    upload.single('file'),
    updatePartnership,
)

router.delete('/delete_partnership/:Id?', deletePartnership)

export default router
