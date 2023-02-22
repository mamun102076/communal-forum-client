import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PopularPostCard from './PopularPostCard';

const PopularPosts = () => {
    const { data: popular = [] } = useQuery({
        queryKey: ['popular'],
        queryFn: async () => {
            const res = await fetch('https://communal-forum-server.vercel.app/posts/count')
            const data = await res.json()
            return data
        }
    })
    return (
        <div>
            <h1 className='text-center text-5xl text-green-600 font-semibold mt-10'>Top 3 post</h1>
            <div className='w-8/12 mx-auto my-10'>
                {
                    popular.map(popular => <PopularPostCard key={popular._id} popular={popular}></PopularPostCard>)
                }
            </div>
        </div>
    );
};

export default PopularPosts;