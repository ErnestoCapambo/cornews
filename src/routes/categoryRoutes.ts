import { createCategory } from '../project/category/createCategory'
import { deleteCategory } from '../project/category/deleteCategory'
import { getCategory } from '../project/category/getCategory'
import { updateCategory } from '../project/category/updateCategory'
import router from './userRoutes'

router.post('/create_category/', createCategory)

router.get('/get_category/:Id?', getCategory)

router.put('/update_category/:Id?', updateCategory)

router.delete('/delete_category/:Id?', deleteCategory)

export default router
