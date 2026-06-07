import React, { useContext, useRef } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const ProductPage = () => {
    const product = useLoaderData();
    const { _id, title, description, category, price_min, price_max, created_at, image, condition, usage, seller_name, seller_image, location, email, status } = product;
    const bidModal = useRef();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleBidModal = () => {
        if (!user) {
            navigate('/login');
        }
        bidModal.current.showModal();
    }
    const handleBidSubmit = (e) => {
        e.preventDefault();
        const bidEmail = e.target.email.value;
        const bidName = e.target.name.value;
        const bidPrice = e.target.bid.value;
        const contact = e.target.contact.value;
        const newBid = {
            product: _id,
            buyer_name: bidName,
            buyer_email: bidEmail,
            bid_price: bidPrice,
            buyer_contact: contact,
            status: 'pending'
        }
        console.log(newBid);
        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then(data => console.log("After Placing Bid:", data))
    }
    return (
        <div className="min-h-screen bg-[#f4f5f8] p-4 md:p-8 font-sans flex justify-center text-slate-800">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    {/* Image Placeholder */}
                    <div className="w-full bg-[#d1d5db] aspect-[4/3] rounded-lg">
                        <img className='w-full rounded-lg' src={image} alt="" />
                    </div>

                    {/* Product Description */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-[1.35rem] font-bold mb-4 text-[#0f172a]">Product Description</h2>

                        <div className="flex justify-between items-center mb-4 text-sm">
                            <div>
                                <span className="text-[#8b5cf6] font-semibold">Condition : </span>
                                <span className="font-bold text-[#0f172a]">{condition}</span>
                            </div>
                            <div>
                                <span className="text-[#8b5cf6] font-semibold">Usage Time : </span>
                                <span className="font-bold text-[#0f172a]">{usage}</span>
                            </div>
                        </div>

                        <hr className="border-gray-100 mb-5" />

                        <div className="text-[#94a3b8] text-[0.85rem] leading-relaxed space-y-4">

                            <p>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-5">

                    {/* Back Button */}
                    <Link to={"/"} className="flex items-center text-sm text-[#334155] font-semibold hover:text-slate-900 transition-colors w-max mb-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back To Products
                    </Link>

                    {/* Product Title & Category */}
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                            {title}
                        </h1>
                        <span className="inline-block bg-[#f3e8ff] text-[#9333ea] text-[10px] font-bold px-3 py-1.5 rounded-full w-max">
                            {category}
                        </span>
                    </div>

                    {/* Price Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm mt-1">
                        <div className="text-[1.75rem] font-bold text-[#22c55e] mb-1 leading-none">
                            ${price_min} - {price_max}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">Price starts from</div>
                    </div>

                    {/* Product Details Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-[1.15rem] font-bold text-[#0f172a] mb-4">Product Details</h3>
                        <div className="flex flex-col gap-2.5 text-[13px] text-slate-600">
                            <p>
                                <span className="font-bold text-[#0f172a] mr-1">Product ID:</span>
                                {_id}
                            </p>
                            <p>
                                <span className="font-bold text-[#0f172a] mr-1">Posted:</span>
                                {created_at}
                            </p>
                        </div>
                    </div>

                    {/* Seller Information Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-[1.15rem] font-bold text-[#0f172a] mb-4">Seller Information</h3>

                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-11 h-11 bg-[#cbd5e1] rounded-full flex-shrink-0">
                                <img src={seller_image} className='w-full rounded-full' alt="" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-sm font-bold text-[#0f172a]">{seller_name}</div>
                                <div className="text-[11px] text-slate-400 font-medium">{email}</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 text-[13px] text-slate-600">
                            <p>
                                <span className="font-bold text-[#0f172a] mr-1">Location:</span>
                                {location}
                            </p>
                            <p>
                                <span className="font-bold text-[#0f172a] mr-1">Contact:</span>
                                {email}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-bold text-[#0f172a]">Status:</span>
                                <span className="bg-[#fbbf24] text-[#713f12] text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    {
                        user?.email == email ? <button className="w-full bg-[grey] text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors mt-2 text-[15px]">
                            My Product
                        </button> : <button onClick={handleBidModal} className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors mt-2 text-[15px]">
                            I Want Buy This Product
                        </button>
                    }

                    {/* Modal */}

                    <dialog ref={bidModal} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">Offer a Price</h3>
                            <p className="py-4 text-center">Offer a bid price for the current product</p>
                            <form onSubmit={handleBidSubmit} className="fieldset w-xs mx-auto p-4">

                                <label className="label">Email</label>
                                <input type="email" readOnly defaultValue={user?.email} name='email' className="input" placeholder="Email" />
                                <label className='label'>Contact/Phone</label>
                                <input type='text' name='contact' className='input' placeholder='Phone'></input>
                                <label className="label">Name</label>
                                <input type="text" name='name' defaultValue={user?.displayName} className="input" placeholder="Name" />
                                <label className="label">Bid Price</label>
                                <input type="text" name='bid' className="input" placeholder="Your Bid" />

                                <button className="btn general-gradient-l2r text-white mt-4">Submit Bid</button>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                </div>
            </div>

        </div>
    );
};

export default ProductPage;