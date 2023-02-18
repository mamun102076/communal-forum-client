import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';

const PostDetails = () => {
    const {id} = useParams()

    const { data = [], refetch } = useQuery({
        queryKey: ['likedItem'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/posts/${id}`)
            const data = await res.json()
            return data
        }
    })

    let [count,setCount] = useState(0)
    const { register, handleSubmit } = useForm()

    const handleLikeCount = id => {
        count++
        setCount(count)
        const like = { count }
        fetch(`http://localhost:5000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(like)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data)
                    refetch()
                }
            })
    }

    return (
        <div className='mx-14 my-10'>
            <h1 className='text-2xl font-semibold mb-8'>{data.text}</h1>
            <img src={data.image} className="w-full h-96" alt="" />
            <div className='flex justify-center my-10'>
                <button onClick={() => handleLikeCount(id)} className='text-6xl text-blue-500 hover:scale-150 duration-300'>{< AiOutlineLike />}</button>
                <span className='mt-8 ml-6'>{data.likes ? data.likes : 0} people like this post</span>
            </div>
            <form onSubmit={handleSubmit()} className="form-control">
                <div className="form-control w-full">
                    <label className="label my-3">
                        <span className="label-text text-xl font-bold">Write a comment:</span>
                    </label>
                    <textarea {...register("text")} className="textarea textarea-bordered h-32" placeholder="write some text"></textarea>
                </div>
                <button type='submit' className="btn btn-success mt-4 lg:w-2/12 md:w-3/12 sm:w-3/12 xs:w-full mx-auto">Add Comment</button>
            </form>
        </div>
    );
};

export default PostDetails;