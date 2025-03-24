import express from 'express';
import { PORT } from './Config/env.js';
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import userRouter from './routes/user.routes.js'
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './Middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './Middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';
import cors from 'cors'
import journalRouter from './routes/Journal.route.js';
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.json())
app.use(arcjetMiddleware)

app.use(cors({
    origin: "*", // Allows requests from any origin (not recommended for production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Accept"]
}));

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/journal', journalRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)
app.use(errorMiddleware)
//api/v1/auth/sign-up
app.get('/', (req, res) => {
    res.send("welcome to the Subscription tracker API");
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`)
    await connectToDatabase()
})
