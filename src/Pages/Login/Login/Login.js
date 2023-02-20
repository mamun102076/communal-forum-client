import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Login = () => {
    const { register, handleSubmit } = useForm()
    const { signIn, googleLogin } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleLogin = data => {
        signIn(data.email,data.password)
        .then(result => {
            const user = result.user
            console.log(user)
            navigate(from, {replace: true})
        })
        .catch(error => console.log(error))
    }

    const handleGoogleSignIn = () => {
        googleLogin(googleProvider)
        .then(result => {
            const user = result.user
            saveGoogleUser(user?.displayName,user?.email,user?.uid)
        })
        .catch(error => console.log(error))
    }
    const saveGoogleUser = (name,email,uid) => {
        const user = { name,email,uid }
        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                toast.success('Login successfull')
                navigate(from, {replace: true})
            }
        })
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="hero-content flex-col mx-auto">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-center mb-5 mt-5">Login now!</h1>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="card w-6/12 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password")} type="text" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
                <button onClick={handleGoogleSignIn} className="btn btn-success w-6/12 text-white font-semibold text-xl">Google Login</button>
            </div>
        </div>
    );
};

export default Login;