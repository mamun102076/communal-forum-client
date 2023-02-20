import React from 'react';
import { Link } from 'react-router-dom';

const PopularPostCard = ({popular}) => {
    const { _id, text, image } = popular
    return (
        <div className="card shadow-xl bg-amber-200 p-5 mb-10">
            <div className="card-body">
                <h2 className="card-title">{text.length > 20 ? text.slice(0,50)+'...' : text}</h2>
            </div>
            <figure><img src={image} alt="Shoes" className='h-52 w-full'/></figure>
            <Link to={`/postdetails/${_id}`} className="btn btn-primary mt-5">See Details</Link>
        </div>
    );
};

export default PopularPostCard;