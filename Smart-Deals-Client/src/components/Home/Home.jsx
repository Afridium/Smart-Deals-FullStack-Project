import React, { Suspense, useEffect } from 'react';
import '../../App.css'
import left from '../../assets/assets/bg-hero-left.png'
import right from '../../assets/assets/bg-hero-right.png'
import { IoSearch } from "react-icons/io5";
import LatestProducts from '../LatestProducts/LatestProducts';
const Home = () => {

    const LatestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());
    return (
        <div className='w-full'>
        <div className='h-[70vh] home-background text-center px-6 lg:px-1.5 py-10 relative flex flex-col justify-center items-center'>
            <img src={left} className='absolute left-0 z-0 w-[25%] lg:w-auto h-full' alt="" />
            <img src={right} className='absolute right-0 z-0 w-[25%] lg:w-auto h-full' alt="" />
            <h1 className='text-4xl lg:text-6xl font-extrabold'>Deal your <span className='title-gradient-t2b'>Products </span> <br />
                in a <span className='title-gradient-t2b'>Smart</span> way !</h1>
            <p className='text-[#627382] mt-2.5'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
            <div className='flex py-3.5 shadow-2xs lg:w-[50%]'>
                <input type="text" className='py-2.5 pl-2.5 pr-3.5 w-full rounded-l-3xl border border-blue-500' name="search" id="" placeholder='search for products, categories' />
                <button className='general-gradient-l2r py-2.5 px-3.5 rounded-r-3xl text-white'><IoSearch /></button>
            </div>
            <div className='flex gap-1.5 justify-center mt-3.5'>
                <button className='btn general-gradient-l2r text-white'>Watch All Products</button>
                <button className='btn title-gradient-t2b border-blue-500'>Post A Product</button>
            </div>
        </div>

        <Suspense fallback={<p>Loading products...</p>}>
           <div className='w-full lg:w-[80%] mx-auto my-6'>
            <LatestProducts LatestProductsPromise={LatestProductsPromise}></LatestProducts>
        </div> 
        </Suspense>
        
        </div>
        
    );
};

export default Home;