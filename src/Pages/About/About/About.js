import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import EditModal from './EditModal';

const About = () => {
    
    const { user } = useContext(AuthContext)
    const id = user?.uid
    const [data,setData] = useState([])

    const { data: aboutData = [] } = useQuery({
        queryKey: ['aboutData'],
        queryFn: async () => {
            const res = await fetch(`https://communal-forum-server.vercel.app/users/${id}`)
            const data = await res.json()
            setData(data)
            return data
        }
    })
    return (
        <div className='w-8/12 mx-auto my-10'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>University</th>
                            <th>Address</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="active">
                            <th>{data.name}</th>
                            <td>{data.email}</td>
                            <td>{data.university}</td>
                            <td>{data.address}</td>
                            <td>
                                <label htmlFor="my-modal" className="btn btn-info">Edit</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {
                data && <EditModal key={data._id} data={data} setData={setData}></EditModal>
            }
        </div>
    );
};

export default About;