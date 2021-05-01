import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const {
        data
    } = await axios.get(`/api/products/${id}`)
    
console.log('data',data)
    dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
            product: data.product_id,
            name: data.name,
            image: data.image,
            price: data.price,
            countinstock: data.countinstock,
            qty,
        },
    })

    //* save in local storage, get state function return JSON so we need to parse that to strung
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: id,
    })
  
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    localStorage.removeItem('cartItems');

  }