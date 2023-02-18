import React from 'react';
import { useForm } from 'react-hook-form';

const UploadImage = () => {
    const { register, handleSubmit } = useForm()
    const imageKey = process.env.REACT_APP_Imgbb_Key
    
    const handleAddImage = (data) => {
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image',image)
        
        const url = `https://api.imgbb.com/1/upload?key=${imageKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => console.log(imgData.data.url))
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
                <input type="submit" className='btn max-w-md w-full mt-10 bg-gradient-to-r from-sky-600 to-sky-600 text-xl'/>
            </form>
        </div>
    );
};

export default UploadImage;