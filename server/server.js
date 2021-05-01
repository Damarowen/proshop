import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import productsRoutes from './routes/products.route.js'
import userRoutes from './routes/user.route.js'

import { notFound, errorHandler } from './middleware/error.middleware.js'


const app = express();
const PORT = process.env.PORT || 9000

dotenv.config()


app.use(cors());
app.use(express.json());

//*routes
app.get('/', (req, res) => {
  res.send('HOME')
})

app.use('/api/products', productsRoutes )
app.use('/api/users', userRoutes )


//*MIDDLEWARE
app.use(notFound)
app.use(errorHandler)


app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  ))