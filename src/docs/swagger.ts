import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CYCLOOP',
      version: '1.0.0',
      description: 'Service Upload with Cloudflare R2',
    },
    host: 'https://cycloop.pace11.my.id/api-docs',
  },
  apis: ['src/routes/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
