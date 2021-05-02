import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import {
  composeWithDevTools
} from 'redux-devtools-extension'

import {
  productListReducer,
  productDetailReducer
} from '../reducers/product.reducers'

import {
  cartReducer
} from '../reducers/cart.reducer'

import {
  userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer
} from '../reducers/user.reducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

//* set local storage to initial state
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) :
  []
  
const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) :
  null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage
  },
  userLogin: {
    userInfo: userInfoFromStorage
  }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store