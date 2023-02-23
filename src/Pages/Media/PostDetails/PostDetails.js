import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthProvider';
import { toast } from 'react-hot-toast';
import Comments from '../Comments/Comments';

const PostDetails = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const { register, handleSubmit } = useForm()
    let [count, setCount] = useState(0)

    const { data: likedItem = [], refetch } = useQuery({
        queryKey: ['likedItem'],
        queryFn: async () => {
            const res = await fetch(`https://communal-forum-server.vercel.app/posts/${id}`)
            const data = await res.json()
            setCount(data.likes || 0)
            return data
        }
    })

    const handleLikeCount = () => {
        setCount(prev => prev + 1)

        const like = { count }
        fetch(`https://communal-forum-server.vercel.app/posts/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(like)
        })
            .then(res => res.json())
            .then(result1 => {
                fetch(`https://communal-forum-server.vercel.app/posts/${id}`)
                    .then(res => res.json())
                    .then(commonData => {
                        setCount(commonData?.likes)
                    })
            })
    }

    const handleComment = data => {
        const commentBody = {
            userName: user?.displayName,
            text: data.text,
            commentId: id
        }
        fetch('https://communal-forum-server.vercel.app/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentBody)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('comment successfully')
            })
    }

    const {data: allComment = [] } = useQuery({
        queryKey: ['allComment'],
        queryFn: async () => {
            const res = await fetch(`https://communal-forum-server.vercel.app/comments/${id}`)
            const data = await res.json()
            setComments(data)
            refetch()
            return data
        }
    })

    return (
        <div className='mx-14 my-10'>
            <h1 className='text-2xl font-semibold mb-8'>{likedItem?.text}</h1>
            <img src={likedItem?.image} className="w-full h-96" alt="" />
            <div className='flex justify-center my-10'>
                <button onClick={handleLikeCount} className='text-6xl text-blue-500 hover:scale-150 duration-300'>{< AiOutlineLike />}</button>
                <span className='mt-8 ml-6'>{count} people like this post</span>
            </div>
            <form onSubmit={handleSubmit(handleComment)} className="form-control">
                <div className="form-control w-full">
                    <label className="label my-3">
                        <span className="label-text text-xl font-bold">Write a comment:</span>
                    </label>
                    <textarea {...register("text")} className="textarea textarea-bordered h-32" placeholder="write some text"></textarea>
                </div>
                <button type='submit' className="btn btn-success mt-4 lg:w-2/12 md:w-3/12 sm:w-3/12 xs:w-full mx-auto">Add Comment</button>
            </form>
            <div>
                <h1 className='text-4xl font-semibold text-center text-green-600 mt-10'><b>See Comments</b></h1>
                <div className='grid gap-10 my-10'>
                    {
                        comments ?
                            comments?.map(comment => <Comments key={comment._id} comment={comment}></Comments>)
                            :
                            <h1 className='text-4xl text-pink-600 text-center font-semibold'>No comments yet</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostDetails;