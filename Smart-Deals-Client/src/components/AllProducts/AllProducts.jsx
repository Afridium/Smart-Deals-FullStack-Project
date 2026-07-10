import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import useAxios from '../../hooks/useAxios';

const AllProducts = () => {
    const AxiosInstance = useAxios();
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        AxiosInstance.get('/products')
            .then(data => {
                setAllProducts(data.data);
            })
    }, [])
    return (
        <div className='w-full'>
            <h3 className='text-center font-bold text-4xl my-6'>All Products Page</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center lg:px-12'>
                {
                    allProducts.map(product => <Products product={product} key={product._id}></Products>)
                }
            </div>
        </div>
    );
};

export default AllProducts;