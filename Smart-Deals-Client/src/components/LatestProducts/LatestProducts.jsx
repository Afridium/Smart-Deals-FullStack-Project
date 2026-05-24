import React, { use, useContext } from 'react';
import Products from '../Products/Products';

const LatestProducts = ({ LatestProductsPromise }) => {
    const products = use(LatestProductsPromise);
    return (
        <div className='w-full'>
            <h3 className='font-extrabold text-4xl text-center mb-8 mt-4'>Recent <span className='title-gradient-t2b'>Products</span></h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 px-4 justify-items-center'>
                {products.map(product =>
                    <Products key={product._id} product={product} />
                )}
            </div>
        </div>
    );
};

export default LatestProducts;