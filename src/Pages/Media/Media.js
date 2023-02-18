import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PostCard from './PostCard';

const Media = () => {
    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts')
            const data = await res.json()
            return data
        }
    })
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 my-10 mx-10'>
            {
                data?.map(data => <PostCard key={data
                ._id} data={data}></PostCard>)
            }
        </div>
    );
};

export default Media;