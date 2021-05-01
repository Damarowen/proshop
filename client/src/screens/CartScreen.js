import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cart.action'

const CartScreen = ({ match, location, history }) => {

  const productId = match.params.id

  //* get ?qty=:id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

    //* cart from redux store
  const cart = useSelector((state) => state.cart)
  console.log(cart)
  const { cartItems } = cart

  useEffect(() => {
      //* only in cart
    if (productId) {
        //*addToCart = (id, qty) 
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    history.push('/cart')   

  }

  return (
    <Row>

     {/* //* { product review} */}
    <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant='flush' >
          {cartItems.map((item) => (
           
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        // * addToCart(item id, qty)
                        addToCart(item.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countinstock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light'  onClick={() => removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
   
   {/* //* product cart */}
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            {/* //* price */}
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
)
}

export default CartScreen