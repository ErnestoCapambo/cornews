import express from 'express'
import userRoutes from '../routes/userRoutes'
import dotenv from "dotenv"
import categoryRoutes from '../routes/categoryRoutes'
import fileRoutes from '../routes/fileRoutes'
import partnershipRoutes from '../routes/partnershipRoutes'
import loginRoute from '../routes/authRoutes'
dotenv.config()

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

app.listen(process.env.PORT ? Number(process.env.PORT) : 3344,() => {
    console.log('Http server running...')
}
)
