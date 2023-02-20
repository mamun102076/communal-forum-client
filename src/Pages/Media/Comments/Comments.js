import React from 'react';
import image from '../../../images/bg1.jpeg'

const Comments = ({comment}) => {
    return (
        <div className="hero bg-base-200 justify-start shadow-lg shadow-green-500 w-8/12 mx-auto">
            <div className="hero-content flex-col lg:flex-row">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={image} alt='' />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{comment.userName}</h1>
                    <p className="py-6">{comment.text}</p>
                </div>
            </div>
        </div>
    );
};

export default Comments;