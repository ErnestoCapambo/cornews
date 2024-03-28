import multer from 'multer'
import path from 'path'

const uploadsFolder = path.resolve('./src/uploads')

const storage = multer.diskStorage({
    destination: uploadsFolder,
    filename: function (req, file, callback) {
        let nome = Date.now() + '-' + file.originalname
        callback(null, nome)
    },
})

const upload = multer({ storage: storage })

export default upload
