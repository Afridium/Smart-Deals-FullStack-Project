import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const [myProducts, setMyProducts] = useState([]);
    const {user, loading} = useContext(AuthContext);
    const nagivate = useNavigate();
    const name = user.email.split('@')[0];
    if(loading){
        return <h3>Loading....</h3>
    }
    if(!user){
        Navigate('/login')
    }
    const Axios = useAxiosSecure();
    const AxiosDelete = useAxios();
    useEffect(()=>{
        Axios.get(`/products?email=rrg@ksjgf.com`)
        .then(data => {
            setMyProducts(data.data);
        })
    }, [user])

    const handleDeletion = (id) => {
        AxiosDelete.delete(`/products/${id}`)
        .then(data => {
            window.location.reload();
        }
        )
    }
    return (
        <div>
        <h3 className='font-bold text-3xl text-center my-4.5'>Hello, {name}</h3>
        <h3 className='font-bold text-2xl text-center my-4.5'>My Products: {myProducts.length}</h3>
        <div className="overflow-x-auto my-6">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Price Min</th>
                        <th>Price Max</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myProducts.map((product, index) => {
                            return <tr key={product._id}>
                                <th>{index + 1}</th>
                                <td className='underline'><Link to={`/products/${product._id}`}>{product.title}</Link></td>
                                <td>{product.created_at}</td>
                                <td>{product.price_min}</td>
                                <td>{product.price_max}</td>
                                <td>{product.status}</td>
                                <td><button onClick={()=>handleDeletion(product._id)} className='btn'>Delete Product</button></td>
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

export default MyProducts;