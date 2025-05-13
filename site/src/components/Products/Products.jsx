import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PaginationControls } from '../PaginationControls/PaginationControls';
import { Product } from './Product';

const productsPerPage = 10;
const Products = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function getProducts() {
    try {
      const response = await axios.get(`http://localhost:8080/products?type=${type}&page=${currentPage}&size=${productsPerPage}`);
      setProducts(response?.data ?? []);
    } catch (e) {
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [type])

  useEffect(() => {
    getProducts();
  }, [currentPage])

  return (
    <div className='px-12 py-5 flex flex-col grow'>
      <p className='text-[32px] mt-6'><b>{type}</b></p>
      <ul className='pt-3 pb-12 grow'>
        {
          products.map((item, i) => <li key={i}>
              <Product name={item.name} image_link={item.image_link} price={item.price} />
            </li>)
        }
      </ul>
      <PaginationControls 
        productsSize={products.length}
        currentPage={currentPage}
        isLastPage={products.length < productsPerPage}
        setNextPage={() => setCurrentPage(currentPage + 1)}
        setPrevPage={() => setCurrentPage(currentPage - 1)}
        scrollTopMode
      />
    </div>
  );
};

export default Products;
