import upload from "../middlewares/fileUpload";
import { createFile } from "../project/file/createFile";
import { deleteFile } from "../project/file/deleteFile";
import { getFiles } from "../project/file/getFile";
import { updateFile } from "../project/file/updateFile";
import router from "./userRoutes";


router.post("/create_file/:userId?",upload.single('file'), createFile)

router.get("/get_file/:Id?", getFiles)

router.delete("/delete_file/:userId?/:Id?", deleteFile)

router.put("/update_file/:userId?/:Id?",upload.single('file'), updateFile)

export default router
