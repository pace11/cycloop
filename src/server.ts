import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import cors from 'cors'

dotenv.config()
const PORT = process.env.PORT! || 4100
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
  .on('error', (err) => {
    console.error('Server failed to start:', err)
  })
