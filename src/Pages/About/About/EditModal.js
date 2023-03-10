import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const EditModal = ({ data, setData }) => {
    const { updateUserEmail } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const handleEditModal = newData => {
        const updatedField = {
            name: newData.name,
            email: newData.email,
            university: newData.university,
            address: newData.address
        }
        const newEmail = newData.email
        updateUserEmail(newEmail)
            .then(result1 => {
                fetch(`https://communal-forum-server.vercel.app/users/${user?.uid}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedField)
                })
                    .then(res => res.json())
                    .then(result => {
                        toast.success('update successfully')
                        setData(newData)
                    })
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg ml-8">Edit fields</h3>
                    <form onSubmit={handleSubmit(handleEditModal)} className="card w-full shadow-2xl bg-base-100">
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
                                <input {...register("address")} type="text" placeholder="Address" className="input input-bordered" required />
                            </div>
                            <div className="form-control flex flex-row mt-6 justify-between">
                                <button htmlFor="my-modal" className="btn btn-primary w-2/5">Make Change</button>
                                <label htmlFor="my-modal" className="btn w-2/5">close</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;