const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000
const path = require('path')
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  cors({
    origin: [
      'https://tavolina-front.onrender.com',
      'https://www.tavolina.online',
      'https://tavolina.online',
      'http://localhost:3000',
    ],
    credentials: true,
    // Set the browser cache time for preflight responses
    maxAge: 86400,
    preflightContinue: true, // Allow us to manually add to preflights
  })
)

// Add cache-control to preflight responses in a separate middleware:

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    // No Vary required: cors sets it already set automatically
    res.end()
  } else {
    next()
  }
})

app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tables', require('./routes/tableRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/shifts', require('./routes/shiftRoutes'))
app.use('/api/records', require('./routes/recordRoutes'))
app.use('/api/dashboard', require('./routes/dashboardRoutes'))
app.use('/api/roles', require('./routes/roleRoutes'))
app.use('/api/stock', require('./routes/stockRoutes'))

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   )
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'))
// }

// const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
