import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import products from './data/products.js'


const app = express();
const PORT = process.env.PORT || 9000

dotenv.config()


app.use(cors());
app.use(express.json());

//routes

app.get('/', (req, res) => {
  res.send('HOME')
})


app.get('/api/products', (req, res) => {
  res.json(products)
})


app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})


app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  ))