import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddPost = () => {
    const { register, handleSubmit } = useForm()
    const imageKey = process.env.REACT_APP_Imgbb_Key

    const handlePostSubmit = data => {
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const postData = {
                        text: data.text,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(postData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                toast.success('post added successfully')
                            }
                            console.log(result)
                        })
                }
            })
    }
    return (
        <div className='mt-5'>
            <h1 className='text-center text-3xl mb-4 font-bold text-lime-500'>Create a post</h1>
            <form onSubmit={handleSubmit(handlePostSubmit)} className="form-control bg-gradient-to-r from-violet-600 to-indigo-500 p-7">
                <div className="form-control w-full">
                    <label className="label my-3">
                        <span className="label-text text-xl font-bold text-white">Write some text:</span>
                    </label>
                    <textarea {...register("text")} className="textarea textarea-bordered h-32" placeholder="write some text"></textarea>
                </div>
                <div className="form-control w-full">
                    <label className="label my-3">
                        <span className="label-text text-xl font-bold text-white">Upload a picture:</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered file-input-warning w-full" {...register("image")} />
                </div>
                <button type='submit' className="btn btn-success mt-4 w-1/6 mx-auto">Submit</button>
            </form>
        </div>
    );
};

export default AddPost;