import express from 'express'
import userRoutes from '../routes/userRoutes'
import categoryRoutes from '../routes/categoryRoutes'
import fileRoutes from '../routes/fileRoutes'
import partnershipRoutes from '../routes/partnershipRoutes'
import loginRoute from '../routes/authRoutes'

export const app = express()
app.use(express.json())

//User Routes
app.use('/user', userRoutes)

// Auth Routes
app.use('/auth', loginRoute)

// // Category Roots
app.use('/category', categoryRoutes)

// File Roots
app.use('/files', fileRoutes)

// Partnership Roots
app.use('/partnership', partnershipRoutes)

app.listen(3344, () => {
    console.log('The server is running at port 3344!')
})
