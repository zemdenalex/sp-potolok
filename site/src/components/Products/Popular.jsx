import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ContainerTabs } from '../ContainerTabs/ContainerTabs';

const Popular = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get('http://localhost:8080/products/popular');
      setProducts(response?.data ?? []);
    } catch (e) {
    }
  }
  
  useEffect(() => {
    getProducts();
  }, []);
  
  return <ContainerTabs>
    {products.map((item, i) => <Link to={'/products/' + item.type} key={i} className="px-4 py-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl duration-200 flex flex-col gap-2 justify-center items-center aspect-square">
        <div className='flex justify-center items-center'>
          <div className='rounded-xl'>
            <img src={item.image_link} className='w-[120px] rounded-2xl h-[120px] object-cover'/>
          </div>
        </div>
        <div className='px-2 flex justify-center items-center max-w-[260px]'>
          <p className='text-[13px] text-center'><b>{item.name.length > 44 ? item.name.slice(0, 42) + '...' : item.name }</b></p>
        </div>
      </Link>
    )}
  </ContainerTabs>
}

export default Popular
