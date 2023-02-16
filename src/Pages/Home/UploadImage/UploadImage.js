import React from 'react';
import { useForm } from 'react-hook-form';

const UploadImage = () => {
    const { register, handleSubmit } = useForm()

    const handleAddImage = (data) => {
        console.log(data.image[0])
    }
    return (
        <div>
            <form className='text-center my-10 bg-gradient-to-r from-green-700 to-green-400 p-10' onSubmit={handleSubmit(handleAddImage)}>
                <div className="form-control w-full">
                    <label className="mb-6">
                        <span className="label-text text-center text-3xl text-white font-semibold">Upload Image:</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered file-input-warning w-full" {...register("image")} />
                </div>
                <input type="submit" className='btn max-w-md w-full mt-5 bg-gradient-to-r from-amber-600 to-amber-400' />
            </form>
        </div>
    );
};

export default UploadImage;