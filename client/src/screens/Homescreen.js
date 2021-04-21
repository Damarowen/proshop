import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const Homescreen = () => {
    return (
        <>
            <h1>Latest Product</h1>
            <Row>
                {products.map(item => 
                    <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={item} />
                    </Col>
                )}

            </Row>
        </>
    )
}

export default Homescreen
