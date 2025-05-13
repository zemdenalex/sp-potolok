import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Product } from '../Products/Product'

const CartProducts = () => {
  const cart = useSelector(state => state.cart)

  return (
    <div className='my-5'>
      <p className='text-[32px] mt-6'><b>Корзина</b></p>
      <div className='hidden justify-center items-center mt-[5dvh] mb-[20dvh]' id='empty-cart'>
        <p className='text-[25px] text-center'>Здесь появятся товары, которые вы добавите в корзину</p>
      </div>
      <div id='cart-products'>
        <ul className='my-3'>
          {
            cart.map((item, i) => <li key={i}>
              <Product name={item.name} price={item.price} image_link={item.image_link} />
            </li>)
          }
        </ul>
        <Link to='/checkout' className='flex items-center justify-end mt-12 mb-10'>
          <button className='flex justify-center items-center bg-gradient-to-r from-main to-secondary text-white text-xl py-4 w-full sm:w-64 rounded-xl'>
            <p>К оформлению</p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CartProducts
