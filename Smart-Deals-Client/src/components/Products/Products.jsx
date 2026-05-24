import React from 'react';
import { Link } from 'react-router';

const Products = ({ product }) => {
    const {_id, title, price_min, price_max, image } = product;
    return (
        <div className="card bg-base-100 w-full max-w-sm shadow-sm">
            <figure className="px-4 pt-4">
                <img
                    src={image}
                    alt="product"
                    className="rounded-xl w-full object-cover" />
            </figure>
            <div className="card-body items-start text-left">
                <h2 className="text-left font-bold text-[16px]">{title}</h2>
                <p className='font-bold text-blue-700'>BDT {price_min} - {price_max}</p>
                <div className="card-actions w-full">
                    <Link to={`/products/${_id}`} className="btn border border-blue-500 title-gradient-t2b w-full font-bold">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Products;