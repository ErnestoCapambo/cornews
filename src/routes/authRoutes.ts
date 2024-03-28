import { login } from '../project/auth/login'
import { logout } from '../project/auth/logout'
import router from './userRoutes'

router.post('/login/', login)

router.post('/logout/', logout)

export default router
