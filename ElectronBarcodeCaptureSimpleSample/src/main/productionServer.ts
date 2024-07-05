import express from 'express'
const app = express()

/**
 * Enables crossOriginIsolation
 * and therefore multithreading for Scandit websdk
 */
function crossOriginIsolated(_req, res, next): void {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')

  res.setHeader('Cross-origin-Embedder-Policy', 'require-corp')
  res.setHeader('Cross-origin-Opener-Policy', 'same-origin')
  next()
}

export function startServer(staticPath: string): number {
  app.use(crossOriginIsolated)
  app.use(express.static(staticPath))
  const server = app.listen(0, () => {
    console.log(`listening at http://localhost:${server.address().port}`)
  })
  return server.address().port
}
