import { Router } from 'express'
import { upload } from '../middlewares/upload.middleware'
import { uploadFile } from '../controllers/upload.controller'
import { apiKeyAuth } from '../middlewares/apiKeyAuth.middleware'

const router = Router()

router.post('/upload', apiKeyAuth, upload.single('file'), uploadFile)

export default router
