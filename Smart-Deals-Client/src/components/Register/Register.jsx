import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const {createUserWithMail,loginWithGoogle, user, loading} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
        navigate("/")
    }
    }, [user])
    
    //Creating User with email and password
    const handleSignInWithMail = (e) => {
        e.preventDefault();
        const form = e.target;
        const user_name = e.target.name.value;
        const user_email = e.target.email.value;
        const user_password = e.target.password.value;
        const userInfo = {
            userName: user_name,
            userEmail: user_email,
            dateCreated: new Date()
        }
        createUserWithMail(user_email, user_password)
        .then(result => {
            console.log(result);
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(userInfo)
            }).then(res => res.json()).then(data => console.log("Data after adding to db: ", data) );
            form.reset();
        })
        .catch(error => {
            console.log(error);
            if(error.code === "auth/email-already-in-use"){
                console.log("Email already in use!");
            }else{
                console.log(error);
            }
        })
    }

    //creating user with google
    const handleGoogleSignIn = () => {
        loginWithGoogle()
        .then(result => {
            console.log(result);
            const user = result.user;
            const userInfo = {
                userName: user.displayName,
                userEmail: user.email,
                dateCreated: new Date()
            }
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            }).then(res => res.json()).then(data => console.log("Data after adding to DB: ", data));
        })
        .catch(error => {
            console.log(error);
            if(error.code === "auth/email-already-in-use"){
                console.log("Email already in use!")
            }else{
                console.log(error);
            }
        })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body md:w-96 p-10">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold title-gradient-t2b text-center py-2">Register</h1>
                            <p className="py-2.5 text-center">
                                Already have an account? <Link className='underline text-blue-600' to={"/login"}>Login</Link>
                            </p>
                        </div>
                        <form onSubmit={handleSignInWithMail} className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input" placeholder="Name" />
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <input type="submit" className="btn btn-neutral mt-4 general-gradient-l2r border-0" value="Register" />
                        </form>
                        <div>
                            <h3 className='text-center font-bold my-4'>OR</h3>
                            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;