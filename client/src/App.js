import React from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductScreens from './screens/ProductScreens'
import Homescreen from './screens/Homescreen'

const App = () => {

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>hi damar</h1>
          <Route path='/' component={Homescreen} exact/>
          <Route path='/product/:id' component={ProductScreens} exact/>

        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
