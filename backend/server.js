const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const path = require('path')
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
