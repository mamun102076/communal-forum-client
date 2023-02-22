import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-slate-200 text-base-content rounded">
            <div className="grid grid-flow-col gap-4">
                <Link className="link link-hover font-semibold text-lg">About Me</Link>
            </div>
            <div>
                <p className='text-lg font-semibold'>Copyright © 2023 - All right reserved by Communal Forum</p>
            </div>
        </footer>
    );
};

export default Footer;