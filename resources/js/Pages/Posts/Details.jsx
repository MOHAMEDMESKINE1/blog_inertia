import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

function Details({auth,post }) {
   
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        <div className="py-12">
            <div className=" mx-auto  sm:px-6 lg:px-8">
                <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                    <h1>Details/ <Link href={route('posts.index')}  className='hover:bg-gray-600 hover:p-1.5 rounded-md'><strong>Go back</strong></Link> </h1>
                    <div className=" mx-auto flex flex-col justify-center card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src={post.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{post.title}</h2>
                            <p>{post.description}</p>
                            <p className='flex justify-end'>{post.created_at}</p>
                           
                        </div>
                        </div>

                </div>
            </div>
        </div>

          
       
        </AuthenticatedLayout>
    );
}

export default Details;