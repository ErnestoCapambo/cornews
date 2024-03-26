import { login } from "../project/auth/login";
import router from "./userRoutes";


router.post("/login/:userId?", login)

export default router