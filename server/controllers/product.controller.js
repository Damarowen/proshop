import express from 'express'
const router = express.Router()

import pool from '../config/db.js'
import asynchandler from 'express-async-handler'
// import products from '../data/products.js'


//* @desc  fetch all products
//* @route GET /api/products
//* @access  Public
const getProducts = asynchandler(async (req, res) => {

  const products = await pool.query('SELECT * FROM products')
  res.json(products.rows)
})


//* @desc  fetch single products
//* @route GET /api/products/:id
//* @access  Public
const getProductById =  asynchandler(async (req, res) => {

  const id = req.params.id
  const product = await pool.query(`SELECT * FROM products WHERE product_id = ${id}`)

  if (product.rows.length > 0) {
    res.json(product.rows[0])

  } else {
    res.status(404)
    throw new Error('Product not found')
  }

})

export {getProducts,getProductById}