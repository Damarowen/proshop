import React, { useState, useEffect } from 'react'
import {  Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/user.action'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()


  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  //* success true or false
  const { success } = userUpdateProfile

 
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile(name,password))
      setPassword('')
      setConfirmPassword('')
    }
  }


  let data = document.getElementsByTagName('Messasge')
  console.log(data)
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' disabled>
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type='email'
                placeholder='Enter email'
                value={email} disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={4}>
          <h1>My Orders</h1>
      </Col>

    </Row>
  )
}

export default ProfileScreen