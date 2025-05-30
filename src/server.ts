import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from './docs/swagger'

dotenv.config()
const PORT = process.env.PORT! || 4100
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/api', routes)

app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
  .on('error', (err) => {
    console.error('Server failed to start:', err)
  })
