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
        <div className='grid w-8/12 mx-auto my-10'>
            {
                data?.map(data => <PostCard key={data
                ._id} data={data}></PostCard>).reverse()
            }
        </div>
    );
};

export default Media;