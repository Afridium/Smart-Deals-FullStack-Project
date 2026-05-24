import React from 'react';
import { useLoaderData } from 'react-router';

const ProductPage = () => {
    const product = useLoaderData();
    const {title, description, category, price_min, price_max, _id, created_at, seller_name} = product;
    return (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-dashed border-gray-300 overflow-hidden">
            <div className="flex flex-col lg:flex-row">

                {/* LEFT */}
                <div className="flex flex-col w-full lg:w-[45%]">
                    <div className="bg-gray-100 flex items-center justify-center h-64 md:h-80 lg:h-72 m-4 rounded-xl border border-gray-200">
                        <img src={product.image} alt={title} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    {/* Description — lg only */}
                    {/* <div className="px-5 pb-6 hidden lg:block">
                        <DescriptionBlock product={product} />
                    </div> */}
                </div>

                {/* RIGHT */}
                <div className="flex flex-col w-full lg:w-[55%] px-5 lg:px-8 py-6 lg:border-l border-gray-100">
                    <a href="/products" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 w-fit">
                        ← Back To Products
                    </a>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">{title}</h1>
                    <span className="w-fit text-xs bg-purple-100 text-purple-600 rounded-full px-3 py-1 mb-5">{category}</span>

                    <p className="text-2xl font-bold text-emerald-500">${price_min} - {price_max}</p>
                    <p className="text-xs text-gray-400 mt-0.5 mb-5">Price starts from</p>
                    <hr className="border-gray-100 mb-5" />

                    {/* Product Details */}
                    <h4 className="text-base font-bold text-gray-800 mb-3">Product Details</h4>
                    <p className="text-sm text-gray-500 mb-1">Product ID: <span className="text-gray-700 font-medium">{_id}</span></p>
                    <p className="text-sm text-gray-500 mb-5">Posted: <span className="text-gray-700 font-medium">{created_at}</span></p>
                    <hr className="border-gray-100 mb-5" />

                    {/* Seller */}
                    <h4 className="text-base font-bold text-gray-800 mb-3">Seller Information</h4>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{seller_name}</p>
                            <p className="text-xs text-gray-400">{seller_name}</p>
                        </div>
                    </div>
                    {/* <p className="text-sm text-gray-500 mb-1">Location: <span className="text-gray-700 font-medium">{seller.location}</span></p>
                    <p className="text-sm text-gray-500 mb-1">Contact: <span className="text-gray-700 font-medium">{seller.contact}</span></p>
                    <p className="text-sm text-gray-500 mb-6">Status: <span className="bg-yellow-300 text-yellow-900 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-1">On Sale</span></p> */}

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl text-sm">
                        I Want Buy This Product
                    </button>
                </div>
            </div>

            {/* Description — mobile/md only */}
            {/* <div className="px-5 pb-6 lg:hidden border-t border-gray-100 pt-5">
                <DescriptionBlock product={product} />
            </div> */}
        </div>
    );
};

export default ProductPage;