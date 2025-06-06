import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import routesIndex from './routes/index.js'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views', join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(routesIndex)

app.use(express.static(join(__dirname, 'css')))

app.use(express.static(join(__dirname, 'img')))

app.listen(process.env.PORT || 4880)
