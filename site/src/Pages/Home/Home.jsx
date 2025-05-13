import React from 'react'
import Calculator from '../../components/Calculator/Calculator'
import { Carousel } from '../../components/Carousel/Carousel'
import { slides } from '../Home/data/carouselData.json'
import Types from '../../components/Products/Types'
import Popular from '../../components/Products/Popular'

const Home = () => {
  return (
    <div className="container">
      {/* Add a common container with the same width for both carousel and calculator */}
      <div className="my-2 w-full">
        <Carousel data={slides} />
      </div>
      <div className='my-4'>
        <h2 className="text-3xl"><b>Калькулятор монтажных услуг</b></h2>
      </div>
      <Calculator/>
      <div className='my-4 py-6'>
        <h2 className="text-3xl"><b>Каталог</b></h2>
        <Types />
      </div>
      <div>
        <h2 className="text-3xl"><b>Популярно</b></h2>
        <Popular />
      </div>
    </div>
  )
}

export default Home