import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import pool from '../config/db.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
        //* get token onlu
        //* split returtn array bearer is [0]
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
     const user = await pool.query(' SELECT * FROM users WHERE id = $1', [decoded.user_id]);

    req.user = user.rows[0]

    next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }