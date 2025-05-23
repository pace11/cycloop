import { Request, Response, NextFunction } from 'express'

export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers['x-api-key']
    if (!token || token !== process.env.API_SECRET_KEY) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    next()
    return
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
    return
  }
}
