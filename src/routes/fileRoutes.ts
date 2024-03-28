import upload from '../middlewares/files/fileUpload'
import { acceptPendingFiles } from '../project/file/acceptPendingFiles'
import { createFile } from '../project/file/createFile'
import { deleteFile } from '../project/file/deleteFile'
import { getFiles } from '../project/file/getFile'
import { getPendingFiles } from '../project/file/getPendingFiles'
import { updateFile } from '../project/file/updateFile'
import router from './userRoutes'

router.post('/create_file/', upload.single('file'), createFile)

router.get('/get_file/:Id?', getFiles)

router.get('/pending_files/:Id?', getPendingFiles)

router.delete('/delete_file/:Id?', deleteFile)

router.put('/accept_pending_file/:Id?', acceptPendingFiles)

router.put('/update_file/:Id?', upload.single('file'), updateFile)

export default router
