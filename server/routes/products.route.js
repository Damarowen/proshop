import express from 'express'
const router = express.Router()
import { getProductById, getProducts } from '../controllers/product.controller.js'


//* @desc  fetch all products
//* @route GET /api/products
//* @access  Public
router.get('/', getProducts)
router.get('/:id', getProductById)


export default router