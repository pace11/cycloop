import { Router } from 'express'
import { upload } from '../middlewares/upload.middleware'
import { uploadFile } from '../controllers/upload.controller'
import { apiKeyAuth } from '../middlewares/apiKeyAuth.middleware'

const router = Router()

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a single file via form-data
 *     tags:
 *       - Upload
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *         description: API token for authorization
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://cloudflare.com/file_name.jpeg
 *                     name:
 *                       type: string
 *                       example: file_name.jpeg
 *                     size:
 *                       type: number
 *                       example: 12345
 *                 message:
 *                   type: string
 *                   example: Upload successful
 *
 */
router.post('/upload', apiKeyAuth, upload.single('file'), uploadFile)

export default router
