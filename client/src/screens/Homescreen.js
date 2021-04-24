import React, { useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const Homescreen = () => {

const [product, setProduct] = useState([])


useEffect(() => {
    const data = async () => {
        const {data} = await axios.get('/api/products')
        setProduct(data)
    }

    data()
}, [])

    return (
        <>
            <h1>Latest Product</h1>
            <Row>
                {product.map(item => 
                    <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={item} />
                    </Col>
                )}

            </Row>
        </>
    )
}

export default Homescreen
