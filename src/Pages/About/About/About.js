import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import EditModal from './EditModal';

const About = () => {
    const { email } = useParams()
    const { data = [], refetch } = useQuery({
        queryKey: ['aboutData'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${email}`)
            const data = await res.json()
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
                data && <EditModal key={data._id} data={data} refetch={refetch}></EditModal>
            }
        </div>
    );
};

export default About;