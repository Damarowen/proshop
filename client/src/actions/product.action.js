import axios from 'axios'


export const listProducts = () => async (
    dispatch
) => {
    try {
        //* get data
        dispatch({ type: 'PRODUCT_LIST_REQUEST' })

        const { data } = await axios.get( `/api/products` )

        //* get data success
        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: 'PRODUCT_LIST_FAIL',
            payload:
                //* error response from axios
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listProductDetails = (id) => async (
    dispatch
) => {
    try {
        //* get data
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })

        const { data } = await axios.get( `/api/products/${id}` )

        //* get data success
        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload:
                //* error response from axios
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}