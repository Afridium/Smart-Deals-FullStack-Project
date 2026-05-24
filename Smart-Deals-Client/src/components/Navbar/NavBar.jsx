import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import '../../App.css'
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const links = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/allProducts"}>All Products</NavLink></li>
        {
            user && <> <li><NavLink to={"/myproducts"}>My Products</NavLink></li>
                <li><NavLink to={"/mybids"}>My Bids</NavLink></li>
            </>
        }
    </>

    const handleSignOut = () => {
        logOut()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                        
                            {
                                user ? <li onClick={handleSignOut}>Log Out</li> : <> <li><NavLink to={"/login"}>Login</NavLink></li>
                                    <li><NavLink to={"/register"}>Register</NavLink></li></>
                            }
                        

                    </ul>
                </div>
                <a className="btn btn-ghost text-3xl font-bold">Smart<span className='title-gradient-t2b'>Deals</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            {
                user ? <div className="navbar-end hidden lg:flex gap-2">
                    <p>{user.email}</p>
                    <button onClick={handleSignOut} className="btn general-gradient-l2r text-white">Log Out</button>
                </div> : <div className="navbar-end hidden lg:flex gap-2">
                    <Link to={"/login"} className='btn title-gradient-t2b border-0'>Login</Link>
                    <Link to={"/register"} className="btn general-gradient-l2r text-white">Register</Link>
                </div>
            }

        </div>
    );
};

export default NavBar;