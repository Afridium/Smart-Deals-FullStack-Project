import React, { useEffect, useState } from 'react';

const BidsForProduct = ({ prodID }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${prodID}`)
            .then(res => res.json())
            .then(data => {
                console.log("Data after getting: ", data)
                setProducts(data);
            })
    }, [prodID])
    console.log(products)
    return (
        <div className=''>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Buyer Name</th>
                            <th>Buyer Contact</th>
                            <th>Buyer Email</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            products.map((product, index) => <tr>
                            <th>{index + 1}</th>
                            <td>{product.buyer_name}</td>
                            <td>{product.buyer_contact}</td>
                            <td>{product.buyer_email}</td>
                            <td>{product.bid_price}</td>
                            <td>Blue</td>
                        </tr> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BidsForProduct;