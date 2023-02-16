import React from 'react';

const AddPost = () => {
    return (
        <div className='mt-5'>
            <h1 className='text-center text-3xl mb-4 font-bold text-lime-500'>Create a post</h1>
            <div className="form-control bg-gradient-to-r from-violet-600 to-indigo-500 p-7">
                <label className="label my-3">
                    <span className="label-text text-xl font-bold text-white">Write some text:</span>
                </label>
                <textarea className="textarea textarea-bordered h-32" placeholder="write some text"></textarea>
                <button className="btn btn-success mt-4 w-1/6 mx-auto">Submit</button>
            </div>
        </div>
    );
};

export default AddPost;