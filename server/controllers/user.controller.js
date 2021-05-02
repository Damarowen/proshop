import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import pool from '../config/db.js'
import bcrypt from 'bcryptjs'

//* @desc    Auth user & get token
//* @route   POST /api/users/login
//* @access  Public
const authUser = asyncHandler(async (req, res) => {

    //*1 destructure the req.body
    const {
        email,
        password
    } = req.body


    if (email.length === 0 || password.length === 0) {
        res.status(400)
        throw new Error('No Empty Field Please')
    }


    //*2 check if email error
    const user = await pool.query(' SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length == 0) {
        res.status(401)
        throw new Error('Invalid email ')
    }

    //* 3 check if incoming pass same to the db pass

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
        res.status(401)
        throw new Error('Invalid  password')
    }

    //*4. give login user session

    res.json({
        _id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        isAdmin: user.rows[0].isAdmin,
        token: generateToken(user.rows[0].id)
    })

})


//* @desc    Register a new user
//* @route   POST /api/users
//* @access  Public
const registerUser = asyncHandler(async (req, res) => {


    //*1 dessutcure the req.body
    const {
        name,
        email,
        password
    } = req.body;


    if (name.length === 0 || email.length === 0 || password.length === 0) {
        res.status(400)
        throw new Error('No Empty Field Please')
    }

    //*2 check if user exist
    const user = await pool.query(" SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) {
        res.status(401)
        throw new Error('User Already Exist')
    }


    //*3 bcrypt the pass

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt)


    //*4. enter the new user inside db
    const newUser = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
    );


    //*5. generating jwt token
    if (newUser) {

        res.status(201).json({
            _id: newUser.rows[0].id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email,
            isAdmin: newUser.rows[0].isAdmin,
            token: generateToken(newUser.rows[0].id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }


})

//* @desc    Get user profile
//* @route   GET /api/users/profile
//* @access  Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await pool.query(' SELECT * FROM users WHERE id = $1', [req.user.id]);

    if (user) {
        res.json({
            _id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            isadmin: user.rows[0].isadmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await pool.query(' SELECT * FROM users WHERE id = $1', [req.user.id]);

    if (user) {
        user.rows[0].name = req.body.name || user.rows[0].name
        user.rows[0].password = user.rows[0].password

        if (req.body.password) {
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(req.body.password,salt )
            user.rows[0].password = bcryptPassword
        }
       

        const updatedUser = await pool.query(
            `UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *`,
            [ user.rows[0].name, user.rows[0].password, req.user.id]
        )

        res.json({
            _id: updatedUser.rows[0].id,
            name: updatedUser.rows[0].name,
            email: updatedUser.rows[0].email,
            isadmin: updatedUser.rows[0].isadmin,
            token: generateToken(user.rows[0].id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
}