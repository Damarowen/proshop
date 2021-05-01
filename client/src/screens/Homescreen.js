import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/product.action'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'


const Homescreen = () => {

    const dispatch = useDispatch()
       
    //* productList from redux store
    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])


 
    return (
        <>
            <h1>Latest Product</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :   <Row>
            {products.map(item =>
                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={item} />
                </Col>
            )}
        </Row>}
        </>
    )
}

export default Homescreen
