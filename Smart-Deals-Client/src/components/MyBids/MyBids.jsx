import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useLoaderData } from 'react-router';

const MyBids = () => {

    const { user } = useContext(AuthContext);
    const [myBids, setMyBids] = useState([]);
    const [myBidsProducts, setMyBidsProducts] = useState([]);
    const products = useLoaderData();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?mail=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyBids(data);
                    const matched = products.filter(product => data.find(data => product._id == data.product));
                    setMyBidsProducts(matched);
                })
        }
    }, [user?.email])
    const handleBidDelete = (bidId) => {
        fetch(`http://localhost:3000/bids/${bidId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log("Data after deletion: ", data);
        })
    }
    console.log(myBids)
    return (
        <div>
            <h3 className='font-bold text-3xl text-center my-4.5'>My Bids: {myBids.length}</h3>
            <div className="overflow-x-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Seller Contact</th>
                            <th>Seller Name</th>
                            <th>My Bid Price</th>
                            <th>STatus</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        myBidsProducts.map((product, index) =>{
                            const matchedProd = myBids.find(bid => bid.product === product._id);
                            return <tr>
                            <th>{index+1}</th>
                            <td className='underline'><Link to={`/products/${product._id}`}>{product.title}</Link></td>
                            <td>{product.location}</td>
                            <td>{product.seller_contact}</td>
                            <td>{product.seller_name}</td>
                            <td>{matchedProd.bid_price}</td>
                            <td>{product.status}</td>
                            <td><button onClick={()=>handleBidDelete(matchedProd._id)} className='btn'>Delete Bid</button></td>
                        </tr>
                        }
                        )
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;