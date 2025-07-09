import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import { s3Client } from '../config/s3'
import sharp from 'sharp'

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ data: null, message: 'No file uploaded!' })
      return
    }

    const MAX_SIZE = parseInt(process.env.UPLOAD_MAX_SIZE || '5') * 1024 * 1024 // default 5MB
    const isImage = req.file.mimetype.startsWith('image/')

    // defaultvalue
    let fileBuffer = req.file.buffer
    let contentType = req.file.mimetype
    let objectKey = `${Date.now()}_${req.file.originalname.toLowerCase().replace(/[-\s]+/g, '_')}`

    if (isImage && req.file.size > MAX_SIZE) {
      res
        .status(400)
        .json({ data: null, message: `Image size more than ${parseInt(process.env.UPLOAD_MAX_SIZE || '5')} mb` })
    }

    // validation if object is image type
    if (isImage) {
      const baseName = req.file.originalname.replace(/\.[^/.]+$/, '')
      // compress quality image to 50%
      fileBuffer = await sharp(req.file.buffer).toFormat('webp', { quality: 50 }).toBuffer()
      contentType = 'image/webp'
      objectKey = `${Date.now()}_${baseName.toLowerCase().replace(/[-\s]+/g, '_')}.webp`
    }

    // put object to S3 bucket
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: objectKey,
      Body: fileBuffer,
      ContentType: contentType,
    })

    await s3Client.send(command)
    const response = {
      url: `https://${process.env.AWS_R2_PUBLIC_URL!}/${command.input.Key}`,
      name: objectKey,
      size: fileBuffer.length,
    }
    res.status(201).json({ data: response, message: 'Upload successful' })
    return
  } catch (err) {
    res.status(500).json({ error: 'Upload Error' })
    return
  }
}
