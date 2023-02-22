import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Register = () => {
    const { register, handleSubmit } = useForm()
    const { createUser, updateUser, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()

    const handleRegister = data => {
        createUser(data.email,data.password)
        .then(result => {
            const user = result.user
            console.log(user)
            const userInfo = {
                displayName: data.name,
                university: data.university,
                address: data.address
            }
            updateUser(userInfo)
            .then(result => {
                saveUser(data.name,data.email,data.university,data.address,user.uid)
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.log(error))
    }

    const saveUser = (name,email,university,address,uid) => {
        const user = { name,email,university,address,uid }
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
                toast.success('registration successfull')
                navigate('/')
            }
        })
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
                toast.success('registration successfull')
                navigate('/')
            }
        })
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="hero-content flex-col mx-auto">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-center mb-5 mt-5">Register now!</h1>
                </div>
                <form onSubmit={handleSubmit(handleRegister)} className="card w-6/12 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name:</span>
                            </label>
                            <input {...register("name")} type="text" placeholder="Name.." className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">University:</span>
                            </label>
                            <input {...register("university")} type="text" placeholder="University" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address:</span>
                            </label>
                            <input {...register("address")} type="text" placeholder="Address" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password")} type="text" placeholder="password" className="input input-bordered" required/>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </form>
                <button onClick={handleGoogleSignIn} className="btn btn-success w-6/12 text-white font-semibold text-xl">Google Signin</button>
            </div>
        </div>
    );
};

export default Register;