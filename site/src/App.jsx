import React from 'react'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Contacts from './Pages/Contacts/Contacts'
import Catalog from './Pages/Catalog/Catalog'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products'
import Cart from './Pages/Cart/Cart'
import CheckOut from './Pages/CheckOut/CheckOut'

const App = () => {

  return (
    <main className='min-h-dvh flex flex-col'>      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/products/:type" element={<Products />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
