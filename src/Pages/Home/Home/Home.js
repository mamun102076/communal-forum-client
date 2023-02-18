import React from 'react';
import AddPost from '../AddPost/AddPost';
// import UploadImage from '../UploadImage/UploadImage';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <AddPost></AddPost>
            {/* <div className='my-20'>
                <div className="divider text-6xl">OR</div>
            </div>
            <UploadImage></UploadImage> */}
        </div>
    );
};

export default Home;