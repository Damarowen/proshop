import React from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductScreen from './screens/ProductScreens'
import HomeScreen from './screens/Homescreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'


const App = () => {

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen} exact/>
          <Route path='/cart/:id?' component={CartScreen} exact/>
          <Route path='/login' component={LoginScreen} exact/>

        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
