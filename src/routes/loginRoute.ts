import { login } from '../project/auth/login'
import router from './userRoutes'

router.post('/login/', login)

export default router
