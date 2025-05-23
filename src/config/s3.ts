import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()

export const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  endpoint: `https://${process.env.AWS_PUBLIC_URL!}`,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})
