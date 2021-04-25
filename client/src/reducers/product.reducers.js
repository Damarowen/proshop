export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        //* get product
      case 'PRODUCT_LIST_REQUEST':
        return { loading: true, products: [] }
        //* get product success
      case 'PRODUCT_LIST_SUCCESS':
        return {
          loading: false,
          products: action.payload
        }
         //* get product false
      case 'PRODUCT_LIST_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const productDetailReducer = (state = { product: { reviews: []} }, action) => {
    switch (action.type) {
        //* get product
      case 'PRODUCT_DETAILS_REQUEST':
        return { loading: true, ...state }
        //* get product success
      case 'PRODUCT_DETAILS_SUCCESS':
        return {
          loading: false,
          product: action.payload
        }
         //* get product false
      case 'PRODUCT_DETAILS_FAIL':
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }